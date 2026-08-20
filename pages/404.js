import React from 'react'
import Seo from '@/components/Seo'
import Layout from '@/components/Layout'
import layouts from '@/layouts/index'
import { getPageBySlug } from '@/lib/mdx'

// Built from content/not-found.md so the 404 keeps the site chrome and stays
// editable as content. Next serves this page with a real 404 status.
export async function getStaticProps() {
  const page = await getPageBySlug(['not-found'])

  if (!page) {
    throw Error('content/not-found.md is missing, it backs the 404 page')
  }

  return { props: { page } }
}

export default function NotFound({ page = {} }) {
  const { meta = {}, ...content } = page
  const DynamicLayout = layouts[meta.layout]

  if (!DynamicLayout) return null

  return (
    <>
      <Seo {...meta} noindex />
      <DynamicLayout {...meta} {...content} />
    </>
  )
}

NotFound.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
