import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Youtube, Instagram, Twitter, Camera, Shield, Calendar, Lock } from "lucide-react";
import { useStore } from "../store/useStore";
import { TIER_LIMITS } from "../types";

const PLATFORMS = [
  { id:"youtube",   label:"YouTube",   Icon:Youtube,   color:"#FF0000" },
  { id:"instagram", label:"Instagram", Icon:Instagram, color:"#E1306C" },
  { id:"twitter",   label:"X (Twitter)", Icon:Twitter, color:"#000000" },
  { id:"snapchat",  label:"Snapchat",  Icon:Camera,    color:"#FFCC00" },
];

export default function SocialPage() {
  const navigate = useNavigate();
  const { user, connectSocial, disconnectSocial, addScheduledPost, scheduledPosts } = useStore();
  const [tab, setTab] = useState<"accounts"|"schedule">("accounts");
  const [caption, setCaption] = useState("");
  const [selPlat, setSelPlat] = useState<string[]>([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const limit = TIER_LIMITS[user.tier];

  const handleConnect = (id: string, label: string) => {
    if (confirm(`Connect your ${label} account?\n\nThis will let CLC Premiere Studios post videos on your behalf. You can disconnect anytime.`)) {
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
    <div className="flex flex-col h-full bg-jade-50">
      <div className="flex p-4 gap-1 bg-white border-b border-jade-100">
        {(["accounts","schedule"] as const).map((t)=>(
          <button key={t} onClick={()=>setTab(t)}
            className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-colors ${tab===t?"bg-jade-500 text-white":"bg-jade-50 text-gray-500 hover:text-jade-700"}`}>
            {t==="accounts"?"Connected Accounts":"Schedule Posts"}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {tab==="accounts" ? (
          <div className="space-y-3 max-w-lg mx-auto">
            <p className="text-gray-500 text-sm">Connect accounts to post and schedule videos. We only request permission to post — never access DMs or passwords.</p>
            {PLATFORMS.map(({id,label,Icon,color})=>{
              const acc = user.connectedAccounts.find((a)=>a.platform===id);
              return (
                <div key={id} className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{backgroundColor:color+"25"}}>
                    <Icon size={24} style={{color}}/>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-800">{label}</p>
                    <p className={`text-xs ${acc?.connected?"text-jade-500":"text-gray-400"}`}>{acc?.connected?`${acc.username} · Connected`:"Not connected"}</p>
                  </div>
                  <button onClick={()=>acc?.connected?disconnectSocial(id):handleConnect(id,label)}
                    className={`px-4 py-2 rounded-xl font-semibold text-sm transition-colors ${acc?.connected?"bg-gray-100 text-gray-500 hover:bg-gray-200":"border border-jade-500 text-jade-600 hover:bg-jade-50"}`}>
                    {acc?.connected?"Disconnect":"Connect"}
                  </button>
                </div>
              );
            })}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2"><Shield size={16} className="text-jade-500"/><p className="font-bold text-gray-800">What We Access</p></div>
              {["Post videos on your behalf","Read your username only","Schedule future posts","We NEVER access DMs, followers, or passwords"].map((item,i)=>(
                <div key={i} className="flex items-start gap-2 mb-1">
                  <span className={`text-sm mt-0.5 ${i===3?"text-red-500":"text-jade-500"}`}>{i===3?"✗":"✓"}</span>
                  <span className="text-gray-500 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4 max-w-lg mx-auto">
            {limit.scheduledPosts===0&&(
              <div onClick={()=>navigate("/account")} className="bg-jade-50 border border-jade-300 rounded-2xl p-4 flex items-center gap-3 cursor-pointer hover:bg-jade-100 transition-colors">
                <Lock size={20} className="text-jade-600"/><div>
                  <p className="text-jade-700 font-bold">Upgrade to Schedule Posts</p>
                  <p className="text-jade-600 text-xs">Basic $4.99: 1 post/mo · Pro $10: Unlimited</p>
                </div>
              </div>
            )}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <p className="font-bold text-gray-800 mb-2">Caption</p>
              <textarea className="w-full border border-gray-200 rounded-xl p-3 text-gray-800 text-sm resize-none focus:border-jade-500 outline-none"
                rows={4} placeholder="Write your caption and hashtags..." value={caption} onChange={(e)=>setCaption(e.target.value)} disabled={limit.scheduledPosts===0}/>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <p className="font-bold text-gray-800 mb-3">Post To</p>
              <div className="flex flex-wrap gap-2">
                {PLATFORMS.map(({id,label,Icon,color})=>{
                  const acc = user.connectedAccounts.find((a)=>a.platform===id);
                  const sel = selPlat.includes(id);
                  return (
                    <button key={id} onClick={()=>{
                      if(!acc?.connected){alert(`Connect ${label} first.`);return;}
                      if(limit.scheduledPosts===0){navigate("/account");return;}
                      setSelPlat(sel?selPlat.filter((p)=>p!==id):[...selPlat,id]);
                    }} className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-semibold transition-colors ${sel?"border-jade-500 bg-jade-50 text-jade-700":"border-gray-200 text-gray-500"} ${!acc?.connected?"opacity-40":""}`}>
                      <Icon size={16} style={{color}}/>{label}
                      {!acc?.connected&&<Lock size={10}/>}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
              <p className="font-bold text-gray-800">Schedule Date & Time</p>
              <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} disabled={limit.scheduledPosts===0}
                className="w-full border border-gray-200 rounded-xl p-3 text-gray-800 focus:border-jade-500 outline-none"/>
              <input type="time" value={time} onChange={(e)=>setTime(e.target.value)} disabled={limit.scheduledPosts===0}
                className="w-full border border-gray-200 rounded-xl p-3 text-gray-800 focus:border-jade-500 outline-none"/>
            </div>
            <button onClick={schedule}
              className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors ${limit.scheduledPosts===0?"bg-gray-200 text-gray-400":"bg-jade-500 text-white hover:bg-jade-600"}`}>
              <Calendar size={18}/>{limit.scheduledPosts===0?"Upgrade to Schedule":"Schedule Post"}
            </button>
            {scheduledPosts.length>0&&(
              <div className="space-y-2">
                <p className="font-bold text-gray-800">Scheduled Posts</p>
                {scheduledPosts.map((p)=>(
                  <div key={p.id} className="bg-white rounded-xl p-3 flex items-center gap-3 shadow-sm">
                    <Calendar size={18} className="text-jade-500 shrink-0"/>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-700 text-sm font-semibold truncate">{p.caption||"No caption"}</p>
                      <p className="text-gray-400 text-xs">{p.platforms.join(", ")} · {p.scheduledAt}</p>
                    </div>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${p.status==="pending"?"bg-yellow-100 text-yellow-600":"bg-jade-100 text-jade-600"}`}>{p.status}</span>
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
