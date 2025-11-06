export const metadata = {
    title: 'Privacy Policy - PostGenerator',
  };
  
  export default function PrivacyPolicyPage() {
    return (
      <main className="max-w-3xl mx-auto px-6 py-10 text-slate-800">
        <h1 className="text-3xl font-extrabold tracking-tight">Privacy Policy</h1>
        <p className="text-slate-600 mt-2">Last updated: {new Date().toLocaleDateString()}</p>
  
        <section className="mt-8 space-y-4 text-sm leading-6">
          <p>
            This policy explains how PostGenerator ("we", "our", "us") collects, uses, and protects
            your information when you use our website and services.
          </p>
  
          <h2 className="text-xl font-semibold mt-6">Information We Collect</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Account details such as name and email to create and authenticate your account.</li>
            <li>Content you generate in the app (captions, hashtags, images) to provide the service.</li>
            <li>
              Social platform tokens and IDs (e.g., Facebook Page ID, Instagram Business Account ID,
              access tokens) strictly for posting to your connected accounts at your request.
            </li>
            <li>Usage and device information to improve performance and security.</li>
          </ul>
  
          <h2 className="text-xl font-semibold mt-6">How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Authenticate you and maintain your session.</li>
            <li>Generate captions, hashtags, and images per your prompts.</li>
            <li>Publish content to your selected social accounts only when you request it.</li>
            <li>Operate, maintain, and improve our services.</li>
          </ul>
  
          <h2 className="text-xl font-semibold mt-6">Data Sharing</h2>
          <p>
            We do not sell your data. We share data only with service providers and social platforms
            (e.g., Meta APIs) as needed to deliver requested actions, and as required by law.
          </p>
  
          <h2 className="text-xl font-semibold mt-6">Data Security & Retention</h2>
          <p>
            We use HTTPS, access controls, and industry practices to protect your data. We retain data
            only as long as necessary to provide the service or comply with legal requirements. You may
            disconnect social accounts at any time.
          </p>
  
          <h2 className="text-xl font-semibold mt-6">Your Rights</h2>
          <p>
            You may request access, correction, or deletion of your personal data. If you disconnect a
            social account, we will stop using its tokens for publishing.
          </p>
  
          <h2 className="text-xl font-semibold mt-6">Data Deletion Requests</h2>
          <p>
            To request deletion of your data, contact us at the email below. We will respond within a
            reasonable timeframe and delete account-associated data unless we must retain it for legal
            reasons.
          </p>
  
          <h2 className="text-xl font-semibold mt-6">Contact</h2>
          <p>
            If you have questions about this policy or our practices, please contact:
            <br />
            <span className="font-medium">Email:</span> support@postgenerator.example
          </p>
  
          <p className="text-slate-500 mt-6 text-xs">
            This policy may be updated from time to time. Continued use of the service constitutes
            acceptance of any changes.
          </p>
        </section>
      </main>
    );
  }