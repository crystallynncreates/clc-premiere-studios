import { Shield, Bell } from "lucide-react";
import { useStore } from "../store/useStore";
import { TIER_LIMITS } from "../types";
import CLCLogo from "./Logo";

export default function Header() {
  const { user, isRecording, isStreaming } = useStore();
  const limit = TIER_LIMITS[user.tier];
  const remaining = limit.dailyRecordingSeconds === Infinity
    ? null
    : Math.max(0, limit.dailyRecordingSeconds - user.recordingSecondsUsedToday);

  return (
    <header className="bg-jade-600 px-4 py-3 flex items-center gap-3 shadow-lg shrink-0">
      <CLCLogo size={44} />
      <div className="flex-1">
        <h1 className="text-white font-bold text-base leading-tight">CLC Premiere Studios</h1>
        <div className="flex items-center gap-3">
          <span className="text-jade-100 text-xs capitalize font-medium">{user.tier} plan</span>
          {remaining !== null && (
            <span className="text-jade-200 text-xs">
              • {Math.floor(remaining / 60)}:{String(remaining % 60).padStart(2,"0")} left today
            </span>
          )}
          {remaining === null && <span className="text-jade-200 text-xs">• Unlimited</span>}
        </div>
      </div>
      <div className="flex items-center gap-3">
        {(isRecording || isStreaming) && (
          <div className="flex items-center gap-1.5 bg-red-500 px-2.5 py-1 rounded-full animate-pulse">
            <div className="w-2 h-2 bg-white rounded-full" />
            <span className="text-white text-xs font-bold">{isStreaming ? "LIVE" : "REC"}</span>
          </div>
        )}
        <div className="flex items-center gap-1 text-jade-200 text-xs">
          <Shield size={12} />
          <span>Secure</span>
        </div>
        <button className="text-white hover:text-jade-200 transition-colors">
          <Bell size={20} />
        </button>
        <div className="w-8 h-8 bg-jade-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
          {user.name.charAt(0)}
        </div>
      </div>
    </header>
  );
}
