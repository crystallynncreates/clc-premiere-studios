import { useNavigate } from "react-router-dom";
import { Radio, Scissors, Music, Share2, Palette, Sparkles, Film, Calendar, Zap, ArrowRight, Trash2 } from "lucide-react";
import { useStore } from "../store/useStore";
import { TIER_LIMITS } from "../types";
import CLCLogo from "../components/Logo";

const ACTIONS = [
  { icon: Radio,    label: "Go Live",       sub: "Stream now",     route: "/studio", color: "#EF4444", grad: "linear-gradient(135deg, #EF4444, #DC2626)" },
  { icon: Film,     label: "Record",        sub: "Capture it",     route: "/studio", color: "#00D485", grad: "linear-gradient(135deg, #00D485, #00A86B)" },
  { icon: Scissors, label: "Edit Video",    sub: "Cut & create",   route: "/editor", color: "#7C5CF6", grad: "linear-gradient(135deg, #7C5CF6, #6D4FE0)" },
  { icon: Music,    label: "AI Music",      sub: "Your sound",     route: "/editor", color: "#F59E0B", grad: "linear-gradient(135deg, #F59E0B, #D97706)" },
  { icon: Share2,   label: "Schedule Post", sub: "Plan content",   route: "/social", color: "#0EA5E9", grad: "linear-gradient(135deg, #0EA5E9, #0284C7)" },
  { icon: Palette,  label: "Skins & Style", sub: "Be you",         route: "/editor", color: "#FF6B9D", grad: "linear-gradient(135deg, #FF6B9D, #E0456B)" },
];

function AnimWaveform({ color = "#00D485", bars = 18, h = 28 }: { color?: string; bars?: number; h?: number }) {
  return (
    <div className="flex items-end gap-0.5" style={{ height: h }}>
      {Array.from({ length: bars }).map((_, i) => (
        <div
          key={i}
          className="wave-bar rounded-full flex-1"
          style={{
            background: color,
            height: "100%",
            opacity: 0.6 + (i % 3) * 0.13,
            "--dur": `${0.5 + (i % 5) * 0.15}s`,
            "--delay": `${(i * 0.08) % 0.8}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

export default function HomePage() {
  const navigate = useNavigate();
  const { user, projects, scheduledPosts, deleteProject } = useStore();
  const limit     = TIER_LIMITS[user.tier];
  const used      = user.recordingSecondsUsedToday;
  const max       = limit.dailyRecordingSeconds;
  const progress  = max === Infinity ? 0 : Math.min(1, used / max);
  const remaining = max === Infinity ? null : Math.max(0, max - used);

  return (
    <div className="min-h-full p-4 md:p-6 space-y-5 max-w-4xl mx-auto pb-8">

      {/* ── HERO ── */}
      <div
        className="fade-up relative rounded-3xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0F0F20 0%, #13132A 50%, #0F1824 100%)",
          border: "1px solid rgba(0,212,133,0.2)",
          boxShadow: "0 0 60px rgba(0,212,133,0.06), 0 0 120px rgba(124,92,246,0.04)",
        }}
      >
        {/* Corner glow orbs */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(0,212,133,0.1) 0%, transparent 70%)", transform: "translate(30%,-30%)" }} />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(124,92,246,0.1) 0%, transparent 70%)", transform: "translate(-30%,30%)" }} />

        <div className="relative p-6 flex flex-col md:flex-row items-center gap-6">
          <div className="float shrink-0">
            <CLCLogo size={96} showText={false} />
          </div>

          <div className="flex-1 text-center md:text-left">
            <p className="text-xs font-bold tracking-[0.3em] uppercase mb-1" style={{ color: "rgba(0,212,133,0.7)" }}>
              Welcome back
            </p>
            <h1
              className="text-3xl md:text-4xl font-bold mb-2"
              style={{ fontFamily: "Georgia, serif", lineHeight: 1.15 }}
            >
              <span className="holo-text">{user.name}</span>
            </h1>
            <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.45)" }}>
              Your creative studio is ready · Stream · Edit · Create · Share
            </p>

            {/* Waveform decoration */}
            <div className="mb-4 opacity-60">
              <AnimWaveform bars={24} h={24} />
            </div>

            <div className="flex items-center gap-3 justify-center md:justify-start flex-wrap">
              <span
                className="text-xs font-bold px-3 py-1.5 rounded-full capitalize"
                style={{
                  background: user.tier === "pro" ? "rgba(124,92,246,0.2)" : user.tier === "basic" ? "rgba(0,212,133,0.15)" : "rgba(156,163,175,0.15)",
                  color: user.tier === "pro" ? "#7C5CF6" : user.tier === "basic" ? "#00D485" : "#9CA3AF",
                  border: `1px solid ${user.tier === "pro" ? "#7C5CF620" : user.tier === "basic" ? "#00D48520" : "#6B728020"}`,
                }}
              >
                {user.tier} Plan
              </span>
              {remaining !== null ? (
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {Math.floor(remaining / 60)}:{String(remaining % 60).padStart(2, "0")} recording left today
                </span>
              ) : (
                <span className="text-xs font-semibold flex items-center gap-1" style={{ color: "#00D485" }}>
                  <Zap size={11} fill="#00D485" /> Unlimited recording
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Recording Usage Bar ── */}
      {max !== Infinity && (
        <div
          className="fade-up fade-up-1 rounded-2xl p-4 relative overflow-hidden"
          style={{ background: "rgba(15,15,30,0.8)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(12px)" }}
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-bold" style={{ color: "rgba(255,255,255,0.8)" }}>Recording Time Today</p>
            <button
              onClick={() => navigate("/account")}
              className="text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 transition-all hover:opacity-80"
              style={{ background: "rgba(0,212,133,0.12)", color: "#00D485", border: "1px solid rgba(0,212,133,0.2)" }}
            >
              Upgrade <ArrowRight size={10} />
            </button>
          </div>
          <div className="h-2 rounded-full overflow-hidden mb-2" style={{ background: "rgba(255,255,255,0.07)" }}>
            <div
              className="h-2 rounded-full transition-all"
              style={{
                width: `${progress * 100}%`,
                background: progress > 0.8
                  ? "linear-gradient(90deg, #EF4444, #F59E0B)"
                  : "linear-gradient(90deg, #00D485, #7C5CF6)",
                boxShadow: `0 0 8px ${progress > 0.8 ? "rgba(239,68,68,0.5)" : "rgba(0,212,133,0.5)"}`,
              }}
            />
          </div>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
            {Math.floor(used / 60)}:{String(used % 60).padStart(2, "0")} used of {Math.floor(max / 60)} min
          </p>
        </div>
      )}

      {/* ── Quick Actions ── */}
      <div className="fade-up fade-up-2">
        <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "rgba(255,255,255,0.35)" }}>
          Quick Actions
        </p>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {ACTIONS.map((a, i) => (
            <button
              key={a.label}
              onClick={() => navigate(a.route)}
              className="card-lift glow-border flex flex-col items-center gap-2.5 p-4 rounded-2xl group relative overflow-hidden"
              style={{
                background: "rgba(15,15,30,0.8)",
                border: "1px solid rgba(255,255,255,0.07)",
                backdropFilter: "blur(12px)",
              }}
            >
              {/* Glow blob on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"
                style={{ background: `radial-gradient(circle at center, ${a.color}15 0%, transparent 70%)` }}
              />
              <div
                className="relative w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ background: `${a.color}15`, border: `1px solid ${a.color}25` }}
              >
                <a.icon size={22} style={{ color: a.color }} />
              </div>
              <div className="relative text-center">
                <p className="text-white text-xs font-bold leading-tight">{a.label}</p>
                <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.65rem" }}>{a.sub}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── AI Studio Banner ── */}
      <div
        className="fade-up fade-up-3 relative rounded-2xl overflow-hidden cursor-pointer"
        style={{
          background: "linear-gradient(135deg, #120D28 0%, #1A1040 50%, #120D28 100%)",
          border: "1px solid rgba(124,92,246,0.3)",
          boxShadow: "0 0 40px rgba(124,92,246,0.08)",
        }}
        onClick={() => user.tier !== "pro" && navigate("/account")}
      >
        {/* Animated orb */}
        <div className="absolute right-0 top-0 w-48 h-48 pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(124,92,246,0.15) 0%, transparent 70%)", transform: "translate(20%,-20%)" }} />
        <div className="absolute left-1/2 bottom-0 w-40 h-32 pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,107,157,0.08) 0%, transparent 70%)" }} />

        <div className="relative p-5 flex items-start gap-4">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 float"
            style={{ background: "rgba(124,92,246,0.2)", border: "1px solid rgba(124,92,246,0.3)", boxShadow: "0 0 20px rgba(124,92,246,0.2)" }}
          >
            <Sparkles size={22} style={{ color: "#A78BFA" }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-white font-bold text-base">AI-Powered Studio</h3>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(124,92,246,0.2)", color: "#A78BFA" }}>
                PRO
              </span>
            </div>
            <p className="text-sm mb-3" style={{ color: "rgba(255,255,255,0.45)" }}>
              Generate music, blend your voice with top artists, smart edits, AI captions — all in one creative engine.
            </p>
            {user.tier !== "pro" ? (
              <button
                className="font-bold px-5 py-2 rounded-xl text-sm flex items-center gap-2 transition-all hover:opacity-90"
                style={{
                  background: "linear-gradient(135deg, #7C5CF6, #A78BFA)",
                  color: "white",
                  boxShadow: "0 0 20px rgba(124,92,246,0.4)",
                }}
              >
                <Zap size={14} fill="white" />
                Unlock AI — Pro $9.99/mo or $120/yr
              </button>
            ) : (
              <div className="flex items-center gap-2 text-sm" style={{ color: "#A78BFA" }}>
                <Sparkles size={14} />
                <span className="font-semibold">AI Studio active</span>
                <span style={{ color: "rgba(255,255,255,0.3)" }}>· Pro plan</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Recent Projects ── */}
      <div className="fade-up fade-up-4">
        {/* Header row with save count */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.35)" }}>
              Saved Videos
            </p>
            {/* Save count badge */}
            {(() => {
              const limit = TIER_LIMITS[user.tier].savedVideos;
              const count = projects.length;
              const pct = limit === Infinity ? 0 : count / limit;
              const limitLabel = limit === Infinity ? "∞" : limit;
              return (
                <span
                  className="text-xs font-bold px-2.5 py-0.5 rounded-full"
                  style={{
                    background: pct >= 0.9
                      ? "rgba(239,68,68,0.15)"
                      : pct >= 0.7
                      ? "rgba(245,158,11,0.15)"
                      : "rgba(0,212,133,0.1)",
                    color: pct >= 0.9 ? "#FCA5A5" : pct >= 0.7 ? "#FCD34D" : "#4ade8e",
                    border: `1px solid ${pct >= 0.9 ? "rgba(239,68,68,0.25)" : pct >= 0.7 ? "rgba(245,158,11,0.25)" : "rgba(0,212,133,0.2)"}`,
                  }}
                >
                  {count}/{limitLabel}
                </span>
              );
            })()}
          </div>
          <button onClick={() => navigate("/editor")} className="text-xs font-semibold flex items-center gap-1"
            style={{ color: "rgba(0,212,133,0.7)" }}>
            All <ArrowRight size={10} />
          </button>
        </div>

        {/* Save limit warning */}
        {(() => {
          const limit = TIER_LIMITS[user.tier].savedVideos;
          if (limit !== Infinity && projects.length >= limit) {
            return (
              <div
                className="mb-3 flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold"
                style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#FCA5A5" }}
              >
                <Film size={14} />
                <span>You've reached your {limit}-video limit.</span>
                <button
                  onClick={() => navigate("/account")}
                  className="ml-auto font-bold px-3 py-1 rounded-lg transition-all hover:opacity-80"
                  style={{ background: "rgba(239,68,68,0.15)", color: "#FCA5A5", border: "1px solid rgba(239,68,68,0.25)" }}
                >
                  Upgrade
                </button>
              </div>
            );
          }
          return null;
        })()}

        {projects.length === 0 ? (
          <div
            className="p-8 text-center rounded-2xl"
            style={{ background: "rgba(15,15,30,0.7)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <Film size={30} style={{ color: "rgba(255,255,255,0.15)" }} />
            </div>
            <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>
              No projects yet — your creative journey starts here.
            </p>
            <button
              onClick={() => navigate("/studio")}
              className="font-bold px-6 py-2.5 rounded-xl text-sm transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #00D485, #00A86B)", color: "white", boxShadow: "0 0 20px rgba(0,212,133,0.3)" }}
            >
              Start Creating
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {projects.slice(0, 5).map((p) => (
              <div
                key={p.id}
                className="card-lift flex items-center gap-4 p-4 rounded-2xl group"
                style={{ background: "rgba(15,15,30,0.7)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div
                  className="w-14 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(0,212,133,0.08)", border: "1px solid rgba(0,212,133,0.15)" }}
                >
                  <Film size={18} style={{ color: "#00D485" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{p.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>
                    {p.clipCount} clips · {Math.floor(p.duration / 60)}:{String(p.duration % 60).padStart(2, "0")}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => navigate("/editor")}
                    className="text-xs font-bold px-3 py-1.5 rounded-lg"
                    style={{ background: "rgba(0,212,133,0.1)", color: "#00D485", border: "1px solid rgba(0,212,133,0.2)" }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete "${p.name}"? This can't be undone.`)) {
                        deleteProject(p.id);
                      }
                    }}
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 hover:!opacity-100"
                    style={{ background: "rgba(239,68,68,0.1)", color: "#F87171", border: "1px solid rgba(239,68,68,0.2)" }}
                    title="Delete project"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
            {projects.length > 5 && (
              <button
                onClick={() => navigate("/editor")}
                className="w-full py-3 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2"
                style={{ background: "rgba(15,15,30,0.5)", border: "1px solid rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.3)" }}
              >
                +{projects.length - 5} more <ArrowRight size={12} />
              </button>
            )}
          </div>
        )}
      </div>

      {/* ── Scheduled Posts ── */}
      <div className="fade-up fade-up-5 pb-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.35)" }}>
            Scheduled Posts
          </p>
          <button onClick={() => navigate("/social")} className="text-xs font-semibold flex items-center gap-1"
            style={{ color: "rgba(0,212,133,0.7)" }}>
            Manage <ArrowRight size={10} />
          </button>
        </div>
        {scheduledPosts.length === 0 ? (
          <div
            className="flex items-center gap-4 p-4 rounded-2xl"
            style={{ background: "rgba(15,15,30,0.7)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <Calendar size={22} style={{ color: "rgba(255,255,255,0.2)" }} className="shrink-0" />
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
              No posts scheduled — connect your social accounts to get started.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {scheduledPosts.slice(0, 3).map((p) => (
              <div key={p.id} className="flex items-center gap-3 p-3 rounded-xl"
                style={{ background: "rgba(15,15,30,0.7)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <Calendar size={16} style={{ color: "#0EA5E9" }} className="shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{p.caption || "No caption"}</p>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>
                    {p.platforms.join(", ")} · {p.scheduledAt}
                  </p>
                </div>
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full shrink-0"
                  style={p.status === "pending"
                    ? { background: "rgba(245,158,11,0.12)", color: "#F59E0B" }
                    : { background: "rgba(0,212,133,0.12)", color: "#00D485" }}
                >
                  {p.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
