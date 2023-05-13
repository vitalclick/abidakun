import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import MDXComponents from '@/components/MDX'
import '@/styles/globals.css'
import { useEffect } from 'react';
import { initGA, logPageView } from '../utils/googleAnalytics';

const MyApp = ({ Component, pageProps }) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

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

  return (
    <MDXProvider components={MDXComponents}>{getLayout(<Component {...pageProps} />)}</MDXProvider>
  )
}

export default MyApp;
