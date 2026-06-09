import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Play, Pause, Plus, Sparkles, Mic, MicOff } from "lucide-react";
import { useStore } from "../store/useStore";
import { TIER_LIMITS } from "../types";
import { MUSIC_LIBRARY, GENRE_LABELS, formatDuration } from "../data/music";

const GENRES = ["all","pop","country","rap","rnb"] as const;

export default function MusicPage() {
  const navigate = useNavigate();
  const { user, aiProcessing, setAiProcessing } = useStore();
  const [tab, setTab] = useState<"library"|"ai">("library");
  const [genre, setGenre] = useState<typeof GENRES[number]>("all");
  const [playing, setPlaying] = useState<string|null>(null);
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("pop");
  const [voiceRec, setVoiceRec] = useState(false);
  const [result, setResult] = useState<string|null>(null);
  const limit = TIER_LIMITS[user.tier];
  const tracks = genre==="all" ? MUSIC_LIBRARY : MUSIC_LIBRARY.filter((t)=>t.genre===genre);

  const generate = () => {
    if (!limit.aiFeatures) { navigate("/account"); return; }
    if (!prompt && !voiceRec) { alert("Add a description or record your voice first."); return; }
    setAiProcessing(true);
    setTimeout(()=>{ setAiProcessing(false); setResult(`"${prompt||"Voice Creation"}" — ${style} style`); },3000);
  };

  return (
    <div className="flex flex-col h-full bg-gray-900">
      <div className="flex p-4 gap-1 bg-gray-900">
        {(["library","ai"] as const).map((t)=>(
          <button key={t} onClick={()=>setTab(t)}
            className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-colors ${tab===t?"bg-jade-500 text-white":"bg-gray-800 text-gray-400 hover:text-gray-200"}`}>
            {t==="library"?"Music Library":"AI Music Creator"}
          </button>
        ))}
      </div>

      {tab==="library" ? (
        <div className="flex-1 overflow-y-auto px-4">
          <div className="flex gap-2 flex-wrap mb-3">
            {GENRES.map((g)=>(
              <button key={g} onClick={()=>setGenre(g)}
                className={`px-3 py-1.5 rounded-full text-sm font-semibold border transition-colors ${genre===g?"bg-jade-500 border-jade-500 text-white":"border-gray-600 text-gray-400 hover:text-gray-200"}`}>
                {g==="all"?"All":GENRE_LABELS[g]}
              </button>
            ))}
          </div>
          <p className="text-gray-500 text-xs mb-3">Royalty-free tracks. Current chart songs require licensing.</p>
          <div className="space-y-3 pb-4">
            {tracks.map((t)=>{
              const isPlaying = playing===t.id;
              return (
                <div key={t.id} onClick={()=>setPlaying(isPlaying?null:t.id)}
                  className={`rounded-2xl p-4 cursor-pointer transition-all ${isPlaying?"bg-jade-900/60 border border-jade-600":"bg-gray-800 hover:bg-gray-750"}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${isPlaying?"bg-jade-500":"bg-gray-700"}`}>
                      {isPlaying?<Pause size={20} className="text-white"/>:<Play size={20} className="text-white"/>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-bold truncate">{t.title}</p>
                      <p className="text-gray-400 text-xs">{t.artist}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="bg-jade-900/60 text-jade-400 text-xs px-2 py-0.5 rounded-full">{GENRE_LABELS[t.genre]}</span>
                        <span className="text-gray-500 text-xs">{t.bpm} BPM · {formatDuration(t.duration)}</span>
                      </div>
                    </div>
                    <button className="text-jade-400 hover:text-jade-300 transition-colors"><Plus size={22}/></button>
                  </div>
                  {isPlaying && t.waveform && (
                    <div className="flex items-center gap-0.5 mt-3 h-8">
                      {t.waveform.map((h,i)=>(
                        <div key={i} className="flex-1 rounded-full bg-jade-400 animate-pulse" style={{height:`${h*100}%`}}/>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4">
          <div className={`rounded-2xl p-4 ${limit.aiFeatures?"bg-jade-900/40 border border-jade-700":"bg-gray-800"}`}>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles size={20} className="text-yellow-400"/><h3 className="text-white font-bold text-lg">AI Music Creator</h3>
              {!limit.aiFeatures&&<button onClick={()=>navigate("/account")} className="ml-auto bg-jade-600 text-white text-xs font-bold px-3 py-1 rounded-full">Upgrade</button>}
            </div>
            <p className="text-gray-300 text-sm mb-4">Describe your song + record your voice → AI creates a full custom track.</p>

            <p className="text-gray-300 font-semibold mb-1">Describe Your Song</p>
            <textarea className="w-full bg-gray-800 rounded-xl p-3 text-white text-sm mb-3 resize-none border border-gray-700 focus:border-jade-500 outline-none"
              rows={3} placeholder="e.g. Upbeat summer pop song about confidence and glowing up..."
              value={prompt} onChange={(e)=>setPrompt(e.target.value)} disabled={!limit.aiFeatures}/>

            <p className="text-gray-300 font-semibold mb-2">Style</p>
            <div className="flex gap-2 flex-wrap mb-4">
              {["pop","country","rap","rnb","electronic","jazz","gospel","cinematic"].map((s)=>(
                <button key={s} onClick={()=>limit.aiFeatures&&setStyle(s)}
                  className={`px-3 py-1.5 rounded-full text-sm font-semibold capitalize transition-colors ${style===s?"bg-jade-500 text-white":"bg-gray-700 text-gray-400"}`}>{s}</button>
              ))}
            </div>

            <p className="text-gray-300 font-semibold mb-2">Record Your Voice (Optional)</p>
            <button onClick={()=>{ if(!limit.aiFeatures){navigate("/account");return;} setVoiceRec(!voiceRec); }}
              className={`w-full rounded-xl p-4 flex flex-col items-center border-2 border-dashed mb-4 transition-colors ${voiceRec?"border-jade-500 bg-jade-900/30":"border-gray-600 bg-gray-800"}`}>
              {voiceRec?<Mic size={28} className="text-jade-400"/>:<MicOff size={28} className="text-gray-500"/>}
              <span className={`mt-2 font-semibold ${voiceRec?"text-jade-400":"text-gray-400"}`}>
                {voiceRec?"Voice Recorded ✓ — AI will use your voice!":"Tap to record your voice or melody"}
              </span>
            </button>

            <button onClick={generate} disabled={aiProcessing}
              className={`w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-colors ${aiProcessing?"bg-gray-600 text-gray-400":limit.aiFeatures?"bg-jade-500 text-white hover:bg-jade-600":"bg-gray-700 text-gray-400"}`}>
              <Sparkles size={18}/>{aiProcessing?"Creating Your Song...":limit.aiFeatures?"Create AI Song":"Upgrade to Create AI Music"}
            </button>
          </div>

          {result && (
            <div className="bg-jade-900/40 border border-jade-600 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2"><Sparkles size={18} className="text-jade-400"/><p className="text-jade-300 font-bold">Your AI Track is Ready!</p></div>
              <p className="text-white mb-3">{result}</p>
              <div className="flex items-center gap-0.5 h-10 mb-3">
                {Array.from({length:20},()=>Math.random()*0.7+0.2).map((h,i)=>(
                  <div key={i} className="flex-1 rounded-full bg-jade-400" style={{height:`${h*100}%`}}/>
                ))}
              </div>
              <div className="flex gap-3">
                <button className="flex-1 bg-jade-500 text-white font-bold py-2.5 rounded-xl hover:bg-jade-600 transition-colors">Add to Video</button>
                <button className="flex-1 bg-gray-700 text-gray-200 font-bold py-2.5 rounded-xl hover:bg-gray-600 transition-colors">Save Track</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
