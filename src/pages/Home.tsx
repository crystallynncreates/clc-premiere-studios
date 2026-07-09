import { useNavigate } from "react-router-dom";
import { Radio, Scissors, Music, Share2, Palette, Sparkles, Film, Calendar, Infinity } from "lucide-react";
import { useStore } from "../store/useStore";
import { TIER_LIMITS } from "../types";
import CLCLogo from "../components/Logo";

const ACTIONS = [
  { icon: Radio,    label: "Go Live",       route: "/studio", color: "#EF4444", glow: "rgba(239,68,68,0.25)"    },
  { icon: Film,     label: "Record",        route: "/studio", color: "#00D485", glow: "rgba(0,212,133,0.25)"   },
  { icon: Scissors, label: "Edit Video",    route: "/editor", color: "#7C5CF6", glow: "rgba(124,92,246,0.25)"  },
  { icon: Music,    label: "AI Music",      route: "/editor", color: "#F59E0B", glow: "rgba(245,158,11,0.25)"  },
  { icon: Share2,   label: "Schedule Post", route: "/social", color: "#0EA5E9", glow: "rgba(14,165,233,0.25)"  },
  { icon: Palette,  label: "Skins",         route: "/editor", color: "#EC4899", glow: "rgba(236,72,153,0.25)"  },
];

const CARD = {
  background: "#13131E",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: "1rem",
};

export default function HomePage() {
  const navigate = useNavigate();
  const { user, projects, scheduledPosts } = useStore();
  const limit = TIER_LIMITS[user.tier];
  const used  = user.recordingSecondsUsedToday;
  const max   = limit.dailyRecordingSeconds;
  const progress  = max === Infinity ? 0 : Math.min(1, used / max);
  const remaining = max === Infinity ? null : Math.max(0, max - used);

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-5">

      {/* ── Hero ── */}
      <div
        className="rounded-2xl p-6 flex flex-col md:flex-row items-center gap-5 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #13131E 0%, #1C1C2C 60%, #13131E 100%)",
          border: "1px solid rgba(0,212,133,0.18)",
          boxShadow: "0 0 40px rgba(0,212,133,0.08), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        {/* Background glow blobs */}
        <div
          className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(0,212,133,0.08) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-32 h-32 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(124,92,246,0.08) 0%, transparent 70%)" }}
        />

        <div className="relative shrink-0">
          <CLCLogo size={88} showText={false} />
        </div>

        <div className="relative text-center md:text-left">
          <p className="text-white/50 text-xs font-semibold tracking-[0.2em] uppercase mb-1">
            Welcome back
          </p>
          <h2 className="text-white text-2xl font-bold mb-1">{user.name}</h2>
          <p
            className="text-sm font-semibold"
            style={{ color: "#00D485" }}
          >
            Stream · Edit · Create · Share
          </p>

          <div className="flex items-center gap-2 mt-3 justify-center md:justify-start flex-wrap">
            <span
              className="text-xs font-bold px-3 py-1 rounded-full capitalize"
              style={{
                background: user.tier === "pro"
                  ? "rgba(124,92,246,0.2)"
                  : user.tier === "basic"
                  ? "rgba(0,212,133,0.15)"
                  : "rgba(107,114,128,0.2)",
                color: user.tier === "pro" ? "#7C5CF6" : user.tier === "basic" ? "#00D485" : "#9CA3AF",
                border: `1px solid ${user.tier === "pro" ? "#7C5CF6" : user.tier === "basic" ? "#00D485" : "#6B7280"}30`,
              }}
            >
              {user.tier} Plan
            </span>
            {remaining !== null ? (
              <span className="text-white/40 text-xs">
                {Math.floor(remaining / 60)}:{String(remaining % 60).padStart(2, "0")} recording left today
              </span>
            ) : (
              <span className="text-xs font-semibold" style={{ color: "#00D485" }}>
                <Infinity size={12} className="inline mr-1" />Unlimited recording
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── Usage bar ── */}
      {max !== Infinity && (
        <div style={CARD} className="p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-white/80 font-semibold text-sm">Recording Time Today</p>
            <button
              onClick={() => navigate("/account")}
              className="text-xs font-bold px-3 py-1 rounded-full transition-all hover:opacity-80"
              style={{ background: "rgba(0,212,133,0.15)", color: "#00D485", border: "1px solid rgba(0,212,133,0.2)" }}
            >
              Upgrade →
            </button>
          </div>
          <div
            className="h-2 rounded-full overflow-hidden mb-2"
            style={{ background: "rgba(255,255,255,0.07)" }}
          >
            <div
              className="h-2 rounded-full transition-all"
              style={{
                width: `${progress * 100}%`,
                background: progress > 0.8
                  ? "linear-gradient(90deg, #EF4444, #F59E0B)"
                  : "linear-gradient(90deg, #00D485, #00A86B)",
              }}
            />
          </div>
          <p className="text-white/35 text-xs">
            {Math.floor(used / 60)}:{String(used % 60).padStart(2, "0")} used of{" "}
            {Math.floor(max / 60)} min
          </p>
        </div>
      )}

      {/* ── Quick Actions ── */}
      <div>
        <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-3">Quick Actions</p>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {ACTIONS.map((a) => (
            <button
              key={a.label}
              onClick={() => navigate(a.route)}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl transition-all hover:-translate-y-0.5 hover:shadow-lg"
              style={{
                background: "#13131E",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.border = `1px solid ${a.color}40`;
                (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px ${a.glow}`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.border = "1px solid rgba(255,255,255,0.07)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: a.color + "18" }}
              >
                <a.icon size={20} style={{ color: a.color }} />
              </div>
              <span className="text-white/70 text-xs font-semibold text-center leading-tight">{a.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── AI Banner ── */}
      <div
        className="rounded-2xl p-5 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1C1427 0%, #241838 100%)",
          border: "1px solid rgba(124,92,246,0.25)",
          boxShadow: "0 0 30px rgba(124,92,246,0.08)",
        }}
      >
        <div
          className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(124,92,246,0.12) 0%, transparent 70%)" }}
        />
        <div className="relative flex items-start gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
            style={{ background: "rgba(124,92,246,0.2)" }}
          >
            <Sparkles size={20} style={{ color: "#7C5CF6" }} />
          </div>
          <div className="flex-1">
            <h3 className="text-white font-bold text-base mb-1">AI-Powered Studio</h3>
            <p className="text-white/50 text-sm mb-3">
              Enhance audio, perfect video, generate music with your voice, and get smart editing suggestions.
            </p>
            {!limit.aiFeatures ? (
              <button
                onClick={() => navigate("/account")}
                className="font-bold px-4 py-2 rounded-xl text-sm transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #7C5CF6, #9D6FF7)", color: "white" }}
              >
                Unlock AI — $4.99/mo
              </button>
            ) : (
              <div className="flex items-center gap-2 text-sm" style={{ color: "#7C5CF6" }}>
                <Sparkles size={14} /><span className="font-semibold">AI features active on your plan</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Recent Projects ── */}
      <div>
        <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-3">Recent Projects</p>
        {projects.length === 0 ? (
          <div
            className="p-8 text-center rounded-2xl"
            style={CARD}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3"
              style={{ background: "rgba(255,255,255,0.04)" }}
            >
              <Film size={28} className="text-white/20" />
            </div>
            <p className="text-white/40 mb-4 text-sm">No projects yet — start recording or editing!</p>
            <button
              onClick={() => navigate("/studio")}
              className="font-bold px-5 py-2.5 rounded-xl text-sm transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #00D485, #00A86B)", color: "white" }}
            >
              Start Creating
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {projects.slice(0, 3).map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-3 p-4 rounded-xl"
                style={CARD}
              >
                <div
                  className="w-12 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: "rgba(0,212,133,0.1)" }}
                >
                  <Film size={18} style={{ color: "#00D485" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm">{p.name}</p>
                  <p className="text-white/35 text-xs">
                    {p.clipCount} clips · {Math.floor(p.duration / 60)}:{String(p.duration % 60).padStart(2, "0")}
                  </p>
                </div>
                <button
                  onClick={() => navigate("/editor")}
                  className="text-xs font-bold px-3 py-1.5 rounded-lg transition-all hover:opacity-80"
                  style={{ background: "rgba(0,212,133,0.12)", color: "#00D485" }}
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Scheduled Posts ── */}
      <div className="pb-4">
        <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-3">Scheduled Posts</p>
        {scheduledPosts.length === 0 ? (
          <div
            className="flex items-center gap-4 p-4 rounded-2xl"
            style={CARD}
          >
            <Calendar size={24} className="text-white/20 shrink-0" />
            <p className="text-white/35 text-sm">
              No posts scheduled — connect your social accounts to get started.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {scheduledPosts.slice(0, 3).map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-3 p-3 rounded-xl"
                style={CARD}
              >
                <Calendar size={18} style={{ color: "#0EA5E9" }} className="shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-white/80 text-sm font-semibold truncate">{p.caption || "No caption"}</p>
                  <p className="text-white/30 text-xs">{p.platforms.join(", ")} · {p.scheduledAt}</p>
                </div>
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full shrink-0"
                  style={
                    p.status === "pending"
                      ? { background: "rgba(245,158,11,0.15)", color: "#F59E0B" }
                      : { background: "rgba(0,212,133,0.15)", color: "#00D485" }
                  }
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
