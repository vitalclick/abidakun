import React from 'react'
import { NextSeo } from 'next-seo'
import { siteMetaData } from '../theme.config'

/** Social crawlers reject relative image URLs, so everything is absolutised. */
const absolute = (url) => (!url || url.startsWith('http') ? url : siteMetaData.siteUrl + url)

const Seo = (props) => {
  const { seo = {}, title, description, images, pageUrl, date, tags, layout, noindex } = props

  const metaData = {
    ...siteMetaData,
    title,
    description,
    ...seo,
  }

  const pageImage = images?.[0]
  // Fall back to the site card so a page is never shared without an image.
  // Dimensions are only claimed for that card, whose size we know.
  const ogImage = pageImage?.src
    ? { url: absolute(pageImage.src), alt: pageImage.alt || metaData.title }
    : {
        url: absolute(siteMetaData.defaultOgImage),
        alt: metaData.defaultTitle,
        width: 1200,
        height: 630,
      }

  const isArticle = layout === 'Post'

  const openGraph = {
    url: pageUrl,
    type: isArticle ? 'article' : 'website',
    title: metaData.title,
    description: metaData.description,
    images: [ogImage],
    site_name: metaData.siteName,
    locale: metaData.locale,
    ...(isArticle && {
      article: {
        publishedTime: date ? new Date(date).toISOString() : undefined,
        authors: [siteMetaData.authorName],
        tags: Array.isArray(tags) ? tags.map((tag) => tag?.title).filter(Boolean) : undefined,
      },
    }),
  }

  // Twitter reads og:* when the twitter:* equivalents are absent, but naming
  // them explicitly keeps the card stable if the OG tags ever diverge.
  const additionalMetaTags = [
    { name: 'twitter:title', content: metaData.title || metaData.defaultTitle },
    { name: 'twitter:description', content: metaData.description },
    { name: 'twitter:image', content: ogImage.url },
    { name: 'twitter:image:alt', content: ogImage.alt },
  ].filter((tag) => tag.content)

  return (
    <NextSeo
      {...metaData}
      canonical={pageUrl}
      noindex={noindex}
      openGraph={openGraph}
      additionalMetaTags={additionalMetaTags}
    />
  )
}

export default Seo
