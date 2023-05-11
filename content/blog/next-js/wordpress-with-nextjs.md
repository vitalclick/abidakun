---
layout: Post
title: Using Headless WordPress with Next.js and Vercel
description: This post will show how to use headless WordPress with a frontend framework (Next.js) on secure, fast infrastructure (Vercel).
date: '2023-05-11'
tags:
  - node-js
  - next-js
  - vercel
  - wordpress
images:
  - src: /photos/headless-wordpress.jpg
    alt: image alt attribute
---

WordPress is a popular Content Management System (CMS), powering over 43% of the web. To improve the security, performance, and scalability of WordPress applications, developers decouple their WordPress content from their web infrastructure.

This post will show how to use headless WordPress with a frontend framework (Next.js) on secure, fast infrastructure (Vercel). The [completed example](https://github.com/vercel/next.js/tree/canary/examples/cms-wordpress) includes:

- Instant page loads by prerendering HTML from your WordPress content
- Flexible data fetching using GraphQL with the WPGraphQL plugin
- Updating content without deploying using Incremental Static Regeneration (ISR)

##### What is Headless WordPress?
Headless architecture decouples your frontend and backend into separate, independently scalable pieces of infrastructure. Headless WordPress enables you to keep your existing content workflows in place while evolving your frontend for increased performance.

![Comparing traditional WordPress architecture and headless WordPress with Vercel frontend.](/photos/light.jpg "Comparing traditional WordPress architecture and headless WordPress with Vercel frontend.")

While your frontend can consume the WordPress REST API to display your content, WordPress plugins (like WPGraphQL) enable you to generate a GraphQL API with zero configuration.

##### Why Go Headless?

Decoupling your frontend and CMS-backed content provides many benefits:

- **Flexible:** You can use Next.js, Svelte, or any other frontend framework your team prefers and evolve your frontend separately over time.
- **Resilient:** If your WordPress server has downtime, your Vercel-hosted frontend will continue to serve your traffic without interruption, showing the last statically generated content from the cache. Once your WordPress server is back online, you can then start displaying new content.
- **Easy Content Updates:** In a WordPress dashboard, anyone can keep content up to date. Developers can keep their focus on building applications while others make content changes.

##### Using Next.js with Headless WordPress

Let's learn how to use Headless WordPress with your Next.js application.

###### Step 1: Configure your WordPress site

You’ll need a WordPress server to work with. If you don’t already have one, you can get started locally with a tool like [Local](https://localwp.com/).

![An overview of your WordPress dashboard.](/photos/wp1.jpg "An overview of your WordPress dashboard.")

###### Step 2: Install the WPGraphQL plugin

In your WordPress dashboard, go to **Plugins**, click **Add New**, and then type **GraphQL** in the plugin search. Find **WPGraphQL**, click **Install Now**, and then **Activate** the plugin.

This creates a new section for GraphQL in the side navigation. From here, you can access the GraphQL IDE, where you can write and test your queries and configure the plugin Settings.

![Using the WPGraphQL IDE to query data for your WordPress posts.](/photos/wp2.jpg "Using the WPGraphQL IDE to query data for your WordPress posts.")

###### Step 3: Build the frontend with Next.js
The [The cms-wordpress starter example](https://github.com/vercel/next.js/tree/canary/examples/cms-wordpress/) is built using the [default Next.js template](https://nextjs.org/docs/api-reference/create-next-app/) with some additional blog features.

To get started, run the command for your package manager:

  ```js showLineNumbers
  npx create-next-app --example cms-wordpress cms-wordpress-app
  ```

###### Step 4: Fetch data from the GraphQL API

In the root directory, copy the `.env.local.example` to a new `.env.local` file and set the `WORDPRESS_API_URL` to your GraphQL API. `.env.local`

  ```js showLineNumbers
# .env.local
WORDPRESS_API_URL=
  ```

Find the endpoint in the **GraphQL Settings** section of the WordPress dashboard. WPGraphQL’s default is `/graphql`.

![The GraphQL endpoint for your WordPress content.](/photos/wp3.jpg "The GraphQL endpoint for your WordPress content.")

###### Step 5: Install dependencies and run the Next.js dev server

Next, run `npm install` to install project dependencies, and `npm run dev` to start the local server.

You can now view the local version of your app at `http://localhost:3000`. The blog post content on your home page is sourced from your WordPress backend.

###### Step 6: Incremental Static Page Regeneration using getStaticProps

[Incremental Static Regeneration (ISR)](https://vercel.com/docs/concepts/next.js/incremental-static-regeneration) allows you to update your content shown from WordPress without needing to redeploy your website.

To fetch data from WordPress and create statically rendered pages, Next.js uses the getStaticProps() function. We can use the revalidate property to define a time interval to check for content updates from WordPress in the background, triggered by an incoming request to your page. To find out more, [check out the documentation](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration).

```js showLineNumbers
// pages/index.js

export async function getStaticProps({ preview = false }) {

  const allPosts = await getAllPostsForHome(preview)


  return {

    props: { allPosts, preview },

    revalidate: 10,

  }

}
```

Using ISR extends static-site generation with an additional `revalidate` property that ensures after how many seconds your page gets revalidated. During revalidation, you receive the cached version first and then the updated version (if it exists). This mode of caching is generally known as “stale-while-revalidate.”

The `getAllPostsForHome()` function will run server-side at build time, fetching your data from the WordPress database and pre-rendering the content.

```js showLineNumbers
// Get the first 20 posts from WordPress, ordered by the date

export async function getAllPostsFromWordPress(preview) {

  const data = await fetchAPI(`

    query AllPosts {

      posts(first: 20, where: { orderby: { field: DATE, order: DESC } }) {

        edges {

          node {

            title

            excerpt

            slug

            date

          }

        }

      }

    }

  `)


  return data.posts

}
```

###### Step 7: Deploying the Next.js app to Vercel

Let’s deploy your Next.js application to Vercel. You can deploy using the `cms-wordpress` template in a few minutes from vercel  [templates marketplace](https://vercel.com/templates/next.js/isr-blog-nextjs-wordpress).

You'll add your `WORDPRESS_API_URL` value as an Environment Variable during the deployment to securely connect to your GraphQL API.

##### Conclusion

Your new headless architecture built on WordPress and Vercel is now more flexible, resilient, and faster. Incremental Static Regeneration will keep your pages in sync with your WordPress content, which Vercel ensures your site is both reliable and fast.

![Next.js ISR replicates and caches page content at the Edge for improved page load times.](/photos/wp4-light.jpg "Next.js ISR replicates and caches page content at the Edge for improved page load times.")