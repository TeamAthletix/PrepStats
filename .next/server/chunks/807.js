"use strict";exports.id=807,exports.ids=[807],exports.modules={9807:(e,t,a)=>{a.r(t),a.d(t,{default:()=>App});var n=a(997),g=a(4298),o=a.n(g),r=a(6689),s=a(1163);function App({Component:e,pageProps:t}){let a=(0,s.useRouter)();return(0,r.useEffect)(()=>{let handleRouteChange=e=>{"function"==typeof window.gtag&&window.gtag("config","G-MEFY4NEWQN",{page_path:e})};return a.events.on("routeChangeComplete",handleRouteChange),()=>{a.events.off("routeChangeComplete",handleRouteChange)}},[a.events]),(0,n.jsxs)(n.Fragment,{children:[n.jsx(o(),{strategy:"afterInteractive",src:"https://www.googletagmanager.com/gtag/js?id=G-MEFY4NEWQN"}),n.jsx(o(),{id:"gtag-init",strategy:"afterInteractive",dangerouslySetInnerHTML:{__html:`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', 'G-MEFY4NEWQN', {
              page_path: window.location.pathname,
            });
          `}}),n.jsx(e,{...t})]})}}};