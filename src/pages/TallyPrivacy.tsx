const TallyPrivacy = () => (
  <div style={{ background: '#000000', minHeight: '100vh', padding: '0 1.25rem 4rem', fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif", WebkitFontSmoothing: 'antialiased' }}>
    <div style={{ maxWidth: 680, margin: '0 auto', paddingTop: '5rem' }}>

      <span style={{ display: 'inline-block', fontSize: 12, fontWeight: 500, color: '#86868b', border: '1px solid rgba(255,255,255,0.15)', padding: '4px 12px', borderRadius: 999, marginBottom: '1.5rem' }}>
        Legal
      </span>

      <h1 style={{ fontSize: 'clamp(2rem,6vw,3rem)', fontWeight: 600, letterSpacing: '-.03em', color: '#f5f5f7', lineHeight: 1.15, marginBottom: '.75rem' }}>
        Privacy Policy<br />
        for Tally
      </h1>

      <p style={{ fontSize: 13, color: '#86868b', marginBottom: '3.5rem', paddingBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        Last updated: April 2026
      </p>

      <div style={{ background: '#1d1d1f', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: '1.25rem 1.5rem', marginBottom: '2.25rem' }}>
        <p style={{ color: '#86868b', margin: 0 }}>
          Tally is a personal finance app designed to help you track your daily budget and spending.
          We are committed to protecting your privacy —{' '}
          <strong style={{ color: '#f5f5f7' }}>all your data stays on your device, always.</strong>
        </p>
      </div>

      {[
        {
          title: 'Data Collection',
          body: <>Tally does <strong style={{ color: '#f5f5f7' }}>not</strong> collect, transmit, or share any personal data. All data you enter — including income, expenses, categories, and transaction history — is stored exclusively on your device using a local embedded database.</>,
        },
        {
          title: 'SMS Access',
          body: <>Tally requests permission to read SMS messages solely to detect bank transaction notifications and auto-create expense entries on your device. SMS content is processed locally and is <strong style={{ color: '#f5f5f7' }}>never transmitted</strong> to any server or third party.</>,
        },
        {
          title: 'No Internet Transmission',
          body: 'Tally does not send any data over the internet. There are no servers, no accounts, no cloud sync, and no analytics tracking of any kind.',
        },
        {
          title: 'Notifications',
          body: 'Tally uses local notifications to alert you about detected transactions. These notifications are generated and displayed entirely on your device.',
        },
        {
          title: 'Storage',
          body: 'Your financial data is stored locally on your device. It is never backed up to external servers by the app.',
        },
        {
          title: 'Third-Party Services',
          body: 'Tally does not integrate with any third-party analytics, advertising, or data collection services.',
        },
        {
          title: "Children's Privacy",
          body: 'Tally does not knowingly collect data from anyone, including children under 13.',
        },
        {
          title: 'Changes to This Policy',
          body: 'If this policy changes in a future update, the updated date at the top of this page will reflect that.',
        },
        {
          title: 'Contact',
          body: <>If you have questions about this privacy policy, reach out at <a href="mailto:ctom71718@gmail.com" style={{ color: '#2997ff', textDecoration: 'none' }}>ctom71718@gmail.com</a>.</>,
        },
      ].map(({ title, body }) => (
        <div key={title} style={{ marginBottom: '2.25rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 600, color: '#f5f5f7', marginBottom: '.5rem' }}>
            {title}
          </h2>
          <p style={{ color: '#86868b', lineHeight: 1.75 }}>{body}</p>
        </div>
      ))}

      <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: 13, color: '#6e6e73', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '.5rem' }}>
        <span>© 2026 Tom Cherian · Tally</span>
        <a href="mailto:ctom71718@gmail.com" style={{ color: '#2997ff', textDecoration: 'none' }}>ctom71718@gmail.com</a>
      </div>

    </div>
  </div>
);

export default TallyPrivacy;
