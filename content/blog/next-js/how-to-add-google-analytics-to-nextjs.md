---
layout: Post
title: How to Add Google Analytics to a Next.js App
description: In this article, we will learn how add Google Analytics to a Next.js app. The first step is to set up a Google Analytics account.
date: '2021-12-01'
tags:
  - full-stack
  - node-js
images:
  - src: /photos/how-to-add-google-analytics-to-nextjs.jpg
    alt: image alt attribute
---

To add Google Analytics to a Next.js app, you can follow these steps:

1. Set up a Google Analytics account:
   - Go to the Google Analytics website (https://analytics.google.com) and sign in with your Google account.
   - Create a new Google Analytics property for your Next.js app by clicking on "Admin" in the bottom-left corner, selecting the appropriate account and property, and clicking on "Create Property".

2. Install the Google Analytics package:
   - In your Next.js project directory, open a terminal or command prompt.
   - Run the following command to install the `react-ga` package, which is a popular React wrapper for Google Analytics:
     ```
     npm install react-ga
     ```

3. Create a Google Analytics module:
   - In your Next.js project, create a new file called `googleAnalytics.js` or `analytics.js` in the `utils` directory (or any other convenient location).
   - Add the following code to the file:
     ```javascript showLineNumbers
     import ReactGA from 'react-ga';

     export const initGA = () => {
       ReactGA.initialize('YOUR_TRACKING_ID'); // Replace with your actual tracking ID
     };

     export const logPageView = () => {
       ReactGA.set({ page: window.location.pathname });
       ReactGA.pageview(window.location.pathname);
     };

     export const logEvent = (category = '', action = '') => {
       if (category && action) {
         ReactGA.event({ category, action });
       }
     };
     ```

4. Set up the Google Analytics initialization:
   - Open your Next.js project's main layout component (e.g., `pages/_app.js` or `pages/index.js`).
   - Add the following code at the top of the file, before the component definition:
     ```javascript showLineNumbers
     import { useEffect } from 'react';
     import { initGA, logPageView } from '../utils/googleAnalytics';

     const MyApp = ({ Component, pageProps }) => {
       useEffect(() => {
         initGA(); // Initialize Google Analytics
         logPageView(); // Log the initial pageview

         // Log pageview on route change
         const handleRouteChange = (url) => {
           logPageView();
         };

         // Event listener for route changes
         window.addEventListener('routeChangeComplete', handleRouteChange);

         // Cleanup event listener on component unmount
         return () => {
           window.removeEventListener('routeChangeComplete', handleRouteChange);
         };
       }, []);

       // Rest of your component code...

       return <Component {...pageProps} />;
     };

     export default MyApp;
     ```

5. Replace `'YOUR_TRACKING_ID'` with your actual tracking ID:
   - In the `googleAnalytics.js` file you created earlier, replace `'YOUR_TRACKING_ID'` in the `ReactGA.initialize()` function call with your Google Analytics tracking ID. The tracking ID should be in the format `'UA-XXXXXXXXX-X'`.

That's it! Google Analytics is now set up in your Next.js app. When you run your app and navigate between pages, Google Analytics will track the pageviews and send the data to your Google Analytics account. You can log custom events by calling the `logEvent()` function from anywhere in your app.

Note: It's important to replace `'YOUR_TRACKING_ID'` with your actual tracking ID for Google Analytics to work correctly. Additionally, make sure the Google Analytics module file (`googleAnalytics.js`) is imported and used in all the pages or components where you want to track pageviews and events.