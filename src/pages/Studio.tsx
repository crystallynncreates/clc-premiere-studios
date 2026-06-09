import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, CameraOff, Mic, MicOff, Radio, Monitor, Sparkles, Shield, RotateCcw, X } from "lucide-react";
import { useStore } from "../store/useStore";
import { TIER_LIMITS } from "../types";
import { ALL_SKINS } from "../data/skins";

export default function StudioPage() {
  const navigate = useNavigate();
  const { user, isRecording, isStreaming, setIsRecording, setIsStreaming, addRecordingSeconds, selectedSkinId, setSelectedSkin } = useStore();
  const [timer, setTimer] = useState(0);
  const [camOn, setCamOn] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [aiOn, setAiOn] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const limit = TIER_LIMITS[user.tier];
  const remaining = limit.dailyRecordingSeconds === Infinity ? Infinity : Math.max(0, limit.dailyRecordingSeconds - user.recordingSecondsUsedToday);
  const currentSkin = ALL_SKINS.find((s) => s.id === selectedSkinId);

  const startCamera = async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(s);
      if (videoRef.current) videoRef.current.srcObject = s;
      setCamOn(true);
    } catch { alert("Please allow camera and microphone access."); }
  };

  const stopCamera = () => {
    stream?.getTracks().forEach((t) => t.stop());
    setStream(null);
    setCamOn(false);
    stopRecording();
  };

  const startRecording = () => {
    if (remaining === 0) { alert("Daily limit reached. Upgrade for more time."); return; }
    if (!camOn) { alert("Please turn on your camera first."); return; }
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

  useEffect(() => () => { stream?.getTracks().forEach((t) => t.stop()); if (timerRef.current) clearInterval(timerRef.current); }, []);

  const fmt = (s: number) => `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;

  return (
    <div className="flex flex-col h-full bg-gray-900">
      {/* Camera preview */}
      <div className="relative bg-black flex-1 min-h-64 max-h-96 flex items-center justify-center">
        {camOn ? (
          <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
        ) : (
          <div className="flex flex-col items-center gap-3">
            <Camera size={60} className="text-gray-600" />
            <p className="text-gray-400">Camera is off</p>
            <button onClick={startCamera} className="bg-jade-500 text-white px-5 py-2 rounded-xl font-bold hover:bg-jade-600 transition-colors">Enable Camera</button>
          </div>
        )}
        {/* Overlays */}
        {isRecording && (
          <div className="absolute top-3 left-3 flex items-center gap-2 bg-red-600 px-3 py-1 rounded-full animate-pulse">
            <div className="w-2 h-2 bg-white rounded-full" />
            <span className="text-white text-sm font-bold">REC {fmt(timer)}</span>
          </div>
        )}
        {isStreaming && (
          <div className="absolute top-3 left-3 flex items-center gap-2 bg-red-600 px-3 py-1 rounded-full animate-pulse">
            <div className="w-2 h-2 bg-white rounded-full" />
            <span className="text-white text-sm font-bold">LIVE</span>
          </div>
        )}
        {currentSkin && (
          <div className="absolute top-3 right-3 w-16 h-16 rounded-full border-2 border-white flex items-center justify-center text-center text-white text-xs font-bold"
            style={{ backgroundColor: currentSkin.colors[0] + "CC" }}>
            {currentSkin.name}
          </div>
        )}
        {aiOn && limit.aiFeatures && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-jade-600 px-2 py-1 rounded-full">
            <Sparkles size={12} className="text-yellow-300" />
            <span className="text-white text-xs">AI Enhanced</span>
          </div>
        )}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/60 px-2 py-1 rounded-full">
          <Shield size={12} className="text-green-400" />
          <span className="text-white text-xs">Protected</span>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-gray-800 px-4 py-4">
        <div className="flex justify-around items-center mb-4">
          <button onClick={camOn ? stopCamera : startCamera}
            className={`flex flex-col items-center gap-1 p-3 rounded-xl ${camOn ? "bg-jade-600" : "bg-gray-700"}`}>
            {camOn ? <Camera size={22} className="text-white" /> : <CameraOff size={22} className="text-gray-400" />}
            <span className="text-xs text-gray-300">{camOn ? "Cam On" : "Cam Off"}</span>
          </button>

          {/* Record button */}
          <button onClick={isRecording ? stopRecording : startRecording}
            className="w-20 h-20 rounded-full border-4 border-jade-400 flex items-center justify-center hover:border-jade-300 transition-colors">
            <div className={`transition-all ${isRecording ? "w-8 h-8 rounded-sm bg-red-500" : "w-14 h-14 rounded-full bg-jade-500 hover:bg-jade-400"}`} />
          </button>

          <button onClick={() => { if (!limit.aiFeatures) { navigate("/account"); return; } setIsStreaming(!isStreaming); }}
            className={`flex flex-col items-center gap-1 p-3 rounded-xl ${isStreaming ? "bg-red-600" : "bg-gray-700"}`}>
            <Radio size={22} className="text-white" />
            <span className="text-xs text-gray-300">{isStreaming ? "Stop Live" : "Go Live"}</span>
          </button>
        </div>

        {/* Time bar */}
        {remaining !== Infinity && (
          <div>
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Daily time</span>
              <span className="text-jade-400">{fmt(remaining as number)} remaining</span>
            </div>
            <div className="bg-gray-700 rounded-full h-2">
              <div className="bg-jade-500 h-2 rounded-full transition-all"
                style={{ width: `${Math.max(0,(1 - user.recordingSecondsUsedToday / (limit.dailyRecordingSeconds as number))*100)}%` }} />
            </div>
          </div>
        )}
      </div>

      {/* Options */}
      <div className="bg-gray-900 px-4 py-4 flex-1 overflow-y-auto">
        <h3 className="text-gray-300 font-bold mb-3">Studio Options</h3>
        <div className="space-y-2 mb-5">
          {[
            { label:"Mic", icon: micOn ? Mic : MicOff, active: micOn, toggle: () => setMicOn(!micOn), locked: false },
            { label:"Screen Share", icon: Monitor, active: false, toggle: () => {}, locked: false },
            { label:"AI Enhancement", icon: Sparkles, active: aiOn, toggle: () => { if(!limit.aiFeatures){navigate("/account");return;} setAiOn(!aiOn); }, locked: !limit.aiFeatures },
          ].map((item) => (
            <div key={item.label} className="bg-gray-800 rounded-xl p-3 flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                <item.icon size={18} className="text-jade-400" />
              </div>
              <span className="flex-1 text-white font-semibold">{item.label}</span>
              {item.locked ? (
                <button onClick={() => navigate("/account")} className="text-jade-400 text-xs font-bold border border-jade-700 px-2 py-1 rounded-lg">Upgrade</button>
              ) : (
                <button onClick={item.toggle}
                  className={`w-12 h-6 rounded-full relative transition-colors ${item.active ? "bg-jade-500" : "bg-gray-600"}`}>
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${item.active ? "right-0.5" : "left-0.5"}`} />
                </button>
              )}
            </div>
          ))}
        </div>

        <h3 className="text-gray-300 font-bold mb-3">Active Skin</h3>
        <div className="flex gap-2 flex-wrap">
          <button onClick={() => setSelectedSkin(null)}
            className={`w-14 h-14 rounded-xl border-2 flex flex-col items-center justify-center bg-gray-700 ${!selectedSkinId ? "border-jade-400" : "border-gray-600"}`}>
            <X size={16} className="text-gray-400" />
            <span className="text-gray-400 text-xs">None</span>
          </button>
          {ALL_SKINS.filter((s) => user.unlockedSkins.includes(s.id)).map((skin) => (
            <button key={skin.id} onClick={() => setSelectedSkin(skin.id)}
              className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center text-white text-xs font-bold text-center leading-tight p-1 ${selectedSkinId === skin.id ? "border-jade-400" : "border-gray-600"}`}
              style={{ backgroundColor: skin.colors[0] + "CC" }}>
              {skin.name}
            </button>
          ))}
          <button onClick={() => navigate("/skins")}
            className="w-14 h-14 rounded-xl border-2 border-dashed border-jade-700 flex flex-col items-center justify-center text-jade-400 text-xs">
            + More
          </button>
        </div>
      </div>
    </div>
  );
}
