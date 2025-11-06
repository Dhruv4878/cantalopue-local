export const metadata = {
    title: 'LinkedIn Privacy Policy - PostGenerator',
  };
  
  export default function LinkedInPrivacyPolicyPage() {
    return (
      <main className="max-w-3xl mx-auto px-6 py-10 text-slate-800">
        <h1 className="text-3xl font-extrabold tracking-tight">LinkedIn Privacy Policy</h1>
        <p className="text-slate-600 mt-2">Last updated: {new Date().toLocaleDateString()}</p>
  
        <section className="mt-8 space-y-4 text-sm leading-6">
          <p>
            This LinkedIn Privacy Policy explains how PostGenerator ("we", "our", "us")
            handles your LinkedIn data when you connect your LinkedIn account and use
            our features that integrate with LinkedIn.
          </p>
  
          <h2 className="text-xl font-semibold mt-6">What We Access</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              LinkedIn account identifiers necessary to operate the integration, specifically your
              LinkedIn member ID.
            </li>
            <li>
              An OAuth access token issued by LinkedIn after you grant consent. We use this token
              strictly to perform actions you request (e.g., posting content) on your behalf.
            </li>
          </ul>
  
          <h2 className="text-xl font-semibold mt-6">How We Use LinkedIn Data</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Authenticate your LinkedIn connection and confirm your account identity.
            </li>
            <li>
              Publish content to your LinkedIn account when you explicitly request posting.
            </li>
            <li>
              Operate, maintain, and improve our LinkedIn integration (for example, to handle
              errors, verify connectivity, or display connection status).
            </li>
          </ul>
  
          <h2 className="text-xl font-semibold mt-6">What We Do Not Do</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>We do not read your private LinkedIn messages.</li>
            <li>We do not sell or rent your LinkedIn data.</li>
            <li>We do not post to LinkedIn without an explicit action from you.</li>
          </ul>
  
          <h2 className="text-xl font-semibold mt-6">Data Storage and Security</h2>
          <p>
            We store your LinkedIn member ID and access token in your profile within our database to
            maintain the connection you requested. We apply industry-standard security controls such as
            HTTPS, access controls, and monitoring. In production, we recommend using encrypted storage
            for OAuth tokens. We retain this data only as long as needed to provide the service, to
            comply with legal obligations, or until you disconnect LinkedIn.
          </p>
  
          <h2 className="text-xl font-semibold mt-6">Disconnecting LinkedIn</h2>
          <p>
            You can disconnect LinkedIn at any time from within our app. Once disconnected, we will stop
            using your LinkedIn token for any actions. You may also revoke our access directly from your
            LinkedIn account settings. After disconnection, you can request deletion of your stored
            LinkedIn credentials as described below.
          </p>
  
          <h2 className="text-xl font-semibold mt-6">Data Deletion</h2>
          <p>
            To request deletion of your LinkedIn data stored with us (such as access tokens and member ID),
            contact us at the email below. We will delete your LinkedIn credentials from our systems within a
            reasonable timeframe unless we must retain them for legal or security reasons.
          </p>
  
          <h2 className="text-xl font-semibold mt-6">Third Parties</h2>
          <p>
            We use LinkedIn APIs to perform the actions you request. Your use of LinkedIn is also governed by
            LinkedIn’s own terms and privacy policy. We may use service providers (e.g., hosting, logging) that
            process limited data as needed to operate our services, under appropriate agreements.
          </p>
  
          <h2 className="text-xl font-semibold mt-6">Children’s Data</h2>
          <p>
            Our services are not directed to children under the age of 13 (or other age as required by local law),
            and we do not knowingly collect personal information from children.
          </p>
  
          <h2 className="text-xl font-semibold mt-6">Changes to This Policy</h2>
          <p>
            We may update this LinkedIn Privacy Policy from time to time. We will update the “Last updated” date
            above when changes occur. Your continued use of our LinkedIn features after changes constitutes acceptance
            of the updated policy.
          </p>
  
          <h2 className="text-xl font-semibold mt-6">Contact</h2>
          <p>
            If you have questions or requests related to this LinkedIn Privacy Policy, please contact:
            <br />
            <span className="font-medium">Email:</span> support@postgenerator.example
          </p>
        </section>
      </main>
    );
  }