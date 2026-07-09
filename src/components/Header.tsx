import { Bell, Wifi } from "lucide-react";
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

  const tierConfig = {
    free:  { label: "Free",  color: "#6B7280", bg: "rgba(107,114,128,0.12)" },
    basic: { label: "Basic", color: "#00D485", bg: "rgba(0,212,133,0.12)"  },
    pro:   { label: "Pro",   color: "#7C5CF6", bg: "rgba(124,92,246,0.12)" },
  }[user.tier];

  return (
    <header
      className="shrink-0"
      style={{
        background: "linear-gradient(180deg, #13131E 0%, #0F0F1A 100%)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Thin jade accent bar */}
      <div style={{ height: 2, background: "linear-gradient(90deg, #00D485 0%, #7C5CF6 50%, #00D485 100%)" }} />

      <div className="flex items-center px-4 py-2 gap-4">
        {/* Logo */}
        <div className="shrink-0">
          <CLCLogo size={44} showText={false} />
        </div>

        {/* App title */}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-1.5">
            <span
              className="font-bold tracking-widest text-sm"
              style={{ color: "#00D485", letterSpacing: "0.2em", fontFamily: "Georgia, serif" }}
            >
              CLC
            </span>
            <span
              className="font-semibold text-sm tracking-wider text-white/70"
              style={{ letterSpacing: "0.07em", fontFamily: "Georgia, serif" }}
            >
              Premier Studios
            </span>
          </div>
          <div className="flex items-center gap-2 mt-0.5 flex-wrap">
            <span
              className="text-xs font-bold px-2 py-0.5 rounded-full"
              style={{ backgroundColor: tierConfig.bg, color: tierConfig.color, border: `1px solid ${tierConfig.color}30` }}
            >
              {tierConfig.label}
            </span>
            {remaining !== null ? (
              <span className="text-xs text-white/35">
                {Math.floor(remaining / 60)}:{String(remaining % 60).padStart(2, "0")} left
              </span>
            ) : (
              <span className="text-xs font-semibold" style={{ color: "#00D485" }}>∞ Unlimited</span>
            )}
          </div>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-3 shrink-0">
          {/* LIVE / REC indicator */}
          {(isRecording || isStreaming) && (
            <div
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
              style={{ background: "#ef4444", boxShadow: "0 0 12px rgba(239,68,68,0.5)" }}
            >
              {isStreaming ? (
                <Wifi size={11} className="text-white animate-pulse" />
              ) : (
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              )}
              <span className="text-white text-xs font-bold tracking-widest">
                {isStreaming ? "LIVE" : "REC"}
              </span>
            </div>
          )}

          {/* Notification bell */}
          <button className="relative text-white/40 hover:text-white/80 transition-colors">
            <Bell size={18} />
            <span
              className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full"
              style={{ backgroundColor: "#00D485" }}
            />
          </button>

          {/* User avatar */}
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
            style={{
              background: "linear-gradient(135deg, #00D485, #00A86B)",
              boxShadow: "0 1px 8px rgba(0,212,133,0.4)",
            }}
          >
            {user.name.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  );
}
