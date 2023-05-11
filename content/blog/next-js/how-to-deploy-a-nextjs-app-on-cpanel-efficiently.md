---
layout: Post
title: How to Deploy a Nextjs App on cPanel efficiently
description: In this article we will learn about how to efficiently deploy a Next JS application on cPanel.
date: '2023-05-10'
tags:
  - node-js
  - next-js
images:
  - src: /photos/nextjs-app-on-cpanel.jpg
    alt: image alt attribute
---

As you can see on the article title, we are going to learn **how to efficiently deploy a Next JS application on cPanel.**

I’m going to break down to you guys in this post all the **steps that you have to follow for deploying your Next JS app on cPanel.**

First of all, we need to understand what is **Next JS** and **cPanel.** Obviously, if you are reading this article chances are you already know both of them… But in case you don’t, and for those you haven’t heard about them yet, lemme explain a little bit what is Next JS and cPanel…

Briefly, **Next JS** is a React JS framework that allows us to create server-side rendering (SSR) applications. As you know, by default React JS doesn’t offer us the ability to easily create applications with the SSR system, it just allows us to create single page applications (SPA). So Next JS comes into the game with that feature.

The React framework NextJS brings to us many other interesting features that make the creation of React apps more easier than before… Such as a routing system based on the files and folders structure.

Now, you know what NextJs is, next let’s talk a little bit about **cPanel…** Which is a web software that helps us to manage our hosting server more easily. Instead of doing everything manually, we use cPanel to easily manage things..

cPanel brings a bunch of ready to use tools such as a File Manager, a Database manager, a domain name manager, a Node JS App installer, a CMS installer, .. and so many more.

Now you know what Next JS and cPanel are, it’s a great time to jump into the main topic of our article… **How to Deploy a Next JS app on cPanel.** Are you ready guys ? Without wasting much time, let’s get into it…

Before jumping to the next part of the article, I assume the following :

- You already have a Next JS application
- Your app is working perfectly on local environment
- You have a web hosting with cPanel
- Your have a domain name linked to your cPanel

---

##### Steps for deploying a Next JS application on cPanel…

**Step 1.** The first thing you have to do to be able to deploy your application on cPanel is to create a **custom Next JS server.**

To do so, create a **server.js** file in the root directory of the project, and add the following code in it. Or you can follow this official Next JS guide to find the content that you need to put in the file.

  ```js
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = process.env.PORT || 3000

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true)
      const { pathname, query } = parsedUrl

      if (pathname === '/a') {
        await app.render(req, res, '/a', query)
      } else if (pathname === '/b') {
        await app.render(req, res, '/b', query)
      } else {
        await handle(req, res, parsedUrl)
      }
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  }).listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://${hostname}:${port}`)
  })
})
  ```

---
**Step 2.** You have to edit the **package.json** file in order to set the environment to production on the **start** script and run the **server.js** file that you’ve just created in the project root directory. Basically what we’ve done here is replace the default next start server with our own custom server.

```js
{
   "scripts": {
      "start": "NODE_ENV=production node server.js"
   }
}
```
---
**Step 3.** It’s time to build your Next JS application. To do so, you just have to run in your Terminal the build script with the **npm run build** or **yarn run build** command. Wait a few seconds while Next JS is doing the magic. 🙂

**Step 4.** Once the build is finished, open your Next JS project in your file manager to access all the project files and folders. Sometimes, you will need to enable the display of hidden files.

Select all the files and folders except the **node_modules** and **.git** folders, and the **README.md** and .**gitignore** files. Create a ZIP file with the selected files and folders.

![Select all the files w/o node_modules and git files.](/photos/select-files.jpg "Select all the files w/o node_modules and git files.")

Once that’s done, move to the next step…

**Step 5.** It’s time to go to the web hosting. Login to your cPanel, then upload and extract to the root folder of your domain name the ZIP file you’ve just created.

**Step 6.** Once all your project files and folders are extracted in the root project of your domain name, go to the **Software** section of your cPanel and click on **Setup Node.js App,** then click on **+ Create Application** button.

![Click on Setup Node.js App](/photos/LX4jjTB3XtJLKsapzm-g.webp "Click on Setup Node.js App")

It’s time to configure your Node Js app :

- **Node.js version :** select the version that pretty much matches with the Node.js version you used while developing your app locally.
- **Application mode :** select Production
- **Application root :** type the path of the root directory where your domain is linked. If you’ve put the project files and folders in the public_html directory, then type **« /public_html »** (without the quotation marks of course).
- **Application URL :** select your domain name
- **Application startup file :** type « **server.js** »

![Click on Setup Node.js App](/photos/nt785ar_0EcGahL6t6lQ.webp "Click on Setup Node.js App")

---

To finish the setup, click on the **CREATE** button and wait a few seconds. Once the app is created, it will automatically start. You will need to temporarily stop it by clicking on the **STOP APP** button.

Scroll down a little bit till you see the **Detected configuration files** section. Click on **Run NPM Install** to install all the Node JS packages of your project. Once done, start again the app by clicking on the **START APP** button.

Open your domain name in your browser and boom, your Next JS app is shown, it’s now live… Congratulations, you’ve successfully deployed your Next.js application on cPanel. 👏

That’s the end of today’s article. It was a huge pleasure for me to share with you the method I use to deploy my Next.js applications on cPanel. XOXO !
