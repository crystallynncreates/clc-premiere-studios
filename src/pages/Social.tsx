import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Youtube, Instagram, Twitter, Camera, Shield, Calendar, Lock } from "lucide-react";
import { useStore } from "../store/useStore";
import { TIER_LIMITS } from "../types";

const PLATFORMS = [
  { id:"youtube",   label:"YouTube",      Icon:Youtube,   color:"#FF0000" },
  { id:"instagram", label:"Instagram",    Icon:Instagram, color:"#E1306C" },
  { id:"twitter",   label:"X (Twitter)", Icon:Twitter,  color:"#1D9BF0" },
  { id:"snapchat",  label:"Snapchat",     Icon:Camera,    color:"#FFCC00" },
];

const CARD = {
  background: "#13131E",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: "1rem",
};

export default function SocialPage() {
  const navigate = useNavigate();
  const { user, connectSocial, disconnectSocial, addScheduledPost, scheduledPosts } = useStore();
  const [tab, setTab]         = useState<"accounts"|"schedule">("accounts");
  const [caption, setCaption] = useState("");
  const [selPlat, setSelPlat] = useState<string[]>([]);
  const [date, setDate]       = useState("");
  const [time, setTime]       = useState("");
  const limit = TIER_LIMITS[user.tier];

  const handleConnect = (id: string, label: string) => {
    if (confirm(`Connect your ${label} account?\n\nThis lets CLC Premiere Studios post videos on your behalf. Disconnect anytime.`)) {
      connectSocial(id, "@crystallynncreates");
    }
  };

  const schedule = () => {
    if (limit.scheduledPosts === 0) { navigate("/account"); return; }
    if (!caption) { alert("Add a caption."); return; }
    if (!selPlat.length) { alert("Select at least one platform."); return; }
    if (!date || !time) { alert("Set a date and time."); return; }
    addScheduledPost({ id:`post-${Date.now()}`, videoUri:"", caption, platforms: selPlat, scheduledAt:`${date} at ${time}`, status:"pending" });
    alert("✅ Post scheduled!");
    setCaption(""); setSelPlat([]); setDate(""); setTime("");
  };

  return (
    <div className="flex flex-col h-full" style={{ background: "#0D0D14" }}>
      {/* Tab bar */}
      <div
        className="flex gap-2 p-4"
        style={{ background: "#13131E", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        {(["accounts","schedule"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="flex-1 py-2.5 rounded-xl font-bold text-sm transition-all"
            style={tab === t
              ? { background: "linear-gradient(135deg, #00D485, #00A86B)", color: "white" }
              : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.45)" }
            }
          >
            {t === "accounts" ? "Connected Accounts" : "Schedule Posts"}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {tab === "accounts" ? (
          <div className="space-y-3 max-w-lg mx-auto">
            <p className="text-white/40 text-sm">
              Connect accounts to post and schedule videos. We only request permission to post — never access DMs or passwords.
            </p>

            {PLATFORMS.map(({ id, label, Icon, color }) => {
              const acc = user.connectedAccounts.find((a) => a.platform === id);
              return (
                <div key={id} className="flex items-center gap-4 p-4 rounded-2xl" style={CARD}>
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: color + "18" }}
                  >
                    <Icon size={22} style={{ color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-bold text-sm">{label}</p>
                    <p className="text-xs mt-0.5" style={{ color: acc?.connected ? "#00D485" : "rgba(255,255,255,0.3)" }}>
                      {acc?.connected ? `${acc.username} · Connected` : "Not connected"}
                    </p>
                  </div>
                  <button
                    onClick={() => acc?.connected ? disconnectSocial(id) : handleConnect(id, label)}
                    className="px-4 py-2 rounded-xl font-semibold text-sm transition-all hover:opacity-80"
                    style={acc?.connected
                      ? { background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }
                      : { background: "rgba(0,212,133,0.12)", color: "#00D485", border: "1px solid rgba(0,212,133,0.25)" }
                    }
                  >
                    {acc?.connected ? "Disconnect" : "Connect"}
                  </button>
                </div>
              );
            })}

            <div className="p-4 rounded-2xl" style={CARD}>
              <div className="flex items-center gap-2 mb-3">
                <Shield size={15} style={{ color: "#00D485" }} />
                <p className="text-white font-bold text-sm">What We Access</p>
              </div>
              {[
                { text:"Post videos on your behalf", ok:true },
                { text:"Read your username only", ok:true },
                { text:"Schedule future posts", ok:true },
                { text:"We NEVER access DMs, followers, or passwords", ok:false },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2 mb-1.5">
                  <span className="text-sm mt-0.5 shrink-0" style={{ color: item.ok ? "#00D485" : "#EF4444" }}>
                    {item.ok ? "✓" : "✗"}
                  </span>
                  <span className="text-white/50 text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4 max-w-lg mx-auto">
            {limit.scheduledPosts === 0 && (
              <div
                onClick={() => navigate("/account")}
                className="flex items-center gap-3 p-4 rounded-2xl cursor-pointer transition-all hover:opacity-80"
                style={{
                  background: "rgba(124,92,246,0.1)",
                  border: "1px solid rgba(124,92,246,0.25)",
                  borderRadius: "1rem",
                }}
              >
                <Lock size={20} style={{ color: "#7C5CF6" }} />
                <div>
                  <p className="text-white font-bold text-sm">Upgrade to Schedule Posts</p>
                  <p className="text-white/40 text-xs">Basic $4.99: 1 post/mo · Pro $10: Unlimited</p>
                </div>
              </div>
            )}

            <div className="p-4 rounded-2xl space-y-2" style={CARD}>
              <p className="text-white/70 font-bold text-sm">Caption</p>
              <textarea
                className="w-full rounded-xl p-3 text-white text-sm resize-none outline-none"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", minHeight: 100 }}
                placeholder="Write your caption and hashtags..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                disabled={limit.scheduledPosts === 0}
              />
            </div>

            <div className="p-4 rounded-2xl" style={CARD}>
              <p className="text-white/70 font-bold text-sm mb-3">Post To</p>
              <div className="flex flex-wrap gap-2">
                {PLATFORMS.map(({ id, label, Icon, color }) => {
                  const acc = user.connectedAccounts.find((a) => a.platform === id);
                  const sel = selPlat.includes(id);
                  return (
                    <button
                      key={id}
                      onClick={() => {
                        if (!acc?.connected) { alert(`Connect ${label} first.`); return; }
                        if (limit.scheduledPosts === 0) { navigate("/account"); return; }
                        setSelPlat(sel ? selPlat.filter((p) => p !== id) : [...selPlat, id]);
                      }}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all"
                      style={{
                        background: sel ? color + "18" : "rgba(255,255,255,0.04)",
                        border: sel ? `1px solid ${color}40` : "1px solid rgba(255,255,255,0.07)",
                        color: sel ? color : "rgba(255,255,255,0.4)",
                        opacity: !acc?.connected ? 0.4 : 1,
                      }}
                    >
                      <Icon size={15} style={{ color }} />
                      {label}
                      {!acc?.connected && <Lock size={10} />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-4 rounded-2xl space-y-3" style={CARD}>
              <p className="text-white/70 font-bold text-sm">Schedule Date & Time</p>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                disabled={limit.scheduledPosts === 0}
                className="w-full rounded-xl p-3 text-white outline-none text-sm"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
              />
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                disabled={limit.scheduledPosts === 0}
                className="w-full rounded-xl p-3 text-white outline-none text-sm"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
              />
            </div>

            <button
              onClick={schedule}
              className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all hover:opacity-90"
              style={limit.scheduledPosts === 0
                ? { background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.25)" }
                : { background: "linear-gradient(135deg, #00D485, #00A86B)", color: "white" }
              }
            >
              <Calendar size={18} />
              {limit.scheduledPosts === 0 ? "Upgrade to Schedule" : "Schedule Post"}
            </button>

            {scheduledPosts.length > 0 && (
              <div className="space-y-2">
                <p className="text-white/70 font-bold text-sm">Scheduled Posts</p>
                {scheduledPosts.map((p) => (
                  <div key={p.id} className="flex items-center gap-3 p-3 rounded-xl" style={CARD}>
                    <Calendar size={16} style={{ color: "#0EA5E9" }} className="shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-white/80 text-sm font-semibold truncate">{p.caption || "No caption"}</p>
                      <p className="text-white/30 text-xs">{p.platforms.join(", ")} · {p.scheduledAt}</p>
                    </div>
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full shrink-0"
                      style={p.status === "pending"
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
        )}
      </div>
    </div>
  );
}
