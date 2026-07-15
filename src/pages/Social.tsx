import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Youtube, Instagram, Twitter, Camera, Shield, Calendar, Lock, AlertCircle, Clock, CheckCircle2, Zap } from "lucide-react";
import { useStore } from "../store/useStore";
import { TIER_LIMITS } from "../types";

const PLATFORMS = [
  { id:"youtube",   label:"YouTube",      Icon:Youtube,   color:"#FF0000", glow:"rgba(255,0,0,0.15)"   },
  { id:"instagram", label:"Instagram",    Icon:Instagram, color:"#E1306C", glow:"rgba(225,48,108,0.15)" },
  { id:"twitter",   label:"X (Twitter)", Icon:Twitter,   color:"#1D9BF0", glow:"rgba(29,155,240,0.15)" },
  { id:"snapchat",  label:"Snapchat",     Icon:Camera,    color:"#FFCC00", glow:"rgba(255,204,0,0.15)"  },
];

export default function SocialPage() {
  const navigate = useNavigate();
  const { user, connectSocial, disconnectSocial, addScheduledPost, scheduledPosts } = useStore();
  const [tab, setTab]         = useState<"accounts"|"schedule">("accounts");
  const [caption, setCaption] = useState("");
  const [selPlat, setSelPlat] = useState<string[]>([]);
  const [platSchedules, setPlatSchedules] = useState<Record<string, { date: string; time: string }>>({});
  const limit = TIER_LIMITS[user.tier];

  const connectedPlatforms = user.connectedAccounts.filter((a) => a.connected);
  const hasAnyConnection   = connectedPlatforms.length > 0;

  const handleConnect = (id: string, label: string) => {
    if (confirm(`Connect your ${label} account?\n\nThis lets CLC Premier Studios post videos on your behalf. Disconnect anytime.`)) {
      connectSocial(id, "@crystallynncreates");
    }
  };

  const updatePlatSchedule = (platId: string, field: "date" | "time", value: string) => {
    setPlatSchedules((prev) => ({ ...prev, [platId]: { ...prev[platId], [field]: value } }));
  };

  const schedule = () => {
    if (limit.scheduledPosts === 0) { navigate("/account"); return; }
    if (!hasAnyConnection) { alert("Please connect at least one social media account first."); setTab("accounts"); return; }
    if (!caption) { alert("Add a caption."); return; }
    if (!selPlat.length) { alert("Select at least one platform."); return; }
    const missing = selPlat.filter((p) => !platSchedules[p]?.date || !platSchedules[p]?.time);
    if (missing.length) {
      const names = missing.map((id) => PLATFORMS.find((p) => p.id === id)?.label).join(", ");
      alert(`Please set a date and time for: ${names}`);
      return;
    }
    selPlat.forEach((platId) => {
      const { date, time } = platSchedules[platId];
      addScheduledPost({ id: `post-${Date.now()}-${platId}`, videoUri: "", caption, platforms: [platId], scheduledAt: `${date} at ${time}`, status: "pending" });
    });
    alert(`✅ ${selPlat.length} post${selPlat.length > 1 ? "s" : ""} scheduled!`);
    setCaption(""); setSelPlat([]); setPlatSchedules({});
  };

  return (
    <div className="flex flex-col h-full" style={{ background: "transparent" }}>

      {/* Tab bar */}
      <div
        className="shrink-0 p-4"
        style={{ background: "rgba(8,8,18,0.9)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="flex rounded-2xl p-1 gap-1" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
          {(["accounts","schedule"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="flex-1 py-2.5 rounded-xl font-bold text-sm transition-all"
              style={tab === t
                ? { background: "linear-gradient(135deg, #00D485, #00A86B)", color: "white", boxShadow: "0 0 16px rgba(0,212,133,0.3)" }
                : { color: "rgba(255,255,255,0.4)" }
              }
            >
              {t === "accounts" ? "Connected Accounts" : "Schedule Posts"}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">

        {/* ── ACCOUNTS TAB ── */}
        {tab === "accounts" ? (
          <div className="space-y-3 max-w-lg mx-auto">

            {!hasAnyConnection && (
              <div
                className="fade-up flex items-start gap-3 p-4 rounded-2xl"
                style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.25)" }}
              >
                <AlertCircle size={20} style={{ color: "#F59E0B", flexShrink: 0, marginTop: 1 }} />
                <div>
                  <p className="text-white font-bold text-sm">Connection Required</p>
                  <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>
                    CLC Premier Studios is built for vloggers. Connect at least one social account to post and schedule content.
                  </p>
                </div>
              </div>
            )}

            {hasAnyConnection && (
              <div className="flex items-center gap-2 p-3 rounded-xl" style={{ background: "rgba(0,212,133,0.06)", border: "1px solid rgba(0,212,133,0.15)" }}>
                <CheckCircle2 size={16} style={{ color: "#00D485" }} />
                <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.7)" }}>
                  {connectedPlatforms.length} account{connectedPlatforms.length > 1 ? "s" : ""} connected
                </p>
              </div>
            )}

            <p className="text-xs px-1" style={{ color: "rgba(255,255,255,0.3)" }}>
              We only request posting permission — never access DMs or passwords.
            </p>

            {PLATFORMS.map(({ id, label, Icon, color, glow }) => {
              const acc = user.connectedAccounts.find((a) => a.platform === id);
              return (
                <div
                  key={id}
                  className="card-lift flex items-center gap-4 p-4 rounded-2xl transition-all"
                  style={{
                    background: acc?.connected ? `${color}08` : "rgba(15,15,30,0.8)",
                    border: `1px solid ${acc?.connected ? color + "30" : "rgba(255,255,255,0.06)"}`,
                    boxShadow: acc?.connected ? `0 0 20px ${glow}` : "none",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                    style={{ background: color + "18", border: `1px solid ${color}25` }}
                  >
                    <Icon size={24} style={{ color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-bold text-sm">{label}</p>
                    <p className="text-xs mt-0.5" style={{ color: acc?.connected ? "#00D485" : "rgba(255,255,255,0.3)" }}>
                      {acc?.connected ? `${acc.username} · Connected` : "Not connected"}
                    </p>
                  </div>
                  <button
                    onClick={() => acc?.connected ? disconnectSocial(id) : handleConnect(id, label)}
                    className="px-4 py-2 rounded-xl font-bold text-sm transition-all hover:opacity-80"
                    style={acc?.connected
                      ? { background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.1)" }
                      : { background: color + "18", color, border: `1px solid ${color}35` }
                    }
                  >
                    {acc?.connected ? "Disconnect" : "Connect"}
                  </button>
                </div>
              );
            })}

            <div className="p-4 rounded-2xl" style={{ background: "rgba(15,15,30,0.7)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="flex items-center gap-2 mb-3">
                <Shield size={15} style={{ color: "#00D485" }} />
                <p className="text-white font-bold text-sm">What We Access</p>
              </div>
              {[
                { text: "Post videos on your behalf", ok: true },
                { text: "Read your username only",    ok: true },
                { text: "Schedule future posts",      ok: true },
                { text: "We NEVER access DMs, followers, or passwords", ok: false },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2 mb-1.5">
                  <span className="text-sm mt-0.5 shrink-0 font-bold" style={{ color: item.ok ? "#00D485" : "#EF4444" }}>
                    {item.ok ? "✓" : "✗"}
                  </span>
                  <span className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

        ) : (
          /* ── SCHEDULE TAB ── */
          <div className="space-y-4 max-w-lg mx-auto">

            {!hasAnyConnection && (
              <div
                onClick={() => setTab("accounts")}
                className="flex items-center gap-3 p-4 rounded-2xl cursor-pointer transition-all hover:opacity-80"
                style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.25)" }}
              >
                <AlertCircle size={20} style={{ color: "#F59E0B" }} />
                <div>
                  <p className="text-white font-bold text-sm">Connect an account first</p>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>Tap to go to Connected Accounts →</p>
                </div>
              </div>
            )}

            {limit.scheduledPosts === 0 && (
              <div
                onClick={() => navigate("/account")}
                className="flex items-center gap-3 p-4 rounded-2xl cursor-pointer transition-all hover:opacity-80"
                style={{ background: "rgba(124,92,246,0.08)", border: "1px solid rgba(124,92,246,0.25)" }}
              >
                <Lock size={20} style={{ color: "#7C5CF6" }} />
                <div>
                  <p className="text-white font-bold text-sm">Upgrade to Schedule Posts</p>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>Basic $4.99: 5/mo · Pro $9.99: Unlimited</p>
                </div>
                <Zap size={16} style={{ color: "#7C5CF6", marginLeft: "auto", flexShrink: 0 }} />
              </div>
            )}

            {/* Caption */}
            <div className="p-4 rounded-2xl space-y-2" style={{ background: "rgba(15,15,30,0.8)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(12px)" }}>
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.4)" }}>Caption</p>
              <textarea
                className="w-full rounded-xl p-3 text-white text-sm resize-none outline-none"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", minHeight: 90, colorScheme: "dark" }}
                placeholder="Write your caption and hashtags..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                disabled={limit.scheduledPosts === 0 || !hasAnyConnection}
                onFocus={(e) => { e.target.style.borderColor = "rgba(0,212,133,0.3)"; }}
                onBlur={(e)  => { e.target.style.borderColor = "rgba(255,255,255,0.07)"; }}
              />
            </div>

            {/* Platform selector */}
            <div className="p-4 rounded-2xl" style={{ background: "rgba(15,15,30,0.8)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(12px)" }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.4)" }}>Post To</p>
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
                        const next = sel ? selPlat.filter((p) => p !== id) : [...selPlat, id];
                        setSelPlat(next);
                        if (sel) setPlatSchedules((prev) => { const n = {...prev}; delete n[id]; return n; });
                      }}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all"
                      style={{
                        background: sel ? color + "18" : "rgba(255,255,255,0.04)",
                        border: sel ? `1px solid ${color}40` : "1px solid rgba(255,255,255,0.07)",
                        color: sel ? color : "rgba(255,255,255,0.4)",
                        opacity: !acc?.connected ? 0.4 : 1,
                        boxShadow: sel ? `0 0 12px ${color}25` : "none",
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

            {/* Per-platform date/time */}
            {selPlat.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Clock size={14} style={{ color: "#00D485" }} />
                  <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.4)" }}>
                    Set Time Per Platform
                  </p>
                </div>
                {selPlat.map((platId) => {
                  const plat = PLATFORMS.find((p) => p.id === platId);
                  if (!plat) return null;
                  const sched = platSchedules[platId] ?? { date: "", time: "" };
                  return (
                    <div
                      key={platId}
                      className="p-4 rounded-2xl space-y-2"
                      style={{ background: "rgba(15,15,30,0.8)", border: `1px solid ${plat.color}25`, backdropFilter: "blur(12px)", boxShadow: `0 0 16px ${plat.glow}` }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <plat.Icon size={16} style={{ color: plat.color }} />
                        <p className="text-white font-bold text-sm">{plat.label}</p>
                      </div>
                      <input type="date" value={sched.date} onChange={(e) => updatePlatSchedule(platId, "date", e.target.value)}
                        disabled={limit.scheduledPosts === 0}
                        className="w-full rounded-xl p-3 text-white outline-none text-sm"
                        style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${plat.color}20`, colorScheme: "dark" }}
                      />
                      <input type="time" value={sched.time} onChange={(e) => updatePlatSchedule(platId, "time", e.target.value)}
                        disabled={limit.scheduledPosts === 0}
                        className="w-full rounded-xl p-3 text-white outline-none text-sm"
                        style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${plat.color}20`, colorScheme: "dark" }}
                      />
                    </div>
                  );
                })}
              </div>
            )}

            {/* Schedule button */}
            <button
              onClick={schedule}
              className="w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all hover:opacity-90"
              style={limit.scheduledPosts === 0 || !hasAnyConnection
                ? { background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.25)" }
                : { background: "linear-gradient(135deg, #00D485, #00A86B)", color: "white", boxShadow: "0 0 24px rgba(0,212,133,0.35)" }
              }
            >
              <Calendar size={18} />
              {!hasAnyConnection ? "Connect an Account First" : limit.scheduledPosts === 0 ? "Upgrade to Schedule" : "Schedule Posts"}
            </button>

            {scheduledPosts.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.35)" }}>Scheduled Posts</p>
                {scheduledPosts.map((p) => {
                  const plat = PLATFORMS.find((x) => x.id === p.platforms[0]);
                  return (
                    <div key={p.id} className="flex items-center gap-3 p-3.5 rounded-xl" style={{ background: "rgba(15,15,30,0.7)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      {plat ? <plat.Icon size={16} style={{ color: plat.color, flexShrink: 0 }} /> : <Calendar size={16} style={{ color: "#0EA5E9" }} className="shrink-0" />}
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-semibold truncate">{p.caption || "No caption"}</p>
                        <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>{p.platforms.join(", ")} · {p.scheduledAt}</p>
                      </div>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full shrink-0"
                        style={p.status === "pending" ? { background: "rgba(245,158,11,0.12)", color: "#F59E0B" } : { background: "rgba(0,212,133,0.12)", color: "#00D485" }}>
                        {p.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
