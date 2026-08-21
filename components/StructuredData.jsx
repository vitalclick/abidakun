import React from 'react'
import Head from 'next/head'
import { siteMetaData, social } from '../theme.config'

/**
 * Site-wide JSON-LD, emitted once on every page as a single @graph so the
 * Person and the WebSite can reference each other by @id. Page-level schema
 * (BlogPosting, BreadcrumbList) is added by the Post layout on top of this.
 */
const StructuredData = () => {
  const { siteUrl, authorName, siteName, description, email, locale } = siteMetaData

  const personId = `${siteUrl}/#person`
  const siteId = `${siteUrl}/#website`

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': personId,
        name: authorName,
        url: siteUrl,
        email: `mailto:${email}`,
        jobTitle: 'Web Developer & Growth Consultant',
        description,
        image: `${siteUrl}/author-profile-picture.jpg`,
        sameAs: social.map((link) => link.url),
      },
      {
        '@type': 'WebSite',
        '@id': siteId,
        url: siteUrl,
        name: siteName,
        description,
        inLanguage: locale?.replace('_', '-'),
        publisher: { '@id': personId },
      },
    ],
  }

  return (
    <Head>
      <script
        type="application/ld+json"
        key="site-jsonld"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />
    </Head>
  )
}

export default StructuredData
