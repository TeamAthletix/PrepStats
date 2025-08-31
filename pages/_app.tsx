/ File: pages/_app.tsx
import type { AppProps } from 'next/app';
import Script from 'next/script';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { GA_MEASUREMENT_ID, pageview, initGtagIfNeeded } from '@/lib/gtag';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Initialize GA once on first load
  useEffect(() => {
    if (typeof window === 'undefined') return;
    initGtagIfNeeded();
    pageview(window.location.pathname + window.location.search);
  }, []);

  // Track route changes for GA4
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageview(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname + window.location.search
            });
          `,
        }}
      />
      <Component {...pageProps} />
    </>
  );
}