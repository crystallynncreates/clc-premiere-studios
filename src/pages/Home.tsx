import { useNavigate } from "react-router-dom";
import { Radio, Scissors, Music, Share2, Palette, Sparkles, Film, Calendar, Infinity } from "lucide-react";
import { useStore } from "../store/useStore";
import { TIER_LIMITS } from "../types";
import CLCLogo from "../components/Logo";

const ACTIONS = [
  { icon: Radio,    label: "Go Live",        route: "/studio",  color: "#EF4444" },
  { icon: Film,     label: "Record",         route: "/studio",  color: "#00A86B" },
  { icon: Scissors, label: "Edit Video",     route: "/editor",  color: "#8B5CF6" },
  { icon: Music,    label: "AI Music",       route: "/music",   color: "#F59E0B" },
  { icon: Share2,   label: "Schedule Post",  route: "/social",  color: "#0EA5E9" },
  { icon: Palette,  label: "Cartoon Skins",  route: "/skins",   color: "#EC4899" },
];

export default function HomePage() {
  const navigate = useNavigate();
  const { user, projects, scheduledPosts } = useStore();
  const limit = TIER_LIMITS[user.tier];
  const used = user.recordingSecondsUsedToday;
  const max = limit.dailyRecordingSeconds;
  const progress = max === Infinity ? 0 : Math.min(1, used / max);
  const remaining = max === Infinity ? null : Math.max(0, max - used);

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      {/* Hero */}
      <div className="bg-jade-600 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-4 mb-6 shadow-lg">
        <CLCLogo size={90} showText={true} />
        <div className="text-center md:text-left">
          <h2 className="text-white text-2xl font-bold">Welcome back, Crystal!</h2>
          <p className="text-jade-100 mt-1">Stream · Edit · Create · Share</p>
        </div>
      </div>

      {/* Usage card */}
      <div className="bg-white rounded-2xl shadow p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-800">Today's Recording Time</h3>
          <span className="bg-jade-100 text-jade-700 text-xs font-semibold px-3 py-1 rounded-full capitalize">{user.tier} Plan</span>
        </div>
        {max === Infinity ? (
          <div className="flex items-center gap-2 text-jade-600 font-semibold">
            <Infinity size={20} /><span>Unlimited recording time</span>
          </div>
        ) : (
          <>
            <div className="bg-gray-100 rounded-full h-3 overflow-hidden mb-1">
              <div className="bg-jade-500 h-3 rounded-full transition-all" style={{ width: `${progress * 100}%` }} />
            </div>
            <p className="text-gray-400 text-sm">
              {Math.floor(used / 60)}:{String(used % 60).padStart(2,"0")} used of {Math.floor(max / 60)} min
            </p>
          </>
        )}
        {user.tier === "free" && (
          <button onClick={() => navigate("/account")}
            className="mt-3 bg-jade-500 hover:bg-jade-600 text-white font-bold px-4 py-2 rounded-xl text-sm transition-colors">
            Upgrade for More Time →
          </button>
        )}
      </div>

      {/* Quick Actions */}
      <h3 className="font-bold text-gray-800 text-lg mb-3">Quick Actions</h3>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-6">
        {ACTIONS.map((a) => (
          <button key={a.label} onClick={() => navigate(a.route)}
            className="bg-white rounded-2xl shadow p-4 flex flex-col items-center gap-2 hover:shadow-md transition-all hover:-translate-y-0.5">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: a.color + "20" }}>
              <a.icon size={22} style={{ color: a.color }} />
            </div>
            <span className="text-gray-700 text-xs font-semibold text-center leading-tight">{a.label}</span>
          </button>
        ))}
      </div>

      {/* AI Banner */}
      <div className="bg-jade-700 rounded-2xl p-5 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={20} className="text-yellow-300" />
          <h3 className="text-white font-bold text-lg">AI-Powered Studio</h3>
        </div>
        <p className="text-jade-100 text-sm mb-3">Enhance audio, perfect video, generate music with your voice, and get smart editing suggestions.</p>
        {!limit.aiFeatures ? (
          <button onClick={() => navigate("/account")}
            className="bg-white text-jade-700 font-bold px-4 py-2 rounded-xl text-sm hover:bg-jade-50 transition-colors">
            Unlock AI — $4.99/mo
          </button>
        ) : (
          <div className="flex items-center gap-2 text-jade-200 text-sm">
            <Sparkles size={14} className="text-yellow-300" /><span>AI features active on your plan</span>
          </div>
        )}
      </div>

      {/* Recent Projects */}
      <h3 className="font-bold text-gray-800 text-lg mb-3">Recent Projects</h3>
      {projects.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 text-center shadow mb-6">
          <Film size={40} className="text-jade-200 mx-auto mb-2" />
          <p className="text-gray-400 mb-3">No projects yet. Start recording or editing!</p>
          <button onClick={() => navigate("/studio")} className="bg-jade-500 text-white font-bold px-5 py-2 rounded-xl hover:bg-jade-600 transition-colors">Start Creating</button>
        </div>
      ) : (
        <div className="space-y-2 mb-6">
          {projects.slice(0,3).map((p) => (
            <div key={p.id} className="bg-white rounded-xl shadow p-4 flex items-center gap-3">
              <div className="w-14 h-10 bg-jade-100 rounded-lg flex items-center justify-center">
                <Film size={20} className="text-jade-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{p.name}</p>
                <p className="text-gray-400 text-xs">{p.clipCount} clips • {Math.floor(p.duration/60)}:{String(p.duration%60).padStart(2,"0")}</p>
              </div>
              <button onClick={() => navigate("/editor")} className="text-jade-500 hover:text-jade-700 text-sm font-semibold">Edit</button>
            </div>
          ))}
        </div>
      )}

      {/* Scheduled Posts */}
      <h3 className="font-bold text-gray-800 text-lg mb-3">Scheduled Posts</h3>
      {scheduledPosts.length === 0 ? (
        <div className="bg-white rounded-2xl p-5 flex items-center gap-3 shadow mb-6">
          <Calendar size={28} className="text-jade-200" />
          <p className="text-gray-400">No scheduled posts yet. Connect your social accounts to get started.</p>
        </div>
      ) : (
        <div className="space-y-2 mb-6">
          {scheduledPosts.slice(0,3).map((p) => (
            <div key={p.id} className="bg-white rounded-xl shadow p-3 flex items-center gap-3">
              <Calendar size={20} className="text-jade-500" />
              <div className="flex-1">
                <p className="text-gray-700 text-sm font-semibold truncate">{p.caption || "No caption"}</p>
                <p className="text-gray-400 text-xs">{p.platforms.join(", ")} · {p.scheduledAt}</p>
              </div>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${p.status === "pending" ? "bg-yellow-100 text-yellow-600" : "bg-jade-100 text-jade-600"}`}>{p.status}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
