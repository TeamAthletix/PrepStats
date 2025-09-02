import Head from 'next/head';
import TeamUploader from '../../components/admin/TeamUploader';
import AssetManager from '../../components/admin/AssetManager';

export default function AdminDashboard() {
  return (
    <>
      <Head>
        {/* Telemetry Beacon */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-MEFY4NEWQN"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MEFY4NEWQN');
          `
        }} />
      </Head>

      <div>
        <h1>🛠️ PrepStats Admin Panel</h1>
        <TeamUploader />
        <AssetManager />
      </div>
    </>
  );
}
