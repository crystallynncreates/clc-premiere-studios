import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, CameraOff, Mic, MicOff, Radio, Monitor, Sparkles, Shield, X, Lock, Zap } from "lucide-react";
import { useStore } from "../store/useStore";
import { TIER_LIMITS } from "../types";
import { ALL_SKINS } from "../data/skins";

// ─── Sticker SVGs (unchanged) ─────────────────────────────────────────────────

function StarSticker({ size=44 }: { size?:number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44">
      <polygon points="22,3 27,16 42,16 30,25 35,38 22,30 9,38 14,25 2,16 17,16"
        fill="#FFD700" stroke="#FFA500" strokeWidth="1.5" strokeLinejoin="round"/>
      <polygon points="22,8 26,17 36,17 28,23 31,33 22,27 13,33 16,23 8,17 18,17"
        fill="#FFE44D" opacity="0.6"/>
    </svg>
  );
}

function MoonSticker({ size=44 }: { size?:number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44">
      <path d="M30 8 Q14 10 12 22 Q10 34 26 38 Q16 36 14 26 Q12 14 24 10 Z"
        fill="#FFF176" stroke="#F9A825" strokeWidth="1.5"/>
      <circle cx="20" cy="16" r="2" fill="#F9A825" opacity="0.5"/>
      <circle cx="16" cy="26" r="1.5" fill="#F9A825" opacity="0.4"/>
      <circle cx="23" cy="30" r="1" fill="#F9A825" opacity="0.4"/>
    </svg>
  );
}

function FlowerSticker({ size=44 }: { size?:number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44">
      {[0,60,120,180,240,300].map((deg,i) => {
        const rad = deg * Math.PI / 180;
        return <ellipse key={i} cx={22 + Math.sin(rad)*10} cy={22 - Math.cos(rad)*10}
          rx="7" ry="10" fill="#FF9BB3" stroke="#FF6B8A" strokeWidth="0.8"
          transform={`rotate(${deg} ${22+Math.sin(rad)*10} ${22-Math.cos(rad)*10})`}/>;
      })}
      <circle cx="22" cy="22" r="8" fill="#FFD700" stroke="#FFA500" strokeWidth="1"/>
      <circle cx="22" cy="22" r="4" fill="#FFF9C4"/>
    </svg>
  );
}

function BalloonSticker({ size=44 }: { size?:number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44">
      <ellipse cx="22" cy="17" rx="13" ry="15" fill="#FF6B9D" stroke="#D1447A" strokeWidth="1.2"/>
      <ellipse cx="17" cy="12" rx="4" ry="5" fill="white" opacity="0.35"/>
      <path d="M22 32 Q20 36 22 38 Q24 36 22 32" fill="#D1447A"/>
      <path d="M22 38 Q19 40 20 42 Q22 41 24 42 Q25 40 22 38" fill="#D1447A" opacity="0.6"/>
    </svg>
  );
}

function SparkleSticker({ size=44 }: { size?:number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44">
      {[0,45,90,135,180,225,270,315].map((deg,i) => {
        const rad = deg * Math.PI / 180;
        const r = i%2===0 ? 18 : 10;
        return <line key={i} x1="22" y1="22"
          x2={22+Math.sin(rad)*r} y2={22-Math.cos(rad)*r}
          stroke={i%2===0?"#C084FC":"#E9D5FF"} strokeWidth={i%2===0?3:1.5} strokeLinecap="round"/>;
      })}
      <circle cx="22" cy="22" r="4" fill="#C084FC"/>
      <circle cx="22" cy="22" r="2" fill="white"/>
    </svg>
  );
}

function RainbowSticker({ size=44 }: { size?:number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44">
      {[["#FF4444",20],["#FF8C00",16.5],["#FFD700",13],["#4CAF50",9.5],["#2196F3",6]].map(([c,r],i) => (
        <path key={i} d={`M6,28 A${r},${r} 0 0,1 38,28`}
          fill="none" stroke={c as string} strokeWidth="3.2" strokeLinecap="round"/>
      ))}
      <ellipse cx="8"  cy="30" rx="5" ry="4" fill="white" opacity="0.9"/>
      <ellipse cx="36" cy="30" rx="5" ry="4" fill="white" opacity="0.9"/>
    </svg>
  );
}

function YTBannerSticker({ size=56 }: { size?:number }) {
  return (
    <svg width={size} height={size*0.35} viewBox="0 0 160 56">
      <rect x="0" y="0" width="160" height="56" rx="6" fill="#FF0000"/>
      <polygon points="60,14 60,42 100,28" fill="white"/>
      <text x="108" y="34" fontSize="18" fill="white" fontFamily="Arial,sans-serif" fontWeight="bold">YouTube</text>
    </svg>
  );
}

function YTLiveBannerSticker({ size=56 }: { size?:number }) {
  return (
    <svg width={size} height={size*0.45} viewBox="0 0 160 72">
      <rect x="0" y="0" width="160" height="72" rx="6" fill="#CC0000"/>
      <circle cx="22" cy="36" r="8" fill="white"/>
      <circle cx="22" cy="36" r="4" fill="#CC0000"/>
      <text x="40" y="30" fontSize="14" fill="white" fontFamily="Arial,sans-serif" fontWeight="bold">YouTube</text>
      <rect x="40" y="38" width="42" height="18" rx="3" fill="white"/>
      <text x="44" y="51" fontSize="13" fill="#CC0000" fontFamily="Arial,sans-serif" fontWeight="bold">LIVE</text>
    </svg>
  );
}

function FBBannerSticker({ size=56 }: { size?:number }) {
  return (
    <svg width={size*2} height={size*0.4} viewBox="0 0 200 50">
      <rect x="0" y="0" width="200" height="50" rx="0" fill="#1877F2"/>
      <text x="14" y="32" fontSize="26" fill="white" fontFamily="Arial,sans-serif" fontWeight="bold">f</text>
      <text x="40" y="32" fontSize="16" fill="white" fontFamily="Arial,sans-serif" fontWeight="600">Facebook</text>
      <rect x="120" y="12" width="70" height="26" rx="13" fill="white"/>
      <text x="127" y="30" fontSize="13" fill="#1877F2" fontFamily="Arial,sans-serif" fontWeight="bold">Follow Me</text>
    </svg>
  );
}

function CowboyHatSticker({ size=52 }: { size?:number }) {
  return (
    <svg width={size} height={size*0.7} viewBox="0 0 80 56">
      <ellipse cx="40" cy="44" rx="36" ry="10" fill="#8B6914"/>
      <path d="M14 44 Q14 16 40 14 Q66 16 66 44 Z" fill="#C8952A"/>
      <ellipse cx="40" cy="44" rx="36" ry="10" fill="none" stroke="#8B6914" strokeWidth="2"/>
      <path d="M18 38 Q40 34 62 38" stroke="#8B6914" strokeWidth="2.5" fill="none"/>
      <path d="M18 40 Q40 36 62 40 Q62 43 40 44 Q18 43 18 40 Z" fill="#D4A017" opacity="0.7"/>
    </svg>
  );
}

function PurseSticker({ size=48 }: { size?:number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <path d="M16 18 Q16 8 24 8 Q32 8 32 18" fill="none" stroke="#C2185B" strokeWidth="3" strokeLinecap="round"/>
      <rect x="8" y="18" width="32" height="24" rx="5" fill="#E91E8C"/>
      <rect x="8" y="18" width="32" height="24" rx="5" fill="none" stroke="#C2185B" strokeWidth="1.5"/>
      <rect x="19" y="27" width="10" height="7" rx="3" fill="#FFD700" stroke="#FFA000" strokeWidth="1"/>
      <circle cx="24" cy="30" r="2" fill="#FFA000"/>
      <ellipse cx="17" cy="24" rx="4" ry="3" fill="white" opacity="0.2"/>
    </svg>
  );
}

function EiffelSticker({ size=52 }: { size?:number }) {
  return (
    <svg width={size*0.7} height={size} viewBox="0 0 56 80">
      <path d="M10 70 L22 40 L28 40 L22 70 Z" fill="#A0906E"/>
      <path d="M46 70 L34 40 L28 40 L34 70 Z" fill="#A0906E"/>
      <path d="M16 50 L24 30 L32 30 L40 50 Z" fill="#B8A07C"/>
      <path d="M20 30 L26 14 L30 14 L36 30 Z" fill="#C8B090"/>
      <polygon points="28,4 26,14 30,14" fill="#D4C0A0"/>
      <line x1="12" y1="56" x2="44" y2="56" stroke="#8B7355" strokeWidth="2"/>
      <line x1="18" y1="38" x2="38" y2="38" stroke="#8B7355" strokeWidth="1.5"/>
      <line x1="22" y1="24" x2="34" y2="24" stroke="#8B7355" strokeWidth="1.5"/>
    </svg>
  );
}

function BlackHeartSticker({ size=44 }: { size?:number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44">
      <path d="M22 38 C22 38 4 26 4 15 C4 9 8 5 14 5 C17.5 5 20.5 7 22 10 C23.5 7 26.5 5 30 5 C36 5 40 9 40 15 C40 26 22 38 22 38Z"
        fill="#1a1a1a" stroke="#000" strokeWidth="1"/>
      <path d="M12 14 C12 11 14 9 17 9" stroke="#555" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5"/>
    </svg>
  );
}

function RedHeartSticker({ size=44 }: { size?:number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44">
      <path d="M22 38 C22 38 4 26 4 15 C4 9 8 5 14 5 C17.5 5 20.5 7 22 10 C23.5 7 26.5 5 30 5 C36 5 40 9 40 15 C40 26 22 38 22 38Z"
        fill="#EF4444" stroke="#B91C1C" strokeWidth="1"/>
      <path d="M12 14 C12 11 14 9 17 9" stroke="#FCA5A5" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6"/>
    </svg>
  );
}

interface Sticker { id:string; label:string; free:boolean; unlocksAt?:string; Component: React.FC<{size?:number}>; overlayPos: string; }

const STICKERS: Sticker[] = [
  { id:"star",     label:"Star",         free:true,  Component:StarSticker,        overlayPos:"top-14 left-3" },
  { id:"moon",     label:"Moon",         free:true,  Component:MoonSticker,        overlayPos:"top-14 right-3" },
  { id:"flower",   label:"Flower",       free:true,  Component:FlowerSticker,      overlayPos:"bottom-16 left-3" },
  { id:"balloon",  label:"Balloon",      free:true,  Component:BalloonSticker,     overlayPos:"top-14 left-14" },
  { id:"sparkle",  label:"Sparkle",      free:true,  Component:SparkleSticker,     overlayPos:"top-3 right-20" },
  { id:"rainbow",  label:"Rainbow",      free:true,  Component:RainbowSticker,     overlayPos:"top-3 left-3" },
  { id:"ytbanner", label:"YT Banner",    free:false, unlocksAt:"basic", Component:YTBannerSticker,     overlayPos:"top-3 left-1/2 -translate-x-1/2" },
  { id:"ytlive",   label:"YT Live",      free:false, unlocksAt:"basic", Component:YTLiveBannerSticker, overlayPos:"top-3 right-3" },
  { id:"fbbanner", label:"FB Banner",    free:false, unlocksAt:"basic", Component:FBBannerSticker,     overlayPos:"bottom-2 left-0 right-0" },
  { id:"cowboy",   label:"Cowboy Hat",   free:false, unlocksAt:"basic", Component:CowboyHatSticker,    overlayPos:"top-3 left-3" },
  { id:"purse",    label:"Purse",        free:false, unlocksAt:"basic", Component:PurseSticker,        overlayPos:"bottom-16 right-3" },
  { id:"eiffel",   label:"Eiffel Tower", free:false, unlocksAt:"pro",   Component:EiffelSticker,       overlayPos:"bottom-16 left-3" },
  { id:"blackhrt", label:"Black Heart",  free:false, unlocksAt:"pro",   Component:BlackHeartSticker,   overlayPos:"bottom-16 right-14" },
  { id:"redhrt",   label:"Red Heart",    free:false, unlocksAt:"pro",   Component:RedHeartSticker,     overlayPos:"bottom-16 left-14" },
];

// ── Animated waveform for audio visualizer ────────────────────────────────────
function Waveform({ active, color = "#00D485" }: { active: boolean; color?: string }) {
  const bars = 32;
  return (
    <div className="flex items-end gap-0.5 h-8">
      {Array.from({ length: bars }).map((_, i) => (
        <div
          key={i}
          className="flex-1 rounded-full"
          style={{
            background: color,
            height: "100%",
            opacity: active ? (0.4 + (i % 4) * 0.15) : 0.15,
            transformOrigin: "bottom",
            transform: active ? undefined : "scaleY(0.2)",
            animation: active ? `wave-bar ${0.4 + (i % 5) * 0.12}s ease-in-out infinite` : "none",
            animationDelay: active ? `${(i * 0.06) % 0.7}s` : "0s",
            transition: "transform 0.3s, opacity 0.3s",
          }}
        />
      ))}
    </div>
  );
}

export default function StudioPage() {
  const navigate = useNavigate();
  const { user, isRecording, isStreaming, setIsRecording, setIsStreaming, addRecordingSeconds, selectedSkinId, setSelectedSkin } = useStore();
  const [timer, setTimer]               = useState(0);
  const [camOn, setCamOn]               = useState(false);
  const [micOn, setMicOn]               = useState(true);
  const [aiOn, setAiOn]                 = useState(false);
  const [screenSharing, setScreenSharing] = useState(false);
  const [stream, setStream]             = useState<MediaStream | null>(null);
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);
  const [activeStickers, setActiveStickers] = useState<string[]>([]);
  const videoRef  = useRef<HTMLVideoElement>(null);
  const timerRef  = useRef<ReturnType<typeof setInterval> | null>(null);
  const limit     = TIER_LIMITS[user.tier];
  const remaining = limit.dailyRecordingSeconds === Infinity
    ? Infinity
    : Math.max(0, limit.dailyRecordingSeconds - user.recordingSecondsUsedToday);
  const currentSkin = ALL_SKINS.find((s) => s.id === selectedSkinId);

  const startCamera = async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: micOn });
      setStream(s);
      if (videoRef.current) videoRef.current.srcObject = s;
      setCamOn(true);
    } catch {
      alert("Please allow camera and microphone access in your browser settings.");
    }
  };

  const stopCamera = () => {
    stream?.getTracks().forEach((t) => t.stop());
    setStream(null);
    setCamOn(false);
    stopRecording();
  };

  const startScreenShare = async () => {
    try {
      const s = await (navigator.mediaDevices as MediaDevices & {
        getDisplayMedia(opts?: MediaStreamConstraints): Promise<MediaStream>;
      }).getDisplayMedia({ video: true, audio: true });
      setScreenStream(s);
      if (videoRef.current) videoRef.current.srcObject = s;
      setScreenSharing(true);
      s.getVideoTracks()[0].addEventListener("ended", () => {
        setScreenSharing(false);
        setScreenStream(null);
        if (camOn && stream && videoRef.current) videoRef.current.srcObject = stream;
      });
    } catch {
      alert("Screen sharing was cancelled or is not supported on this device.");
    }
  };

  const stopScreenShare = () => {
    screenStream?.getTracks().forEach((t) => t.stop());
    setScreenStream(null);
    setScreenSharing(false);
    if (camOn && stream && videoRef.current) videoRef.current.srcObject = stream;
  };

  const startRecording = () => {
    if (remaining === 0) { alert("Daily recording limit reached. Upgrade for more time."); return; }
    if (!camOn && !screenSharing) { alert("Please turn on your camera or screen share first."); return; }
    setIsRecording(true);
    timerRef.current = setInterval(() => {
      setTimer((t) => { addRecordingSeconds(1); return t + 1; });
    }, 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    setTimer(0);
  };

  useEffect(() => () => {
    stream?.getTracks().forEach((t) => t.stop());
    screenStream?.getTracks().forEach((t) => t.stop());
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  const fmt = (s: number) => `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;

  const toggleSticker = (id: string) => {
    setActiveStickers((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);
  };

  const isStickerUnlocked = (s: Sticker) => {
    if (s.free) return true;
    if (s.unlocksAt === "basic" && (user.tier === "basic" || user.tier === "pro")) return true;
    if (s.unlocksAt === "pro"   && user.tier === "pro") return true;
    return false;
  };

  const freeStickers = STICKERS.filter((s) => s.free);
  const paidStickers = STICKERS.filter((s) => !s.free);

  return (
    <div className="flex flex-col h-full" style={{ background: "transparent" }}>

      {/* ── Camera / Screen Preview ── */}
      <div
        className="relative flex-shrink-0 overflow-hidden"
        style={{
          height: "min(55vw, 340px)",
          background: "#000",
        }}
      >
        {/* Neon corner frames */}
        {(camOn || screenSharing) && (
          <>
            <div className="absolute top-2 left-2 w-8 h-8 pointer-events-none z-10"
              style={{ borderTop: "2px solid #00D485", borderLeft: "2px solid #00D485", borderRadius: "4px 0 0 0" }} />
            <div className="absolute top-2 right-2 w-8 h-8 pointer-events-none z-10"
              style={{ borderTop: "2px solid #00D485", borderRight: "2px solid #00D485", borderRadius: "0 4px 0 0" }} />
            <div className="absolute bottom-2 left-2 w-8 h-8 pointer-events-none z-10"
              style={{ borderBottom: "2px solid #00D485", borderLeft: "2px solid #00D485", borderRadius: "0 0 0 4px" }} />
            <div className="absolute bottom-2 right-2 w-8 h-8 pointer-events-none z-10"
              style={{ borderBottom: "2px solid #00D485", borderRight: "2px solid #00D485", borderRadius: "0 0 4px 0" }} />
            {/* Scan line */}
            <div className="scan-line z-10" />
          </>
        )}

        {(camOn || screenSharing) ? (
          <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
        ) : (
          <div
            className="flex flex-col items-center justify-center gap-4 h-full"
            style={{ background: "linear-gradient(135deg, #080812 0%, #0F0F20 100%)" }}
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center float"
              style={{ background: "rgba(0,212,133,0.08)", border: "2px dashed rgba(0,212,133,0.2)" }}
            >
              <Camera size={36} style={{ color: "rgba(0,212,133,0.4)" }} />
            </div>
            <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.3)" }}>Camera is off</p>
            <button
              onClick={startCamera}
              className="font-bold px-6 py-2.5 rounded-2xl text-sm transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #00D485, #00A86B)", color: "white", boxShadow: "0 0 24px rgba(0,212,133,0.4)" }}
            >
              Enable Camera
            </button>
          </div>
        )}

        {/* Active sticker overlays */}
        {activeStickers.map((id) => {
          const s = STICKERS.find((x) => x.id === id);
          if (!s) return null;
          return (
            <div key={id} className={`absolute pointer-events-none ${s.overlayPos}`}>
              <s.Component />
            </div>
          );
        })}

        {/* REC badge */}
        {isRecording && (
          <div className="absolute top-3 left-10 flex items-center gap-2 px-3 py-1.5 rounded-full z-20 rec-active"
            style={{ background: "#EF4444" }}>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span className="text-white text-sm font-bold tracking-widest">REC {fmt(timer)}</span>
          </div>
        )}
        {isStreaming && !isRecording && (
          <div className="absolute top-3 left-10 flex items-center gap-2 px-3 py-1.5 rounded-full z-20 rec-active"
            style={{ background: "#EF4444" }}>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span className="text-white text-sm font-bold tracking-widest">LIVE</span>
          </div>
        )}
        {screenSharing && (
          <div className="absolute top-3 right-10 flex items-center gap-2 px-2.5 py-1 rounded-full z-20"
            style={{ background: "rgba(124,92,246,0.9)", boxShadow: "0 0 12px rgba(124,92,246,0.5)" }}>
            <Monitor size={12} className="text-white" />
            <span className="text-white text-xs font-bold">SCREEN</span>
          </div>
        )}

        {/* Skin badge */}
        {currentSkin && (
          <div
            className="absolute bottom-3 left-3 w-14 h-14 rounded-full border-2 border-white/60 flex items-center justify-center text-center text-white text-xs font-bold z-10"
            style={{ backgroundColor: currentSkin.colors[0] + "CC", boxShadow: "0 0 12px rgba(0,0,0,0.4)" }}
          >
            {currentSkin.name}
          </div>
        )}

        {/* AI Enhanced */}
        {aiOn && limit.aiFeatures && (
          <div className="absolute bottom-3 left-20 flex items-center gap-1 px-2.5 py-1 rounded-full z-10"
            style={{ background: "rgba(124,92,246,0.85)", boxShadow: "0 0 12px rgba(124,92,246,0.4)" }}>
            <Sparkles size={12} className="text-yellow-300" />
            <span className="text-white text-xs font-semibold">AI Enhanced</span>
          </div>
        )}

        {/* Protected */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full z-10"
          style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", border: "1px solid rgba(0,212,133,0.2)" }}>
          <Shield size={11} style={{ color: "#00D485" }} />
          <span className="text-white text-xs">Protected</span>
        </div>
      </div>

      {/* ── Audio waveform ── */}
      <div
        className="px-4 pt-3 pb-2"
        style={{ background: "rgba(8,8,18,0.9)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <Waveform active={camOn || screenSharing || isRecording} color={isRecording ? "#EF4444" : "#00D485"} />
      </div>

      {/* ── Main controls ── */}
      <div
        className="px-4 py-4 shrink-0"
        style={{ background: "rgba(8,8,18,0.95)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="flex justify-around items-center gap-4">
          {/* Cam toggle */}
          <button
            onClick={camOn ? stopCamera : startCamera}
            className="flex flex-col items-center gap-1.5 px-4 py-3 rounded-2xl transition-all"
            style={camOn
              ? { background: "rgba(0,212,133,0.15)", border: "1px solid rgba(0,212,133,0.3)", boxShadow: "0 0 16px rgba(0,212,133,0.15)" }
              : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }
            }
          >
            {camOn
              ? <Camera size={22} style={{ color: "#00D485" }} />
              : <CameraOff size={22} style={{ color: "rgba(255,255,255,0.4)" }} />}
            <span className="text-xs font-semibold" style={{ color: camOn ? "#00D485" : "rgba(255,255,255,0.4)" }}>
              {camOn ? "Cam On" : "Cam Off"}
            </span>
          </button>

          {/* REC button */}
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className="w-20 h-20 rounded-full flex items-center justify-center transition-all relative"
            style={{
              border: `3px solid ${isRecording ? "#EF4444" : "#00D485"}`,
              boxShadow: isRecording ? "0 0 30px rgba(239,68,68,0.5)" : "0 0 20px rgba(0,212,133,0.3)",
            }}
          >
            {isRecording && <div className="live-ring absolute inset-0 rounded-full" style={{ background: "#EF4444" }} />}
            <div
              className="transition-all relative z-10"
              style={isRecording
                ? { width: 28, height: 28, borderRadius: 6, background: "#EF4444" }
                : { width: 52, height: 52, borderRadius: "50%", background: "linear-gradient(135deg, #00D485, #00A86B)" }
              }
            />
          </button>

          {/* Go Live */}
          <button
            onClick={() => {
              if (!limit.canGoLive) { navigate("/account"); return; }
              setIsStreaming(!isStreaming);
            }}
            className="flex flex-col items-center gap-1.5 px-4 py-3 rounded-2xl transition-all"
            style={isStreaming
              ? { background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.35)", boxShadow: "0 0 16px rgba(239,68,68,0.2)" }
              : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }
            }
          >
            <Radio size={22} style={{
              color: isStreaming ? "#EF4444" : limit.canGoLive ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.25)"
            }} />
            <span className="text-xs font-semibold" style={{ color: isStreaming ? "#EF4444" : "rgba(255,255,255,0.4)" }}>
              {isStreaming ? "Stop Live" : !limit.canGoLive ? "🔒 Go Live" : "Go Live"}
            </span>
          </button>
        </div>

        {/* Time bar */}
        {remaining !== Infinity && (
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1.5" style={{ color: "rgba(255,255,255,0.3)" }}>
              <span>Daily time</span>
              <span style={{ color: "#00D485" }}>{fmt(remaining as number)} remaining</span>
            </div>
            <div className="rounded-full h-1.5 overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${Math.max(0, (1 - user.recordingSecondsUsedToday / (limit.dailyRecordingSeconds as number)) * 100)}%`,
                  background: "linear-gradient(90deg, #00D485, #7C5CF6)",
                  boxShadow: "0 0 8px rgba(0,212,133,0.5)",
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* ── Scrollable options ── */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">

        {/* Studio Options */}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] mb-3" style={{ color: "rgba(255,255,255,0.3)" }}>
            Studio Options
          </p>
          <div className="space-y-2">
            {[
              { label: "Microphone", icon: micOn ? Mic : MicOff, active: micOn, toggle: () => setMicOn(!micOn), locked: false, note: "" },
              {
                label: screenSharing ? "Stop Screen Share" : "Screen Share",
                icon: Monitor, active: screenSharing,
                toggle: screenSharing ? stopScreenShare : startScreenShare,
                locked: false,
                note: "Works in browser · Not available on all mobile browsers",
              },
              {
                label: "AI Enhancement", icon: Sparkles, active: aiOn,
                toggle: () => { if (!limit.aiFeatures) { navigate("/account"); return; } setAiOn(!aiOn); },
                locked: !limit.aiFeatures, note: "",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 p-3.5 rounded-2xl transition-all"
                style={{
                  background: item.active ? "rgba(0,212,133,0.06)" : "rgba(255,255,255,0.03)",
                  border: `1px solid ${item.active ? "rgba(0,212,133,0.2)" : "rgba(255,255,255,0.06)"}`,
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: item.active ? "rgba(0,212,133,0.15)" : "rgba(255,255,255,0.06)" }}
                >
                  <item.icon size={18} style={{ color: item.active ? "#00D485" : "rgba(255,255,255,0.5)" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm">{item.label}</p>
                  {item.note && <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.25)" }}>{item.note}</p>}
                </div>
                {item.locked ? (
                  <button
                    onClick={() => navigate("/account")}
                    className="text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1 transition-all hover:opacity-80"
                    style={{ background: "rgba(124,92,246,0.15)", color: "#7C5CF6", border: "1px solid rgba(124,92,246,0.25)" }}
                  >
                    <Lock size={10} /> Pro
                  </button>
                ) : (
                  <button
                    onClick={item.toggle}
                    className="w-12 h-6 rounded-full relative transition-all shrink-0"
                    style={{ background: item.active ? "#00D485" : "rgba(255,255,255,0.1)", boxShadow: item.active ? "0 0 10px rgba(0,212,133,0.4)" : "none" }}
                  >
                    <div
                      className="w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all shadow-sm"
                      style={{ [item.active ? "right" : "left"]: 2 }}
                    />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Skin selector */}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] mb-3" style={{ color: "rgba(255,255,255,0.3)" }}>
            Active Skin
          </p>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSelectedSkin(null)}
              className="w-14 h-14 rounded-xl border-2 flex flex-col items-center justify-center transition-all"
              style={!selectedSkinId
                ? { background: "rgba(0,212,133,0.1)", borderColor: "#00D485", boxShadow: "0 0 12px rgba(0,212,133,0.2)" }
                : { background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.1)" }
              }
            >
              <X size={14} style={{ color: !selectedSkinId ? "#00D485" : "rgba(255,255,255,0.3)" }} />
              <span className="text-xs mt-0.5" style={{ color: !selectedSkinId ? "#00D485" : "rgba(255,255,255,0.3)" }}>None</span>
            </button>
            {ALL_SKINS.filter((s) => !s.isPremium || user.unlockedSkins.includes(s.id)).slice(0, 8).map((skin) => (
              <button
                key={skin.id}
                onClick={() => setSelectedSkin(skin.id)}
                className="w-14 h-14 rounded-xl border-2 flex items-center justify-center text-white text-xs font-bold text-center leading-tight p-1 transition-all"
                style={{
                  backgroundColor: skin.colors[0] + "CC",
                  borderColor: selectedSkinId === skin.id ? "#00D485" : "rgba(255,255,255,0.12)",
                  boxShadow: selectedSkinId === skin.id ? "0 0 12px rgba(0,212,133,0.3)" : "none",
                }}
              >
                {skin.name}
              </button>
            ))}
            <button
              onClick={() => navigate("/editor")}
              className="w-14 h-14 rounded-xl border-2 border-dashed flex flex-col items-center justify-center text-xs transition-all hover:opacity-80"
              style={{ borderColor: "rgba(0,212,133,0.25)", color: "#00D485" }}
            >
              + More
            </button>
          </div>
        </div>

        {/* Stickers */}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] mb-1" style={{ color: "rgba(255,255,255,0.3)" }}>
            Stickers
          </p>
          <p className="text-xs mb-3" style={{ color: "rgba(255,255,255,0.25)" }}>Tap to add / remove overlays</p>

          <p className="text-xs font-bold mb-2 uppercase tracking-wider" style={{ color: "#00D485" }}>Free</p>
          <div className="grid grid-cols-4 gap-2 mb-4">
            {freeStickers.map((s) => {
              const active = activeStickers.includes(s.id);
              return (
                <button
                  key={s.id}
                  onClick={() => toggleSticker(s.id)}
                  className="rounded-2xl p-2 flex flex-col items-center gap-1 border-2 transition-all card-lift"
                  style={active
                    ? { borderColor: "#00D485", background: "rgba(0,212,133,0.1)", boxShadow: "0 0 12px rgba(0,212,133,0.15)" }
                    : { borderColor: "rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.03)" }
                  }
                >
                  <s.Component size={36}/>
                  <span className="text-white text-xs font-semibold">{s.label}</span>
                  {active && <span className="text-xs font-bold" style={{ color: "#00D485" }}>ON</span>}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 mb-2">
            <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "#F59E0B" }}>Premium</p>
            {user.tier === "free" && (
              <button
                onClick={() => navigate("/account")}
                className="ml-auto text-xs font-bold px-2.5 py-0.5 rounded-full transition-all hover:opacity-80"
                style={{ background: "rgba(245,158,11,0.12)", color: "#F59E0B", border: "1px solid rgba(245,158,11,0.2)" }}
              >
                Upgrade to Unlock
              </button>
            )}
          </div>
          <div className="grid grid-cols-4 gap-2">
            {paidStickers.map((s) => {
              const unlocked = isStickerUnlocked(s);
              const active   = activeStickers.includes(s.id);
              return (
                <button
                  key={s.id}
                  onClick={() => unlocked ? toggleSticker(s.id) : navigate("/account")}
                  className="relative rounded-2xl p-2 flex flex-col items-center gap-1 border-2 transition-all card-lift"
                  style={{
                    borderColor: active && unlocked ? "#00D485" : unlocked ? "rgba(255,255,255,0.07)" : "rgba(245,158,11,0.2)",
                    background: active && unlocked ? "rgba(0,212,133,0.1)" : unlocked ? "rgba(255,255,255,0.03)" : "rgba(245,158,11,0.04)",
                    cursor: unlocked ? "pointer" : "default",
                  }}
                >
                  <s.Component size={36}/>
                  <span className="text-white text-xs font-semibold text-center leading-tight">{s.label}</span>
                  {active && unlocked && <span className="text-xs font-bold" style={{ color: "#00D485" }}>ON</span>}
                  {/* Small lock badge — sticker fully visible */}
                  {!unlocked && (
                    <div
                      className="absolute top-1 right-1 px-1.5 py-0.5 rounded-full flex items-center gap-0.5"
                      style={{ background: "rgba(245,158,11,0.9)", boxShadow: "0 0 6px rgba(245,158,11,0.4)" }}
                    >
                      <Lock size={7} className="text-white"/>
                      <span className="text-white leading-none capitalize" style={{ fontSize: "0.6rem", fontWeight: 700 }}>
                        {s.unlocksAt}
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
