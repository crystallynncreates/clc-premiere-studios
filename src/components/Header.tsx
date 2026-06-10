import { Shield, Bell, Wifi } from "lucide-react";
import { useStore } from "../store/useStore";
import { TIER_LIMITS } from "../types";
import CLCLogo from "./Logo";

export default function Header() {
  const { user, isRecording, isStreaming } = useStore();
  const limit = TIER_LIMITS[user.tier];
  const remaining =
    limit.dailyRecordingSeconds === Infinity
      ? null
      : Math.max(0, limit.dailyRecordingSeconds - user.recordingSecondsUsedToday);

  const planLabel = user.tier === "free" ? "Free" : user.tier === "basic" ? "Basic" : "Pro";
  const planColor =
    user.tier === "pro" ? "#00A86B" : user.tier === "basic" ? "#4CAF82" : "#94a3b8";

  return (
    <header
      className="shrink-0 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #ffffff 0%, #f5fdf8 50%, #eefaf4 100%)",
        borderBottom: "1.5px solid #c8e8d8",
        boxShadow: "0 2px 16px 0 rgba(0,168,107,0.08)",
      }}
    >
      {/* Subtle jade accent bar at very top */}
      <div style={{ height: 3, background: "linear-gradient(90deg, #00A86B, #4CAF82, #00A86B)" }} />

      <div className="flex items-center px-4 py-2 gap-4">

        {/* ── Logo ── */}
        <div className="shrink-0" style={{ filter: "drop-shadow(0 1px 4px rgba(0,0,0,0.08))" }}>
          <CLCLogo size={62} />
        </div>

        {/* ── App name + tagline ── */}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span
              className="font-bold tracking-widest text-sm md:text-base"
              style={{
                color: "#1a2e24",
                letterSpacing: "0.18em",
                fontFamily: "Georgia, serif",
                textTransform: "uppercase",
              }}
            >
              CLC
            </span>
            <span
              className="font-semibold text-sm md:text-base tracking-wider"
              style={{ color: "#2d5040", letterSpacing: "0.08em", fontFamily: "Georgia, serif" }}
            >
              Premiere Studios
            </span>
          </div>
          {/* Thin jade divider line */}
          <div
            style={{
              height: 1,
              width: 120,
              background: "linear-gradient(90deg, #00A86B 0%, transparent 100%)",
              margin: "2px 0 3px",
              borderRadius: 2,
            }}
          />
          <div className="flex items-center gap-2 flex-wrap">
            {/* Plan badge */}
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: planColor + "18",
                color: planColor,
                border: `1px solid ${planColor}40`,
                letterSpacing: "0.05em",
              }}
            >
              {planLabel} Plan
            </span>
            {/* Time remaining */}
            {remaining !== null && (
              <span className="text-xs" style={{ color: "#64748b" }}>
                {Math.floor(remaining / 60)}:{String(remaining % 60).padStart(2, "0")} left today
              </span>
            )}
            {remaining === null && (
              <span className="text-xs font-medium" style={{ color: "#00A86B" }}>
                ∞ Unlimited
              </span>
            )}
          </div>
        </div>

        {/* ── Right side controls ── */}
        <div className="flex items-center gap-3 shrink-0">
          {/* LIVE / REC indicator */}
          {(isRecording || isStreaming) && (
            <div
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full animate-pulse"
              style={{ background: "#ef4444", boxShadow: "0 0 8px rgba(239,68,68,0.5)" }}
            >
              {isStreaming ? (
                <Wifi size={11} className="text-white" />
              ) : (
                <div className="w-2 h-2 bg-white rounded-full" />
              )}
              <span className="text-white text-xs font-bold tracking-wider">
                {isStreaming ? "LIVE" : "REC"}
              </span>
            </div>
          )}

          {/* Secure badge */}
          <div
            className="hidden sm:flex items-center gap-1 text-xs font-medium rounded-full px-2 py-0.5"
            style={{
              color: "#00A86B",
              backgroundColor: "#00A86B12",
              border: "1px solid #00A86B30",
            }}
          >
            <Shield size={11} />
            <span>Secure</span>
          </div>

          {/* Notification bell */}
          <button
            className="relative transition-colors"
            style={{ color: "#4a7060" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#00A86B")}
            onMouseLeave={e => (e.currentTarget.style.color = "#4a7060")}
          >
            <Bell size={19} />
          </button>

          {/* User avatar */}
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
            style={{
              background: "linear-gradient(135deg, #00A86B, #4CAF82)",
              boxShadow: "0 1px 6px rgba(0,168,107,0.35)",
              letterSpacing: "0.02em",
            }}
          >
            {user.name.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  );
}
