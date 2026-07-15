import { useState } from "react";
import { Sparkles, Eye, EyeOff, Zap } from "lucide-react";
import { useStore } from "../store/useStore";
import { registerAccount, loginAccount } from "../store/useStore";
import CLCLogo from "../components/Logo";

export default function LoginPage() {
  const loginFromAccount = useStore((s) => s.loginFromAccount);
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name,  setName]  = useState("");
  const [email, setEmail] = useState("");
  const [pass,  setPass]  = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const inputStyle: React.CSSProperties = {
    width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 14, padding: "13px 16px", color: "#fff", fontSize: 14, outline: "none",
    fontFamily: "system-ui, sans-serif", transition: "border-color 0.2s",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (mode === "signup") {
      if (!name.trim()) { setError("Please enter your name."); setLoading(false); return; }
      if (pass.length < 6) { setError("Password must be at least 6 characters."); setLoading(false); return; }
      if (pass !== confirm) { setError("Passwords don't match."); setLoading(false); return; }
      const result = registerAccount(name.trim(), email.trim(), pass);
      if (typeof result === "string") { setError(result); setLoading(false); return; }
      loginFromAccount(result);
    } else {
      const result = loginAccount(email.trim(), pass);
      if (typeof result === "string") { setError(result); setLoading(false); return; }
      loginFromAccount(result);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12" style={{ background: "transparent" }}>
      {/* Logo */}
      <div className="mb-6" style={{ animation: "fade-up 0.6s ease both" }}>
        <CLCLogo size={90} showText={false} />
      </div>

      <div className="text-center mb-8" style={{ animation: "fade-up 0.6s 0.1s ease both" }}>
        <h1 className="text-2xl font-bold tracking-tight text-white">
          {mode === "login" ? "Welcome back" : "Create your account"}
        </h1>
        <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>
          {mode === "login"
            ? "Sign in to your CLC Premier Studios account"
            : "Join the creative lab — free to start"}
        </p>
      </div>

      <div
        className="w-full max-w-sm"
        style={{
          background: "rgba(8,8,18,0.88)", backdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24, padding: 28,
          animation: "fade-up 0.6s 0.15s ease both",
        }}
      >
        {/* Tab toggle */}
        <div
          className="flex mb-6 p-1 rounded-xl"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          {(["login","signup"] as const).map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setError(""); }}
              className="flex-1 py-2 rounded-lg text-sm font-bold transition-all"
              style={mode === m
                ? { background: "linear-gradient(135deg,#00D485,#4ade8e)", color: "#000" }
                : { color: "rgba(255,255,255,0.4)" }
              }
            >
              {m === "login" ? "Sign In" : "Sign Up"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div>
              <label className="block text-xs font-bold mb-1.5" style={{ color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em" }}>YOUR NAME</label>
              <input
                type="text" value={name} onChange={(e) => setName(e.target.value)}
                placeholder="Crystal Lynn"
                style={inputStyle} required autoComplete="name"
                onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(0,212,133,0.5)"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold mb-1.5" style={{ color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em" }}>EMAIL</label>
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={inputStyle} required autoComplete="email"
              onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(0,212,133,0.5)"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
            />
          </div>

          <div>
            <label className="block text-xs font-bold mb-1.5" style={{ color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em" }}>PASSWORD</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"} value={pass} onChange={(e) => setPass(e.target.value)}
                placeholder={mode === "signup" ? "At least 6 characters" : "Your password"}
                style={{ ...inputStyle, paddingRight: 44 }} required
                autoComplete={mode === "signup" ? "new-password" : "current-password"}
                onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(0,212,133,0.5)"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
              />
              <button
                type="button" onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {mode === "signup" && (
            <div>
              <label className="block text-xs font-bold mb-1.5" style={{ color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em" }}>CONFIRM PASSWORD</label>
              <input
                type={showPass ? "text" : "password"} value={confirm} onChange={(e) => setConfirm(e.target.value)}
                placeholder="Repeat your password"
                style={inputStyle} required autoComplete="new-password"
                onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(0,212,133,0.5)"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
              />
            </div>
          )}

          {error && (
            <div
              className="text-sm px-4 py-3 rounded-xl"
              style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", color: "#fca5a5" }}
            >
              {error}
            </div>
          )}

          <button
            type="submit" disabled={loading}
            className="w-full py-3.5 rounded-xl font-bold text-sm transition-all mt-2"
            style={{
              background: loading ? "rgba(255,255,255,0.06)" : "linear-gradient(135deg,#00D485,#4ade8e)",
              color: loading ? "rgba(255,255,255,0.3)" : "#000",
              boxShadow: loading ? "none" : "0 0 24px rgba(0,212,133,0.35)",
            }}
          >
            {loading ? "Please wait…" : mode === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>

        {mode === "signup" && (
          <p className="text-center text-xs mt-4" style={{ color: "rgba(255,255,255,0.3)" }}>
            By signing up you get 20 free saved videos, royalty-free music, and basic editing tools — no credit card needed.
          </p>
        )}
      </div>

      {/* What you get */}
      {mode === "signup" && (
        <div
          className="w-full max-w-sm mt-5 rounded-2xl p-4"
          style={{
            background: "rgba(0,212,133,0.05)", border: "1px solid rgba(0,212,133,0.15)",
            animation: "fade-up 0.6s 0.25s ease both",
          }}
        >
          <p className="text-xs font-bold mb-3 flex items-center gap-1.5" style={{ color: "#4ade8e" }}>
            <Zap size={12} fill="#4ade8e" /> FREE ACCOUNT INCLUDES
          </p>
          {[
            "3 min recording per day",
            "Save up to 20 videos",
            "Royalty-free music library",
            "Video upload & export (always free)",
            "Cartoon character video frames",
            "Sound FX studio",
          ].map((f) => (
            <div key={f} className="flex items-center gap-2 mb-1.5">
              <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(0,212,133,0.15)" }}>
                <Sparkles size={9} style={{ color: "#00D485" }} />
              </div>
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>{f}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
