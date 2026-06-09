import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Film, Plus, Sparkles, Music, Type, Wand2, Scissors, Zap } from "lucide-react";
import { useStore } from "../store/useStore";
import { TIER_LIMITS } from "../types";

const FILTERS = ["None","Vivid","Dreamy","Vintage","Chrome","Jade","Neon","Noir"];
const SPEEDS  = ["0.25x","0.5x","0.75x","1x","1.25x","1.5x","2x","3x"];
const TRANS   = ["Cut","Fade","Slide","Zoom","Spin","Glitch","Wipe","Blur"];
const EFFECTS = ["Noise Reduce","Stabilize","Color Grade","Face Smooth","Background Remove","Green Screen","Denoise","HDR"];
const TABS    = [{id:"clips",label:"Clips",icon:Film},{id:"audio",label:"Audio",icon:Music},{id:"text",label:"Text",icon:Type},{id:"effects",label:"Effects",icon:Wand2},{id:"transitions",label:"Transitions",icon:Scissors},{id:"ai",label:"AI Tools",icon:Sparkles}];

interface Clip { id:string; label:string; duration:number; color:string; }

export default function EditorPage() {
  const navigate = useNavigate();
  const { user, aiProcessing, setAiProcessing, addProject } = useStore();
  const [tab, setTab] = useState("clips");
  const [clips, setClips] = useState<Clip[]>([]);
  const [filter, setFilter] = useState("None");
  const [speed, setSpeed] = useState("1x");
  const [volume, setVolume] = useState(80);
  const limit = TIER_LIMITS[user.tier];
  const COLORS = ["#00A86B","#8B5CF6","#EF4444","#F59E0B","#0EA5E9","#EC4899"];

  const addClip = () => setClips((c) => [...c, { id:`clip-${Date.now()}`, label:`Clip ${c.length+1}`, duration: Math.floor(Math.random()*15)+5, color: COLORS[c.length%COLORS.length] }]);

  const runAI = () => {
    if (!limit.aiFeatures) { navigate("/account"); return; }
    setAiProcessing(true);
    setTimeout(() => { setAiProcessing(false); alert("✅ AI Enhancement complete!\n\nAudio cleaned · Video stabilized · Color graded · Smart cuts applied"); }, 2500);
  };

  const exportVideo = () => {
    if (!clips.length) { alert("Add clips to your timeline first."); return; }
    addProject({ id:`proj-${Date.now()}`, name:`Project ${new Date().toLocaleDateString()}`, clipCount: clips.length, duration: clips.reduce((a,c)=>a+c.duration,0), createdAt: new Date().toLocaleDateString() });
    if (confirm("Project saved! Go to Social to schedule posting?")) navigate("/social");
  };

  return (
    <div className="flex flex-col h-full bg-gray-900">
      {/* Preview */}
      <div className="bg-black h-48 md:h-64 flex items-center justify-center relative">
        {clips.length === 0 ? (
          <div className="text-center">
            <Film size={48} className="text-gray-700 mx-auto mb-2" />
            <p className="text-gray-500 mb-3">Add clips to start editing</p>
            <button onClick={addClip} className="bg-jade-500 text-white px-4 py-2 rounded-xl font-bold hover:bg-jade-600 transition-colors">+ Add Clip</button>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: clips[0].color+"30" }}>
            <div className="text-center">
              <Film size={40} style={{ color: clips[0].color }} className="mx-auto mb-1" />
              <p className="text-white font-bold">{clips.length} clip{clips.length>1?"s":""} · {clips.reduce((a,c)=>a+c.duration,0)}s total</p>
              <p className="text-gray-400 text-sm">Filter: {filter} · Speed: {speed}</p>
            </div>
          </div>
        )}
        {aiProcessing && (
          <div className="absolute inset-0 bg-black/75 flex flex-col items-center justify-center">
            <Sparkles size={32} className="text-yellow-300 animate-pulse" />
            <p className="text-white mt-2 font-bold animate-pulse">AI Processing...</p>
          </div>
        )}
      </div>

      {/* Timeline */}
      <div className="bg-gray-800 h-16 flex items-center px-3 gap-2 overflow-x-auto">
        {clips.map((c) => (
          <div key={c.id} className="h-12 rounded-lg flex flex-col justify-center px-2 shrink-0 cursor-pointer hover:opacity-80"
            style={{ width: c.duration*8, backgroundColor: c.color+"80", minWidth: 48 }}>
            <p className="text-white text-xs font-bold truncate">{c.label}</p>
            <p className="text-white/70 text-xs">{c.duration}s</p>
          </div>
        ))}
        <button onClick={addClip} className="w-14 h-12 border-2 border-dashed border-jade-600 rounded-lg flex flex-col items-center justify-center text-jade-400 shrink-0 hover:bg-jade-900/30 transition-colors">
          <Plus size={18} /><span className="text-xs">Add</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex bg-gray-800 border-b border-gray-700 overflow-x-auto">
        {TABS.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex items-center gap-1.5 px-4 py-3 text-xs font-semibold border-b-2 shrink-0 transition-colors ${tab===t.id?"border-jade-400 text-jade-400":"border-transparent text-gray-400 hover:text-gray-200"}`}>
            <t.icon size={14}/>{t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto p-4">
        {tab==="clips" && (
          <div className="space-y-4">
            <div>
              <p className="text-gray-300 font-bold mb-2">Filters</p>
              <div className="flex gap-2 flex-wrap">
                {FILTERS.map((f) => (
                  <button key={f} onClick={() => setFilter(f)}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${filter===f?"bg-jade-500 text-white":"bg-gray-700 text-gray-300 hover:bg-gray-600"}`}>{f}</button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-gray-300 font-bold mb-2">Speed</p>
              <div className="flex gap-2 flex-wrap">
                {SPEEDS.map((s) => (
                  <button key={s} onClick={() => setSpeed(s)}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${speed===s?"bg-jade-500 text-white":"bg-gray-700 text-gray-300 hover:bg-gray-600"}`}>{s}</button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-gray-300 font-bold mb-2">Volume: {volume}%</p>
              <input type="range" min={0} max={100} value={volume} onChange={(e)=>setVolume(+e.target.value)}
                className="w-full accent-jade-500" />
            </div>
          </div>
        )}
        {tab==="audio" && (
          <div className="space-y-2">
            {["Noise Reduction","Bass Boost","Treble Enhance","Echo Removal","Volume Normalize","Fade In/Out"].map((t) => (
              <div key={t} className="bg-gray-800 rounded-xl p-3 flex items-center justify-between">
                <span className="text-white">{t}</span>
                <input type="checkbox" className="accent-jade-500 w-4 h-4" />
              </div>
            ))}
            <button onClick={() => navigate("/music")} className="w-full bg-jade-900/40 border border-jade-700 text-jade-300 font-semibold py-3 rounded-xl mt-2 hover:bg-jade-900/60 transition-colors">
              + Add Background Music →
            </button>
          </div>
        )}
        {tab==="text" && (
          <div className="space-y-3">
            <p className="text-gray-300 font-bold">Text Styles</p>
            <div className="flex flex-wrap gap-2">
              {["Bold","Neon","Shadow","Outline","Gradient","Handwrite","Glitch","Rainbow"].map((s)=>(
                <button key={s} className="bg-gray-800 border border-gray-600 text-white px-4 py-2 rounded-xl text-sm hover:border-jade-500 transition-colors">{s}</button>
              ))}
            </div>
            <div className={`bg-gray-800 rounded-xl p-3 flex items-center justify-between ${!limit.aiFeatures?"opacity-50":""}`}>
              <div className="flex items-center gap-2"><Sparkles size={16} className="text-yellow-400"/><span className="text-white">Auto-Caption (AI)</span></div>
              {!limit.aiFeatures?<span className="text-jade-400 text-xs font-bold cursor-pointer" onClick={()=>navigate("/account")}>Upgrade</span>:<input type="checkbox" className="accent-jade-500 w-4 h-4"/>}
            </div>
          </div>
        )}
        {tab==="effects" && (
          <div className="flex flex-wrap gap-2">
            {EFFECTS.map((e)=>(
              <button key={e} className="px-4 py-2 rounded-xl border border-gray-600 bg-gray-800 text-white text-sm hover:border-jade-500 transition-colors">{e}</button>
            ))}
          </div>
        )}
        {tab==="transitions" && (
          <div className="grid grid-cols-4 gap-3">
            {TRANS.map((t)=>(
              <button key={t} className="bg-gray-800 rounded-xl p-3 flex flex-col items-center gap-1 border border-gray-700 hover:border-jade-500 transition-colors">
                <Zap size={20} className="text-jade-400"/><span className="text-white text-xs">{t}</span>
              </button>
            ))}
          </div>
        )}
        {tab==="ai" && (
          <div className="space-y-3">
            <div className={`rounded-2xl p-4 ${limit.aiFeatures?"bg-jade-900/40 border border-jade-700":"bg-gray-800"}`}>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={20} className="text-yellow-400"/><h3 className="text-white font-bold">AI Smart Edit</h3>
              </div>
              <p className="text-gray-300 text-sm mb-3">One-tap AI: audio clean, color grade, stabilize, smart cuts.</p>
              <button onClick={runAI} className={`w-full py-3 rounded-xl font-bold transition-colors ${aiProcessing?"bg-gray-600 text-gray-400":limit.aiFeatures?"bg-jade-500 text-white hover:bg-jade-600":"bg-gray-700 text-gray-400"}`}>
                {aiProcessing?"Processing...":limit.aiFeatures?"✨ Run AI Enhance":"Upgrade to Unlock AI"}
              </button>
            </div>
            {[{label:"AI Audio Perfect",desc:"Remove noise, normalize, enhance clarity"},{label:"AI Video Upscale",desc:"Enhance resolution & sharpness"},{label:"AI Smart Crop",desc:"Auto-frame for Instagram, YouTube, TikTok"},{label:"AI Caption Generator",desc:"Auto-transcribe and add styled captions"},{label:"AI Thumbnail Creator",desc:"Generate eye-catching thumbnails"}].map((item)=>(
              <div key={item.label} onClick={()=>!limit.aiFeatures&&navigate("/account")}
                className={`bg-gray-800 rounded-xl p-3 flex items-center gap-3 cursor-pointer hover:bg-gray-750 transition-colors ${!limit.aiFeatures?"opacity-60":""}`}>
                <Sparkles size={18} className="text-jade-400 shrink-0"/>
                <div><p className="text-white font-semibold text-sm">{item.label}</p><p className="text-gray-400 text-xs">{item.desc}</p></div>
                {!limit.aiFeatures&&<span className="ml-auto text-jade-400 text-xs font-bold">Upgrade</span>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Export bar */}
      <div className="bg-gray-800 px-4 py-3 flex gap-3 border-t border-gray-700">
        <button className="flex-1 bg-gray-700 text-gray-200 font-semibold py-3 rounded-xl hover:bg-gray-600 transition-colors">Save Draft</button>
        <button onClick={exportVideo} className="flex-1 bg-jade-500 text-white font-bold py-3 rounded-xl hover:bg-jade-600 transition-colors">Export & Share</button>
      </div>
    </div>
  );
}
