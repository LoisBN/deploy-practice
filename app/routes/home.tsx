export default function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <h1 style={{
        fontSize: '48px',
        fontWeight: 800,
        background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '16px',
      }}>
        You deployed!
      </h1>
      <p style={{ fontSize: '20px', color: '#94a3b8', maxWidth: '500px', margin: '0 auto', lineHeight: 1.6 }}>
        If you can see this page, your Vercel deployment is working perfectly.
        This app was built with React Router v7 and deployed with zero configuration.
      </p>
      <div style={{
        marginTop: '32px',
        padding: '16px 24px',
        background: 'rgba(34, 197, 94, 0.1)',
        border: '1px solid rgba(34, 197, 94, 0.3)',
        borderRadius: '12px',
        display: 'inline-block',
        color: '#86efac',
        fontWeight: 600,
      }}>
        Deployment status: Live
      </div>
    </div>
  );
}
