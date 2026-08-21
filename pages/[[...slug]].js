import React from 'react'
import { useRouter } from 'next/router'
import Seo from '@/components/Seo'
import Layout from '@/components/Layout'
import layouts from '@/layouts/index'
import { getPaths, getPageBySlug, generateCollectionRss } from '@/lib/mdx'
import { siteMetaData } from '../theme.config'

// Fetch data at build time
export async function getStaticProps({ params }) {
  let slug = params.slug || []
  let currentPage = 1

  const pageIndex = slug.indexOf('page')

  if (pageIndex !== -1) {
    currentPage = parseInt(slug[pageIndex + 1])
    slug = slug.slice(0, pageIndex)
  }

  const page = await getPageBySlug(slug)

  // Unknown slug: let Next serve pages/404.js with a real 404 status rather
  // than rendering the not-found content at 200.
  if (!page) {
    return { notFound: true }
  }

  const props = { page }

  // Add pagination props for collection pages
  if (page.meta && page.meta.collection) {
    const {
      meta: {
        collection: { totalPages, records, recordsPerPage, infinitePaging },
      },
    } = page

    const pageRecords = records?.slice(
      recordsPerPage * (currentPage - 1),
      recordsPerPage * currentPage
    )

    page.meta.collection.records = pageRecords

    props.pagination = {
      infinitePaging,
      totalPages,
      currentPage,
    }
  }

  // Generate RSS feed for collections
  await generateCollectionRss(slug)

  return { props }
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  const pages = await getPaths()

  const paths = pages.map((page) => ({
    params: {
      slug: page.slug,
    },
  }))

  // Every page comes from the content directory at build time, so anything
  // outside `paths` genuinely does not exist and should 404 immediately.
  return { paths, fallback: false }
}

// Layouts that already render an <h1>: Post prints the page title, and the
// Home layouts take theirs from the page's own markdown. The listing and
// marketing pages set their title at h3/h5 for visual reasons, so they get a
// screen-reader-only <h1> instead of shipping none at all.
const LAYOUTS_WITH_OWN_H1 = ['Post', 'Home', 'Home-2', 'Home-3', 'Home-4']

export default function Page({ pagination, page = {} }) {
  const { meta = {}, ...content } = page
  const router = useRouter()

  const layout = router.isFallback ? 'Fallback' : meta.layout
  const DynamicLayout = layouts[layout]
  const pageUrl = siteMetaData.siteUrl + router.asPath

  if (!DynamicLayout) return null

  return (
    <>
      <Seo {...meta} pageUrl={pageUrl} />
      {!LAYOUTS_WITH_OWN_H1.includes(meta.layout) && (
        <h1 className="sr-only">{meta.seo?.title || meta.title || siteMetaData.defaultTitle}</h1>
      )}
      <DynamicLayout {...meta} {...content} pagination={pagination} pageUrl={pageUrl} />
    </>
  )
}

Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
