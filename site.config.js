/** *************************************************************
 * The site's public URL, in one place.                         *
 ****************************************************************/

/**
 * Every absolute URL the site emits - canonical tags, Open Graph, RSS feeds,
 * sitemap.xml and robots.txt - is built from this value. Moving to another
 * domain is this one line, or NEXT_PUBLIC_SITE_URL in the deployment
 * environment.
 *
 * There is deliberately no VERCEL_URL fallback: that is the per-deployment
 * hostname, it changes on every build, and it carries no scheme - which is
 * what put "abidakun-<hash>.vercel.app" style URLs into the sitemap.
 *
 * Trailing slashes are stripped because callers concatenate paths onto this.
 */
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://abidakun.vercel.app').replace(
  /\/+$/,
  ''
)

module.exports = { siteUrl }
