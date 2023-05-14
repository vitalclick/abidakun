---
layout: Post
title: How to Deploy a Nextjs App on cPanel efficiently - 2023 Update
description: In this article we will learn about how to efficiently deploy a Next JS application on cPanel.
date: '2023-05-01'
tags:
  - full-stack
images:
  - src: /photos/nextjs-app-on-cpanel.jpg
    alt: image alt attribute
---

### Introduction:

Deploying a Next.js application on cPanel can provide a convenient and reliable hosting solution for your web application. In this article, we will guide you through the step-by-step process of efficiently deploying a Next.js app on cPanel, ensuring smooth operation and optimal performance.

### Prerequisites:
Before proceeding with the deployment, make sure you have the following:

1. A cPanel hosting account with SSH access enabled.
2. Node.js and npm installed on your local development environment.
3. Git installed on your local machine.

##### Step 1: Set Up Your Next.js Application Locally

1. Open your terminal and navigate to the directory where you want to create your Next.js app.
2. Use the following command to create a new Next.js app:
```
npx create-next-app your-app-name
```
3. Change into the app directory:
```
cd your-app-name
```
4. Start the local development server:
```
npm run dev
```
Verify that your app is running correctly at http://localhost:3000 before proceeding.

##### Step 2: Prepare Your Next.js App for Deployment

1. Open the package.json file of your Next.js app and ensure the "scripts" section contains the following:
```
"scripts": {
  "build": "next build",
  "start": "next start"
}
```
2. Run the following command to create a production build of your Next.js app:
```
npm run build
```
This will generate an optimized build of your app in the `.next` directory.

##### Step 3: Set Up Your cPanel Environment

1. Log in to your cPanel account and navigate to the "File Manager".
2. Create a new directory for your app inside the "public_html" folder, e.g., `your-app`.
3. Upload the contents of the `.next` directory from your local machine to the `your-app` directory in cPanel using the file manager or an FTP client.

##### Step 4: Configure Your cPanel Node.js App

1. Go back to the cPanel dashboard and navigate to the "Setup Node.js App" section.
2. Click on the "Create Application" button and fill in the necessary details:
   - Application root: Select the `your-app` directory you created earlier.
   - Application URL: Enter the URL path for your app, e.g., `/your-app`.
   - Application startup file: Leave it as the default value (`server.js`).
   - Application mode: Select "Production".
   - Environment variables: Add any required environment variables, if applicable.
3. Click on the "Create" button to create your Node.js application on cPanel.

##### Step 5: Start Your Next.js App on cPanel

1. Once the application is created, go back to the "Setup Node.js App" section.
2. Under "Applications", locate your app and click on the "Run" button to start your Next.js app.
3. Wait for the application to start, and you will see the "Running" status.
4. Visit your app by navigating to the specified URL path, e.g., `https://your-domain.com/your-app`.

### Conclusion:

By following this step-by-step guide, you can efficiently deploy your Next.js app on cPanel. This process ensures that your application is set up correctly, optimized for production, and ready to deliver a seamless user experience. Take advantage of the power and convenience of cPanel hosting while leveraging the capabilities of Next.js to build modern and performant web applications.