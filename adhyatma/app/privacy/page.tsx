export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <p className="text-xs uppercase tracking-widest text-amber-800/70 mb-2">
        Legal
      </p>
      <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-8">
        Privacy Policy
      </h1>

      <div className="text-stone-700 leading-relaxed space-y-5 text-[15px] md:text-base">
        <p>
          Adhyatma is a small, personal project. This page explains simply what
          information is collected and how it&apos;s used.
        </p>

        <h2 className="text-lg font-bold text-stone-900 pt-2">
          What we collect
        </h2>
        <p>
          When you create an account, we store your email address, an optional
          name, and a securely hashed version of your password — your actual
          password is never stored or visible to us. We also store your practice
          data: japa rounds, meditation minutes, and the dates you practiced.
        </p>

        <h2 className="text-lg font-bold text-stone-900 pt-2">
          Why we collect it
        </h2>
        <p>
          This information exists only so you can log in and have your practice
          history saved and available whenever you return. We do not sell data,
          or share information with advertisers.
        </p>

        <h2 className="text-lg font-bold text-stone-900 pt-2">
          Where it&apos;s stored
        </h2>
        <p>
          Your data is stored securely using MongoDB Atlas, a third-party cloud
          database provider. We don&apos;t share this data with any other third
          parties.
        </p>

        <h2 className="text-lg font-bold text-stone-900 pt-2">Cookies</h2>
        <p>
          We use a single session cookie to keep you signed in. It doesn&apos;t
          track you across other websites.
        </p>

        <h2 className="text-lg font-bold text-stone-900 pt-2">Your rights</h2>
        <p>
          You can request that your account and data be deleted at any time by
          reaching out through the contact page.
        </p>

        <h2 className="text-lg font-bold text-stone-900 pt-2">Changes</h2>
        <p>
          This policy may be updated as the project grows. Check back here if
          you&apos;d like to stay informed.
        </p>
      </div>
    </div>
  );
}
