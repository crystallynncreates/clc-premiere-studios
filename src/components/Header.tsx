import { Bell, Zap, Wifi } from "lucide-react";
import { useStore } from "../store/useStore";
import { TIER_LIMITS } from "../types";
import CLCLogo from "./Logo";

const TIER_CONFIG = {
  free:  { label: "Free",  color: "#9CA3AF", bg: "rgba(156,163,175,0.1)", glow: "none" },
  basic: { label: "Basic", color: "#00D485", bg: "rgba(0,212,133,0.1)",   glow: "0 0 12px rgba(0,212,133,0.3)" },
  pro:   { label: "Pro",   color: "#7C5CF6", bg: "rgba(124,92,246,0.1)",  glow: "0 0 12px rgba(124,92,246,0.3)" },
};

export default function Header() {
  const { user, isRecording, isStreaming } = useStore();
  const limit     = TIER_LIMITS[user.tier];
  const tc        = TIER_CONFIG[user.tier];
  const remaining =
    limit.dailyRecordingSeconds === Infinity
      ? null
      : Math.max(0, limit.dailyRecordingSeconds - user.recordingSecondsUsedToday);

  return (
    <header
      className="shrink-0 relative"
      style={{
        background: "rgba(8,8,18,0.92)",
        backdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Animated gradient top bar */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{
          background: "linear-gradient(90deg, #00D485, #7C5CF6, #FF6B9D, #00D485)",
          backgroundSize: "200% auto",
          animation: "shimmer 4s linear infinite",
        }}
      />

      <div className="flex items-center px-4 py-2.5 gap-3">
        {/* Logo */}
        <div className="shrink-0">
          <CLCLogo size={42} showText={false} />
        </div>

        {/* Title */}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-1.5">
            <span
              className="font-bold text-sm tracking-widest"
              style={{
                fontFamily: "Georgia, serif",
                background: "linear-gradient(135deg, #00D485, #4ade8e)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "0.2em",
              }}
            >
              CLC
            </span>
            <span
              className="font-semibold text-sm"
              style={{
                fontFamily: "Georgia, serif",
                color: "rgba(255,255,255,0.75)",
                letterSpacing: "0.06em",
              }}
            >
              Premier Studios
            </span>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span
              className="text-xs font-bold px-2.5 py-0.5 rounded-full capitalize"
              style={{ background: tc.bg, color: tc.color, boxShadow: tc.glow, border: `1px solid ${tc.color}25` }}
            >
              {tc.label}
            </span>
            {remaining !== null ? (
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                {Math.floor(remaining / 60)}:{String(remaining % 60).padStart(2, "0")} left
              </span>
            ) : (
              <span className="text-xs font-semibold flex items-center gap-0.5" style={{ color: "#00D485" }}>
                <Zap size={10} fill="#00D485" /> Unlimited
              </span>
            )}
          </div>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* LIVE / REC badge */}
          {(isRecording || isStreaming) && (
            <div className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full"
              style={{ background: "#EF4444", boxShadow: "0 0 16px rgba(239,68,68,0.6)" }}>
              <div className="live-ring absolute inset-0 rounded-full" />
              {isStreaming
                ? <Wifi size={11} className="text-white animate-pulse relative z-10" />
                : <div className="w-2 h-2 bg-white rounded-full relative z-10" />}
              <span className="text-white text-xs font-bold tracking-widest relative z-10">
                {isStreaming ? "LIVE" : "REC"}
              </span>
            </div>
          )}

          {/* Notification */}
          <button className="relative p-1.5 rounded-xl transition-all hover:bg-white/05">
            <Bell size={17} style={{ color: "rgba(255,255,255,0.4)" }} />
            <span
              className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full"
              style={{ background: "#00D485", boxShadow: "0 0 6px #00D485" }}
            />
          </button>

          {/* Avatar */}
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
            style={{
              background: "linear-gradient(135deg, #00D485 0%, #7C5CF6 100%)",
              boxShadow: "0 0 14px rgba(0,212,133,0.4)",
            }}
          >
            {user.name.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  );
}
