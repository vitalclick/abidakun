/** *************************************************************
 * Please refer to the Theme Options section in documentation   *
 ****************************************************************/

/**
 * Icons from react-icons: https://react-icons.github.io/react-icons
 */

import { IoLogoTwitter, IoLogoInstagram, IoLogoLinkedin, IoLogoGithub } from 'react-icons/io5'
import { TfiHome, TfiPencilAlt } from 'react-icons/tfi'
import { SlUser, SlBriefcase, SlEnvolope, SlTrophy } from 'react-icons/sl'

const { siteUrl } = require('./site.config')

/**
 * Main Menu Items
 */

export const menu = [
  {
    name: 'Home',
    slug: '/',
    Icon: TfiHome,
  },
  {
    name: 'About',
    slug: '/about',
    Icon: SlUser,
  },
  {
    name: 'Services',
    slug: '/services',
    Icon: SlBriefcase,
  },
  {
    name: 'Articles',
    slug: '/blog',
    Icon: TfiPencilAlt,
  },
  {
    name: 'Projects',
    slug: '/projects',
    Icon: SlTrophy,
  },
  {
    name: 'Contact',
    slug: '/contact',
    Icon: SlEnvolope,
  },
]

/**
 * Social Links under the Main Menu
 */

export const social = [
  {
    name: 'Twitter',
    url: 'https://twitter.com/anthonyabidakun',
    Icon: IoLogoTwitter,
  },
  {
    name: 'Instagram',
    url: 'https://github.com/vitalclick',
    Icon: IoLogoGithub,
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/anthonyabidakun/',
    Icon: IoLogoLinkedin,
  },
]

/**
 * General configurations
 */

export const config = {
  dateLocale: 'en-US',
  dateOptions: {
    // dateOptions is passed to JavaScript's toLocaleDateString()
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  },
  convertKit: {
    tipUrl: 'https://fantastic-mover-3439.ck.page/products/blog',
  },
  contactForm: {
    inputs: require('./content/contact-form.json'),
    // Where enquiries land.
    recipient: 'toni@vitalclick.net',
    // The mailbox the API route authenticates as (SMTP_USER). A dedicated
    // send-only account, so the credential in the deployment environment is
    // not the one guarding the inbox above.
    sender: 'website@vitalclick.net',
    subject: 'EMAIL NOTIFICATION SUBJECT',
  },
}

/**
 * MDX/Markdown configurations
 */

export const mdxConfig = {
  publicDir: 'public',
  pagesDir: 'content',
  fileExt: '.md',
  collections: ['/blog', '/projects'],
  remarkPlugins: [],
  rehypePlugins: [],
}

/**
 * Global SEO configuration for next-seo plugin
 * https://github.com/garmeeh/next-seo
 */

export const siteMetaData = {
  siteUrl,
  authorName: 'Anthony Abidakun',
  siteName: 'Anthony Abidakun',
  defaultTitle: 'Anthony Abidakun - Web Developer & Growth Consultant',
  // 1200x630 card shared when a page has no image of its own.
  // Regenerate with: node scripts/og-image/build.mjs
  defaultOgImage: '/og-image.jpg',
  titleTemplate: 'Anthony Abidakun | %s',
  description:
    'Dedicated to helping businesses thrive in the digital landscape as a Web Developer and Growth Consultant.',
  email: 'toni@vitalclick.net',
  locale: 'en_US',
  twitter: {
    handle: '@anthonyabidakun',
    site: '@anthonyabidakun',
    cardType: 'summary_large_image',
  },
}
