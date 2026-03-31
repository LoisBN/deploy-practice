import type { Route } from "./+types/home";
import { getSupabase } from "../lib/supabase.server";
import { motion } from "framer-motion";

export async function loader() {
  const env = process.env.VERCEL_ENV || process.env.NODE_ENV || "development";
  const isProduction = env === "production";
  const isLocal = env === "development";

  let supabaseConnected = false;
  let supabaseConfigured = false;

  const supabase = getSupabase();

  if (supabase) {
    supabaseConfigured = true;
    try {
      const { error } = await supabase.from("_").select("*").limit(1);
      // Error code 42P01 means table doesn't exist, which is fine - connection works
      supabaseConnected = !error || error.code === "42P01";
    } catch {
      supabaseConnected = false;
    }
  }

  return {
    env,
    isProduction,
    isLocal,
    supabaseConnected,
    supabaseConfigured,
  };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { env, isProduction, isLocal, supabaseConnected, supabaseConfigured } = loaderData;

  const supabaseStatus = !supabaseConfigured
    ? { value: "Not configured", status: "warning" as const, icon: "⚙️" }
    : supabaseConnected
    ? { value: "Connected", status: "success" as const, icon: "🔗" }
    : { value: "Error", status: "warning" as const, icon: "⚠️" };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      background: 'radial-gradient(ellipse at top, #1e293b 0%, #0f172a 50%, #020617 100%)',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ textAlign: 'center', maxWidth: '600px' }}
      >
        {/* Logo/Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          style={{
            width: '80px',
            height: '80px',
            margin: '0 auto 24px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '36px',
            boxShadow: '0 20px 40px rgba(139, 92, 246, 0.3)',
          }}
        >
          🚀
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            fontSize: 'clamp(32px, 8vw, 56px)',
            fontWeight: 800,
            background: 'linear-gradient(135deg, #06b6d4, #8b5cf6, #ec4899)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '16px',
            letterSpacing: '-0.02em',
          }}
        >
          Deployment Success
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{
            fontSize: '18px',
            color: '#94a3b8',
            lineHeight: 1.7,
            marginBottom: '40px',
          }}
        >
          Your React Router v7 app is running smoothly.
          <br />Built with modern tooling and deployed on Vercel.
        </motion.p>

        {/* Status Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '16px',
            width: '100%',
          }}
        >
          {/* Environment Card */}
          <StatusCard
            label="Environment"
            value={isLocal ? "Local" : isProduction ? "Production" : env}
            status={isProduction ? "success" : "info"}
            icon={isLocal ? "💻" : "🌍"}
            delay={0.6}
          />

          {/* Deployment Card */}
          <StatusCard
            label="Deployment"
            value="Live"
            status="success"
            icon="✓"
            delay={0.7}
          />

          {/* Supabase Card */}
          <StatusCard
            label="Supabase"
            value={supabaseStatus.value}
            status={supabaseStatus.status}
            icon={supabaseStatus.icon}
            delay={0.8}
          />
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          style={{
            marginTop: '48px',
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {['React Router v7', 'Vite', 'Vercel', 'Supabase'].map((tech, i) => (
            <span
              key={tech}
              style={{
                padding: '8px 16px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '100px',
                fontSize: '13px',
                color: '#cbd5e1',
                fontWeight: 500,
              }}
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

function StatusCard({
  label,
  value,
  status,
  icon,
  delay,
}: {
  label: string;
  value: string;
  status: "success" | "warning" | "info";
  icon: string;
  delay: number;
}) {
  const colors = {
    success: { bg: 'rgba(34, 197, 94, 0.1)', border: 'rgba(34, 197, 94, 0.2)', text: '#86efac' },
    warning: { bg: 'rgba(251, 191, 36, 0.1)', border: 'rgba(251, 191, 36, 0.2)', text: '#fcd34d' },
    info: { bg: 'rgba(59, 130, 246, 0.1)', border: 'rgba(59, 130, 246, 0.2)', text: '#93c5fd' },
  };

  const c = colors[status];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 300, damping: 20 }}
      whileHover={{ scale: 1.02, y: -2 }}
      style={{
        padding: '20px',
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        borderRadius: '16px',
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: '24px', marginBottom: '8px' }}>{icon}</div>
      <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {label}
      </div>
      <div style={{
        fontSize: '15px',
        fontWeight: 600,
        color: c.text,
        padding: '6px 12px',
        background: c.bg,
        border: `1px solid ${c.border}`,
        borderRadius: '8px',
        display: 'inline-block',
      }}>
        {value}
      </div>
    </motion.div>
  );
}
