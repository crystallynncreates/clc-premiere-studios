import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Check } from "lucide-react";
import { useStore } from "../store/useStore";
import { RETRO_SKINS, ANIME_SKINS } from "../data/skins";

function SkinAvatar({ colors, era, size=70 }: { colors:string[]; era:string; size?:number }) {
  const [c1,c2,c3] = colors;
  const s = size; const cx = s/2; const cy = s/2; const r = s*0.38;
  if (era==="retro") return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
      <circle cx={cx} cy={cy} r={r+4} fill={c2||"#FDE68A"}/>
      <circle cx={cx} cy={cy} r={r} fill={c1}/>
      <circle cx={cx-r*.3} cy={cy-r*.15} r={r*.14} fill="white"/>
      <circle cx={cx+r*.3} cy={cy-r*.15} r={r*.14} fill="white"/>
      <circle cx={cx-r*.28} cy={cy-r*.13} r={r*.07} fill="#1F2937"/>
      <circle cx={cx+r*.28} cy={cy-r*.13} r={r*.07} fill="#1F2937"/>
      <path d={`M${cx-r*.3} ${cy+r*.2} Q${cx} ${cy+r*.4} ${cx+r*.3} ${cy+r*.2}`} stroke="#1F2937" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d={`M${cx-r} ${cy-r*.2} Q${cx} ${cy-r*1.4} ${cx+r} ${cy-r*.2}`} fill={c3||"#92400E"}/>
      <circle cx={cx-r*.55} cy={cy+r*.1} r={r*.12} fill="#FCA5A5" opacity=".6"/>
      <circle cx={cx+r*.55} cy={cy+r*.1} r={r*.12} fill="#FCA5A5" opacity=".6"/>
    </svg>
  );
  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
      <circle cx={cx} cy={cy} r={r+6} fill={c2||"#C4B5FD"} opacity=".3"/>
      <ellipse cx={cx} cy={cy+r*.05} rx={r*.85} ry={r} fill={c1}/>
      <ellipse cx={cx-r*.28} cy={cy-r*.1} rx={r*.2} ry={r*.25} fill="white"/>
      <ellipse cx={cx+r*.28} cy={cy-r*.1} rx={r*.2} ry={r*.25} fill="white"/>
      <ellipse cx={cx-r*.27} cy={cy-r*.08} rx={r*.12} ry={r*.17} fill={c3||"#7C3AED"}/>
      <ellipse cx={cx+r*.27} cy={cy-r*.08} rx={r*.12} ry={r*.17} fill={c3||"#7C3AED"}/>
      <circle cx={cx-r*.24} cy={cy-r*.11} r={r*.05} fill="white"/>
      <circle cx={cx+r*.24} cy={cy-r*.11} r={r*.05} fill="white"/>
      <path d={`M${cx-r*.12} ${cy+r*.28} Q${cx} ${cy+r*.38} ${cx+r*.12} ${cy+r*.28}`} stroke="#DB2777" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <path d={`M${cx-r*.9} ${cy-r*.3} Q${cx-r*.7} ${cy-r*1.3} ${cx-r*.2} ${cy-r*.85}`} fill={c3||"#7C3AED"}/>
      <path d={`M${cx} ${cy-r*1.0} Q${cx} ${cy-r*1.5} ${cx+r*.1} ${cy-r*.9}`} fill={c3||"#7C3AED"}/>
      <path d={`M${cx+r*.9} ${cy-r*.3} Q${cx+r*.7} ${cy-r*1.3} ${cx+r*.2} ${cy-r*.85}`} fill={c3||"#7C3AED"}/>
    </svg>
  );
}

export default function SkinsPage() {
  const navigate = useNavigate();
  const { user, selectedSkinId, setSelectedSkin } = useStore();
  const [tab, setTab] = useState<"retro"|"anime">("retro");
  const skins = tab==="retro" ? RETRO_SKINS : ANIME_SKINS;

  return (
    <div className="flex flex-col h-full bg-gray-900">
      <div className="flex p-4 gap-1">
        {(["retro","anime"] as const).map((t)=>(
          <button key={t} onClick={()=>setTab(t)}
            className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-colors ${tab===t?"bg-jade-500 text-white":"bg-gray-800 text-gray-400"}`}>
            {t==="retro"?"80s/90s Retro (30)":"Anime (30)"}
          </button>
        ))}
      </div>

      <p className="px-4 text-gray-500 text-xs mb-2">Tap a skin to apply to your stream. Locked skins unlock with paid plans (1 new/month).</p>

      {selectedSkinId && (
        <div className="mx-4 mb-2 bg-jade-900/40 border border-jade-600 rounded-xl p-3 flex items-center gap-2">
          <Check size={16} className="text-jade-400"/>
          <span className="text-jade-300 font-semibold text-sm">Active: {[...RETRO_SKINS,...ANIME_SKINS].find((s)=>s.id===selectedSkinId)?.name}</span>
          <button onClick={()=>setSelectedSkin(null)} className="ml-auto text-gray-500 text-xs hover:text-gray-300">Remove</button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
          {skins.map((skin)=>{
            const unlocked = !skin.isPremium || user.unlockedSkins.includes(skin.id);
            const active = selectedSkinId===skin.id;
            return (
              <button key={skin.id} onClick={()=>{
                if (!unlocked) { if(confirm(`Unlock "${skin.name}"?\n\nThis skin unlocks on the ${skin.unlocksAt} plan.`)) navigate("/account"); return; }
                setSelectedSkin(active?null:skin.id);
              }} className={`relative rounded-2xl overflow-hidden border-2 transition-all ${active?"border-jade-400 shadow-lg shadow-jade-900/50":"border-gray-700 hover:border-gray-500"} bg-gray-800`}>
                <div className="pt-3 pb-1 flex justify-center" style={{backgroundColor:skin.colors[1]+"30"}}>
                  <SkinAvatar colors={skin.colors} era={skin.era} size={70}/>
                </div>
                <div className="p-2">
                  <p className="text-white text-xs font-bold text-center truncate">{skin.name}</p>
                  <p className="text-gray-500 text-xs text-center truncate">{skin.category}</p>
                </div>
                {!unlocked&&(
                  <div className="absolute inset-0 bg-black/65 flex flex-col items-center justify-center rounded-2xl">
                    <Lock size={18} className="text-jade-400"/><span className="text-jade-400 text-xs mt-1 font-semibold capitalize">{skin.unlocksAt}</span>
                  </div>
                )}
                {active&&(
                  <div className="absolute top-1.5 right-1.5 w-5 h-5 bg-jade-500 rounded-full flex items-center justify-center">
                    <Check size={12} className="text-white"/>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {user.tier==="free"&&(
        <div className="mx-4 mb-4 bg-jade-900/40 border border-jade-700 rounded-2xl p-4 text-center">
          <p className="text-jade-300 font-bold">Unlock New Skins Monthly</p>
          <p className="text-gray-400 text-xs mt-1">Basic $4.99 or Pro $10 — 1 new cartoon skin per month</p>
          <button onClick={()=>navigate("/account")} className="mt-3 bg-jade-500 text-white font-bold px-5 py-2 rounded-xl hover:bg-jade-600 transition-colors">Upgrade Now</button>
        </div>
      )}
    </div>
  );
}
