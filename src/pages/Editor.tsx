import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Film, Plus, Sparkles, Music, Type, Wand2, Scissors, Zap, Upload, Palette, Play, Pause, Mic, MicOff, Lock, Check } from "lucide-react";
import { useStore } from "../store/useStore";
import { TIER_LIMITS } from "../types";
import { MUSIC_LIBRARY, GENRE_LABELS, formatDuration } from "../data/music";
import { ALL_CHAR_SKINS, FREE_SKINS, ANIME_PAID_SKINS, ARTIST_SKINS, STYLE_SKINS, MARVEL_DISNEY_SKINS } from "../data/characterSkins";
import { AVATAR_MAP } from "../components/CharacterAvatars";

const FILTERS = ["None","Vivid","Dreamy","Vintage","Chrome","Jade","Neon","Noir"];
const SPEEDS  = ["0.25x","0.5x","0.75x","1x","1.25x","1.5x","2x","3x"];
const TRANS   = ["Cut","Fade","Slide","Zoom","Spin","Glitch","Wipe","Blur"];
const EFFECTS = ["Noise Reduce","Stabilize","Color Grade","Face Smooth","Background Remove","Green Screen","Denoise","HDR"];
const TABS    = [
  {id:"clips",label:"Clips",icon:Film},
  {id:"upload",label:"Upload",icon:Upload},
  {id:"music",label:"Music",icon:Music},
  {id:"skins",label:"Skins",icon:Palette},
  {id:"audio",label:"Audio",icon:Wand2},
  {id:"text",label:"Text",icon:Type},
  {id:"effects",label:"Effects",icon:Wand2},
  {id:"transitions",label:"Transitions",icon:Scissors},
  {id:"ai",label:"AI Tools",icon:Sparkles},
];

// ─── Retro 80s/90s SVG Characters ─────────────────────────────────────────
function RetroAvatar({ colors, variant, size=100 }: { colors:string[]; variant:number; size?:number }) {
  const [c1,c2,c3] = colors;
  const s = size; const cx = s/2; const cy = s/2;
  const v = variant % 10;

  if (v === 0) return (
    <svg width={s} height={s} viewBox="0 0 100 100">
      <circle cx="50" cy="52" r="36" fill={c1}/>
      <ellipse cx="50" cy="24" rx="28" ry="14" fill={c3||"#8B4513"}/>
      <circle cx="38" cy="47" r="9" fill="white"/><circle cx="62" cy="47" r="9" fill="white"/>
      <circle cx="40" cy="47" r="5" fill="#1a1a1a"/><circle cx="64" cy="47" r="5" fill="#1a1a1a"/>
      <circle cx="41" cy="45" r="2" fill="white"/><circle cx="65" cy="45" r="2" fill="white"/>
      <ellipse cx="50" cy="61" rx="12" ry="8" fill="white"/><ellipse cx="50" cy="62" rx="8" ry="5" fill="#ff6b8a"/>
      <circle cx="34" cy="56" r="5" fill="#ffaabb" opacity=".5"/>
      <circle cx="66" cy="56" r="5" fill="#ffaabb" opacity=".5"/>
    </svg>
  );
  if (v === 1) return (
    <svg width={s} height={s} viewBox="0 0 100 100">
      <ellipse cx="50" cy="54" rx="34" ry="38" fill={c1}/>
      <path d="M22 34 Q50 8 78 34" fill={c3||"#4a2c0a"}/>
      <circle cx="37" cy="48" r="10" fill="white"/><circle cx="63" cy="48" r="10" fill="white"/>
      <circle cx="39" cy="49" r="6" fill={c2||"#4040c0"}/><circle cx="65" cy="49" r="6" fill={c2||"#4040c0"}/>
      <circle cx="40" cy="47" r="2.5" fill="white"/><circle cx="66" cy="47" r="2.5" fill="white"/>
      <rect x="44" y="62" width="6" height="9" rx="1" fill="white" stroke="#ddd" strokeWidth="0.5"/>
      <rect x="51" y="62" width="6" height="9" rx="1" fill="white" stroke="#ddd" strokeWidth="0.5"/>
      <circle cx="33" cy="58" r="6" fill="#ffccd5" opacity=".55"/>
      <circle cx="67" cy="58" r="6" fill="#ffccd5" opacity=".55"/>
    </svg>
  );
  if (v === 2) return (
    <svg width={s} height={s} viewBox="0 0 100 100">
      <rect x="18" y="25" width="64" height="62" rx="12" fill={c1}/>
      <rect x="20" y="15" width="60" height="25" rx="8" fill={c3||"#8B4513"}/>
      <circle cx="37" cy="50" r="9" fill="white"/><circle cx="63" cy="50" r="9" fill="white"/>
      <circle cx="38" cy="51" r="5" fill={c2||"#0000aa"}/><circle cx="64" cy="51" r="5" fill={c2||"#0000aa"}/>
      <circle cx="39" cy="49" r="2" fill="white"/><circle cx="65" cy="49" r="2" fill="white"/>
      <path d="M38 68 L50 76 L62 68" stroke="#333" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M36 42 Q50 38 64 42" stroke="#555" strokeWidth="2" fill="none"/>
    </svg>
  );
  if (v === 3) return (
    <svg width={s} height={s} viewBox="0 0 100 100">
      <circle cx="50" cy="52" r="34" fill={c1}/>
      <path d="M16 38 Q16 15 34 20 Q50 10 66 20 Q84 15 84 38" fill={c3||"#cc8844"}/>
      <ellipse cx="18" cy="52" rx="7" ry="14" fill={c3||"#cc8844"}/>
      <ellipse cx="82" cy="52" rx="7" ry="14" fill={c3||"#cc8844"}/>
      <circle cx="37" cy="47" r="9" fill="white"/><circle cx="63" cy="47" r="9" fill="white"/>
      <circle cx="38" cy="48" r="5" fill={c2||"#00aa00"}/><circle cx="64" cy="48" r="5" fill={c2||"#00aa00"}/>
      <circle cx="39" cy="46" r="2" fill="white"/><circle cx="65" cy="46" r="2" fill="white"/>
      <path d="M40 64 Q50 72 60 64" stroke="#cc4466" strokeWidth="2" fill="none" strokeLinecap="round"/>
      {[43,48,53,57,47].map((x,i)=><circle key={i} cx={x} cy={57+i%2*3} r="1.5" fill="#cc7755" opacity=".7"/>)}
    </svg>
  );
  if (v === 4) return (
    <svg width={s} height={s} viewBox="0 0 100 100">
      <rect x="20" y="28" width="60" height="58" rx="6" fill={c1}/>
      <rect x="28" y="18" width="44" height="20" rx="4" fill={c3||"#888"}/>
      <rect x="36" y="22" width="8" height="8" rx="2" fill="#aaf" opacity=".7"/>
      <rect x="38" y="46" width="12" height="12" rx="2" fill={c2||"#00ffcc"} opacity=".8"/>
      <rect x="54" y="46" width="12" height="12" rx="2" fill={c2||"#00ffcc"} opacity=".8"/>
      <rect x="35" y="65" width="30" height="8" rx="2" fill="#555"/>
      <rect x="37" y="67" width="6" height="4" rx="1" fill={c2||"#00ffcc"} opacity=".8"/>
      <rect x="45" y="67" width="6" height="4" rx="1" fill={c2||"#00ffcc"} opacity=".8"/>
      <rect x="53" y="67" width="6" height="4" rx="1" fill={c2||"#00ffcc"} opacity=".8"/>
    </svg>
  );
  if (v === 5) return (
    <svg width={s} height={s} viewBox="0 0 100 100">
      <circle cx="50" cy="54" r="33" fill={c1}/>
      <ellipse cx="17" cy="54" rx="12" ry="8" fill={c1}/><ellipse cx="83" cy="54" rx="12" ry="8" fill={c1}/>
      <path d="M22 28 Q50 5 78 28 Q78 18 50 14 Q22 18 22 28 Z" fill={c3||"#5d3c1a"}/>
      <circle cx="37" cy="50" r="9" fill="white"/><circle cx="63" cy="50" r="9" fill="white"/>
      <circle cx="38" cy="51" r="5" fill={c2||"#6600aa"}/><circle cx="64" cy="51" r="5" fill={c2||"#6600aa"}/>
      <circle cx="39" cy="49" r="2" fill="white"/><circle cx="65" cy="49" r="2" fill="white"/>
      <path d="M40 64 Q50 72 60 64" stroke="#aa3366" strokeWidth="2" fill="none" strokeLinecap="round"/>
    </svg>
  );
  if (v === 6) return (
    <svg width={s} height={s} viewBox="0 0 100 100">
      <ellipse cx="50" cy="55" rx="30" ry="32" fill={c1}/>
      <path d="M20 38 Q20 10 50 10 Q80 10 80 38" fill={c3||"#2c2c2c"}/>
      <circle cx="36" cy="48" r="10" fill="white"/><circle cx="64" cy="48" r="10" fill="white"/>
      <circle cx="37" cy="50" r="6" fill={c2||"#dd0000"}/><circle cx="65" cy="50" r="6" fill={c2||"#dd0000"}/>
      <circle cx="38" cy="48" r="2" fill="white"/><circle cx="66" cy="48" r="2" fill="white"/>
      <path d="M38 66 Q50 76 62 66" stroke="#aa2244" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    </svg>
  );
  if (v === 7) return (
    <svg width={s} height={s} viewBox="0 0 100 100">
      <circle cx="50" cy="52" r="35" fill={c1}/>
      <path d="M15 38 Q50 5 85 38 Q85 20 50 16 Q15 20 15 38Z" fill={c3||"#3d1a00"}/>
      <circle cx="36" cy="49" r="9" fill="white"/><circle cx="64" cy="49" r="9" fill="white"/>
      <circle cx="37" cy="51" r="5.5" fill={c2||"#006600"}/><circle cx="65" cy="51" r="5.5" fill={c2||"#006600"}/>
      <circle cx="38" cy="49" r="2" fill="white"/><circle cx="66" cy="49" r="2" fill="white"/>
      <path d="M42 66 Q50 70 58 66" stroke="#333" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <circle cx="30" cy="56" r="5" fill="#ffccbb" opacity=".5"/><circle cx="70" cy="56" r="5" fill="#ffccbb" opacity=".5"/>
    </svg>
  );
  if (v === 8) return (
    <svg width={s} height={s} viewBox="0 0 100 100">
      <ellipse cx="50" cy="53" rx="33" ry="35" fill={c1}/>
      <path d="M17 34 Q17 8 50 8 Q83 8 83 34" fill={c3||"#663300"}/>
      <ellipse cx="50" cy="20" rx="16" ry="8" fill={c3||"#663300"}/>
      <circle cx="37" cy="49" r="9" fill="white"/><circle cx="63" cy="49" r="9" fill="white"/>
      <circle cx="38" cy="51" r="5" fill={c2||"#0044aa"}/><circle cx="64" cy="51" r="5" fill={c2||"#0044aa"}/>
      <circle cx="39" cy="49" r="2" fill="white"/><circle cx="65" cy="49" r="2" fill="white"/>
      <ellipse cx="50" cy="65" rx="10" ry="7" fill="white"/><ellipse cx="50" cy="66" rx="7" ry="4.5" fill="#ee6688"/>
    </svg>
  );
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <ellipse cx="50" cy="55" rx="28" ry="33" fill={c1}/>
      <path d="M22 40 Q22 14 50 12 Q78 14 78 40 Q72 22 50 20 Q28 22 22 40Z" fill={c3||"#cc6600"}/>
      <path d="M72 28 Q90 22 88 50 Q82 32 74 36Z" fill={c3||"#cc6600"}/>
      <ellipse cx="37" cy="51" rx="10" ry="12" fill="white"/><ellipse cx="63" cy="51" rx="10" ry="12" fill="white"/>
      <ellipse cx="37" cy="53" rx="6.5" ry="8.5" fill={c2||"#006688"}/><ellipse cx="63" cy="53" rx="6.5" ry="8.5" fill={c2||"#006688"}/>
      <ellipse cx="36" cy="52" rx="3" ry="4" fill="#111"/><ellipse cx="62" cy="52" rx="3" ry="4" fill="#111"/>
      <circle cx="34" cy="50" r="2" fill="white"/><circle cx="60" cy="50" r="2" fill="white"/>
      <path d="M42 67 Q50 74 58 67" stroke="#cc3355" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <circle cx="31" cy="61" r="5" fill="#ffccbb" opacity=".55"/><circle cx="69" cy="61" r="5" fill="#ffccbb" opacity=".55"/>
    </svg>
  );
}

// ─── Music Tab (embedded) ──────────────────────────────────────────────────
const GENRES = ["all","pop","country","rap","rnb"] as const;

const BILLBOARD_SONGS = [
  { id:"bb-p1", title:"Espresso",               artist:"Sabrina Carpenter",          genre:"pop",    peak:1  },
  { id:"bb-p2", title:"Die With A Smile",        artist:"Lady Gaga & Bruno Mars",     genre:"pop",    peak:1  },
  { id:"bb-p3", title:"Please Please Please",    artist:"Sabrina Carpenter",          genre:"pop",    peak:2  },
  { id:"bb-p4", title:"APT.",                    artist:"ROSÉ & Bruno Mars",          genre:"pop",    peak:1  },
  { id:"bb-p5", title:"Beautiful Things",        artist:"Benson Boone",               genre:"pop",    peak:2  },
  { id:"bb-c1", title:"I Had Some Help",         artist:"Post Malone ft. Morgan Wallen", genre:"country", peak:1 },
  { id:"bb-c2", title:"White Horse",             artist:"Chris Stapleton",            genre:"country", peak:2  },
  { id:"bb-c3", title:"Save Me",                 artist:"Jelly Roll",                 genre:"country", peak:4  },
  { id:"bb-c4", title:"Miles On It",             artist:"Kane Brown & Marshmello",    genre:"country", peak:5  },
  { id:"bb-c5", title:"Cowgirls",                artist:"Morgan Wallen",              genre:"country", peak:3  },
  { id:"bb-r1", title:"Not Like Us",             artist:"Kendrick Lamar",             genre:"rap",    peak:1  },
  { id:"bb-r2", title:"Like That",               artist:"Future, Metro Boomin & Kendrick Lamar", genre:"rap", peak:1 },
  { id:"bb-r3", title:"CARNIVAL",                artist:"¥$, Kanye West & Ty Dolla $ign", genre:"rap", peak:2 },
  { id:"bb-r4", title:"Wanna Be",                artist:"GloRilla & Megan Thee Stallion", genre:"rap", peak:3 },
  { id:"bb-r5", title:"Neon Signs",              artist:"Morgan Wallen",              genre:"rap",    peak:6  },
  { id:"bb-b1", title:"Saturn",                  artist:"SZA",                        genre:"rnb",    peak:2  },
  { id:"bb-b2", title:"On My Mama",              artist:"Victoria Monét",             genre:"rnb",    peak:5  },
  { id:"bb-b3", title:"Snooze",                  artist:"SZA",                        genre:"rnb",    peak:6  },
  { id:"bb-b4", title:"Here With Me",            artist:"d4vd",                       genre:"rnb",    peak:8  },
  { id:"bb-b5", title:"Lose Control",            artist:"Teddy Swims",                genre:"rnb",    peak:1  },
] as const;

// ─── Web Audio sound effect synthesizer ──────────────────────────────────────
function playSoundFx(type: string) {
  const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();

  if (type === "clap") {
    for (let hit = 0; hit < 3; hit++) {
      const buf = ctx.createBuffer(1, ctx.sampleRate * 0.08, ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = (Math.random()*2-1) * Math.pow(1 - i/d.length, 2.5);
      const src = ctx.createBufferSource();
      src.buffer = buf;
      const flt = ctx.createBiquadFilter();
      flt.type = "bandpass"; flt.frequency.value = 1100; flt.Q.value = 0.8;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.55, ctx.currentTime + hit*0.22);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + hit*0.22 + 0.15);
      src.connect(flt); flt.connect(g); g.connect(ctx.destination);
      src.start(ctx.currentTime + hit * 0.22);
    }
  }

  if (type === "oh") {
    const osc = ctx.createOscillator();
    const g   = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(520, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(360, ctx.currentTime + 1.2);
    g.gain.setValueAtTime(0, ctx.currentTime);
    g.gain.linearRampToValueAtTime(0.38, ctx.currentTime + 0.12);
    g.gain.linearRampToValueAtTime(0.32, ctx.currentTime + 0.8);
    g.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.4);
    const osc2 = ctx.createOscillator();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(516, ctx.currentTime);
    osc2.frequency.linearRampToValueAtTime(356, ctx.currentTime + 1.2);
    const g2 = ctx.createGain(); g2.gain.value = 0.18;
    osc2.connect(g2); g2.connect(ctx.destination);
    osc2.start(); osc2.stop(ctx.currentTime + 1.5);
    osc.connect(g); g.connect(ctx.destination);
    osc.start(); osc.stop(ctx.currentTime + 1.5);
  }

  if (type === "ah") {
    const osc = ctx.createOscillator();
    const g   = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(380, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(620, ctx.currentTime + 0.7);
    osc.frequency.linearRampToValueAtTime(580, ctx.currentTime + 1.3);
    g.gain.setValueAtTime(0, ctx.currentTime);
    g.gain.linearRampToValueAtTime(0.42, ctx.currentTime + 0.08);
    g.gain.linearRampToValueAtTime(0.36, ctx.currentTime + 0.9);
    g.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5);
    const dist = ctx.createWaveShaper();
    const curve = new Float32Array(256);
    for (let i=0;i<256;i++) curve[i] = ((i/128)-1)*0.3;
    dist.curve = curve;
    osc.connect(dist); dist.connect(g); g.connect(ctx.destination);
    osc.start(); osc.stop(ctx.currentTime + 1.6);
  }

  if (type === "drumroll") {
    for (let i=0;i<18;i++) {
      const buf = ctx.createBuffer(1, ctx.sampleRate*0.04, ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let j=0;j<d.length;j++) d[j] = (Math.random()*2-1)*Math.pow(1-j/d.length,1.8);
      const src = ctx.createBufferSource(); src.buffer = buf;
      const g = ctx.createGain();
      g.gain.value = 0.3 + (i/18)*0.4;
      src.connect(g); g.connect(ctx.destination);
      src.start(ctx.currentTime + i*0.055);
    }
  }

  if (type === "ding") {
    const osc = ctx.createOscillator();
    const g   = ctx.createGain();
    osc.type = "sine"; osc.frequency.value = 1760;
    g.gain.setValueAtTime(0.5, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
    osc.connect(g); g.connect(ctx.destination);
    osc.start(); osc.stop(ctx.currentTime + 1.3);
  }

  if (type === "laugh") {
    for (let i=0;i<5;i++) {
      const osc = ctx.createOscillator();
      const g   = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.value = 220 + Math.random()*80;
      g.gain.setValueAtTime(0, ctx.currentTime + i*0.18);
      g.gain.linearRampToValueAtTime(0.25, ctx.currentTime + i*0.18 + 0.04);
      g.gain.linearRampToValueAtTime(0, ctx.currentTime + i*0.18 + 0.14);
      const flt = ctx.createBiquadFilter(); flt.type="lowpass"; flt.frequency.value=800;
      osc.connect(flt); flt.connect(g); g.connect(ctx.destination);
      osc.start(ctx.currentTime + i*0.18);
      osc.stop(ctx.currentTime + i*0.18 + 0.18);
    }
  }

  if (type === "airhorn") {
    const osc = ctx.createOscillator();
    const g   = ctx.createGain();
    osc.type = "sawtooth"; osc.frequency.value = 440;
    g.gain.setValueAtTime(0.5, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.9);
    const flt = ctx.createBiquadFilter(); flt.type="highpass"; flt.frequency.value=300;
    osc.connect(flt); flt.connect(g); g.connect(ctx.destination);
    osc.start(); osc.stop(ctx.currentTime + 1.0);
  }

  if (type === "woosh") {
    const buf = ctx.createBuffer(1, ctx.sampleRate*0.5, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i=0;i<d.length;i++) d[i] = (Math.random()*2-1)*Math.sin(Math.PI*i/d.length);
    const src = ctx.createBufferSource(); src.buffer = buf;
    const flt = ctx.createBiquadFilter(); flt.type="bandpass"; flt.frequency.value=800; flt.Q.value=0.5;
    const g = ctx.createGain(); g.gain.value=0.4;
    src.connect(flt); flt.connect(g); g.connect(ctx.destination);
    src.start();
  }
}

const SOUND_FX = [
  { id:"clap",     label:"👏 Clapping",    emoji:"👏", free:true,  desc:"Crowd applause"     },
  { id:"oh",       label:"😮 Ohhh!",       emoji:"😮", free:true,  desc:"Crowd reaction"     },
  { id:"ah",       label:"🎉 Ahhhh!",      emoji:"🎉", free:true,  desc:"Crowd cheer"        },
  { id:"drumroll", label:"🥁 Drum Roll",   emoji:"🥁", free:false, desc:"Build up drum roll" },
  { id:"ding",     label:"🔔 Bell Ding",   emoji:"🔔", free:false, desc:"Notification chime" },
  { id:"laugh",    label:"😂 Laugh Track", emoji:"😂", free:false, desc:"Studio laugh track" },
  { id:"airhorn",  label:"📯 Air Horn",    emoji:"📯", free:false, desc:"Hype air horn"      },
  { id:"woosh",    label:"💨 Woosh",       emoji:"💨", free:false, desc:"Transition woosh"   },
];

interface TierLimitShape { dailyRecordingSeconds:number; scheduledPosts:number; newSkinsPerMonth:number; aiFeatures:boolean; }

function MusicTab({ limit, navigateToAccount }: { limit: TierLimitShape; navigateToAccount:()=>void }) {
  const { user, aiProcessing, setAiProcessing } = useStore();
  const [musicSubTab, setMusicSubTab] = useState<"library"|"sfx"|"billboard"|"ai">("library");
  const [genre, setGenre] = useState<typeof GENRES[number]>("all");
  const [bbGenre, setBbGenre] = useState<"pop"|"country"|"rap"|"rnb">("pop");
  const [playingId, setPlayingId] = useState<string|null>(null);
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("pop");
  const [voiceRec, setVoiceRec] = useState(false);
  const [result, setResult] = useState<string|null>(null);
  const [selectedArtist, setSelectedArtist] = useState<string|null>(null);
  const [voiceBlendRec, setVoiceBlendRec] = useState(false);
  const [blendResult, setBlendResult] = useState<string|null>(null);
  const audioRef = useRef<HTMLAudioElement|null>(null);

  const VOICE_ARTISTS = [
    { name:"Ariana Grande", genre:"Pop",        emoji:"🎤" },
    { name:"Beyoncé",       genre:"R&B/Pop",    emoji:"👑" },
    { name:"Garth Brooks",  genre:"Country",    emoji:"🤠" },
    { name:"Fantasia",      genre:"Soul/R&B",   emoji:"🌟" },
    { name:"Patti LaBelle", genre:"Gospel/Soul",emoji:"✨" },
    { name:"Aretha Franklin",genre:"Soul/Gospel",emoji:"🎵" },
    { name:"Rihanna",       genre:"Pop/R&B",    emoji:"💎" },
    { name:"Trey Songz",    genre:"R&B",        emoji:"🎶" },
  ];

  const tracks = genre==="all" ? MUSIC_LIBRARY : MUSIC_LIBRARY.filter((t)=>t.genre===genre);
  const bbTracks = BILLBOARD_SONGS.filter((t) => t.genre === bbGenre);

  const handlePlay = (id: string, url: string) => {
    if (playingId === id) {
      audioRef.current?.pause();
      setPlayingId(null);
    } else {
      if (audioRef.current) { audioRef.current.pause(); audioRef.current.src = ""; }
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.play().catch(()=>alert("Tap play again — browser needs a gesture first."));
      audio.onended = () => setPlayingId(null);
      setPlayingId(id);
    }
  };

  useEffect(() => { return () => { audioRef.current?.pause(); }; }, []);

  const generate = () => {
    if (!limit.aiFeatures) { navigateToAccount(); return; }
    if (!prompt && !voiceRec) { alert("Add a description or record your voice first."); return; }
    setAiProcessing(true);
    setTimeout(()=>{ setAiProcessing(false); setResult(`"${prompt||"Voice Creation"}" — ${style} style`); },3000);
  };

  const GENRE_COLORS: Record<string,string> = { pop:"#EC4899", country:"#F59E0B", rap:"#8B5CF6", rnb:"#06B6D4" };
  const GENRE_ICONS:  Record<string,string> = { pop:"🎤", country:"🤠", rap:"🎧", rnb:"🎵" };

  const subTabStyle = (active: boolean) => ({
    background: active ? "linear-gradient(135deg, #00D485, #4ade8e)" : "rgba(255,255,255,0.04)",
    color: active ? "#000" : "rgba(255,255,255,0.45)",
    border: active ? "none" : "1px solid rgba(255,255,255,0.08)",
    fontWeight: 700,
    borderRadius: 12,
    padding: "8px 4px",
    fontSize: 11,
    cursor: "pointer",
    transition: "all 0.2s",
  });

  return (
    <div className="space-y-3">
      {/* Sub-tab bar */}
      <div className="grid grid-cols-4 gap-1.5">
        {([["library","🎵 Library"],["sfx","🔊 FX"],["billboard","🏆 Charts"],["ai","🤖 AI"]] as const).map(([t,label])=>(
          <button key={t} onClick={()=>setMusicSubTab(t)} style={subTabStyle(musicSubTab===t)}>{label}</button>
        ))}
      </div>

      {/* ── Library tab ── */}
      {musicSubTab==="library" && (
        <>
          <div className="flex gap-1.5 flex-wrap">
            {GENRES.map((g)=>(
              <button key={g} onClick={()=>setGenre(g)}
                className="px-3 py-1 rounded-full text-xs font-semibold transition-all"
                style={{
                  background: genre===g ? "linear-gradient(135deg,#00D485,#4ade8e)" : "rgba(255,255,255,0.05)",
                  color: genre===g ? "#000" : "rgba(255,255,255,0.5)",
                  border: genre===g ? "none" : "1px solid rgba(255,255,255,0.1)",
                }}>
                {g==="all"?"All":GENRE_LABELS[g]}
              </button>
            ))}
          </div>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>Royalty-free tracks — tap to play/pause</p>
          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {tracks.map((t)=>{
              const isPlaying = playingId===t.id;
              return (
                <div key={t.id} onClick={()=>handlePlay(t.id, t.url)}
                  className="rounded-xl p-3 cursor-pointer flex items-center gap-3 card-lift"
                  style={{
                    background: isPlaying ? "rgba(0,212,133,0.12)" : "rgba(255,255,255,0.04)",
                    border: isPlaying ? "1px solid rgba(0,212,133,0.35)" : "1px solid rgba(255,255,255,0.07)",
                    transition: "all 0.2s",
                  }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: isPlaying ? "#00D485" : "rgba(255,255,255,0.08)" }}>
                    {isPlaying ? <Pause size={16} className="text-black"/> : <Play size={16} style={{ color: "rgba(255,255,255,0.6)" }}/>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm truncate text-white">{t.title}</p>
                    <p className="text-xs truncate" style={{ color: "rgba(255,255,255,0.4)" }}>{GENRE_LABELS[t.genre]} · {formatDuration(t.duration)} · {t.bpm} BPM</p>
                  </div>
                  {isPlaying && (
                    <div className="flex items-end gap-0.5 h-6 w-12 shrink-0">
                      {(t.waveform?.slice(0,10) ?? Array(10).fill(0.5)).map((h,i)=>(
                        <div key={i} className="flex-1 rounded-full wave-bar"
                          style={{ height:`${(h as number)*100}%`, background:"#00D485", "--dur":"0.6s", "--delay":`${i*0.06}s` } as React.CSSProperties}/>
                      ))}
                    </div>
                  )}
                  <button className="shrink-0 transition-colors" style={{ color: "#00D485" }}
                    onClick={(e)=>{e.stopPropagation();alert(`"${t.title}" added to timeline!`)}}><Plus size={18}/></button>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* ── Sound FX tab ── */}
      {musicSubTab==="sfx" && (
        <div className="space-y-3">
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>Tap any sound to preview it instantly</p>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#00D485" }}>✨ Free Sound Effects</p>
            <div className="space-y-2">
              {SOUND_FX.filter(s=>s.free).map((s)=>(
                <div key={s.id} className="rounded-xl p-3 flex items-center gap-3 card-lift"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <button onClick={()=>playSoundFx(s.id)}
                    className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-all"
                    style={{ background: "linear-gradient(135deg,#00D485,#4ade8e)", boxShadow: "0 0 14px rgba(0,212,133,0.35)" }}>
                    <Play size={18} className="text-black"/>
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-bold text-sm">{s.label}</p>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{s.desc}</p>
                  </div>
                  <button onClick={()=>alert(`${s.label} added to timeline!`)} style={{ color: "#00D485" }}><Plus size={18}/></button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "#F59E0B" }}>🔒 Premium Sound Effects</p>
              {!limit.aiFeatures && (
                <button onClick={navigateToAccount}
                  className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ background: "rgba(0,212,133,0.15)", color: "#00D485", border: "1px solid rgba(0,212,133,0.3)" }}>
                  Upgrade
                </button>
              )}
            </div>
            <div className="space-y-2">
              {SOUND_FX.filter(s=>!s.free).map((s)=>(
                <div key={s.id} className="rounded-xl p-3 flex items-center gap-3 card-lift"
                  style={{
                    background: limit.aiFeatures ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.2)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    opacity: limit.aiFeatures ? 1 : 0.65,
                  }}>
                  <button onClick={()=>{ if(!limit.aiFeatures){navigateToAccount();return;} playSoundFx(s.id); }}
                    className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-all"
                    style={{
                      background: limit.aiFeatures ? "linear-gradient(135deg,#00D485,#4ade8e)" : "rgba(255,255,255,0.06)",
                      boxShadow: limit.aiFeatures ? "0 0 14px rgba(0,212,133,0.35)" : "none",
                    }}>
                    {limit.aiFeatures ? <Play size={18} className="text-black"/> : <Lock size={16} style={{ color: "#00D485" }}/>}
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className={`font-bold text-sm ${limit.aiFeatures?"text-white":"text-gray-400"}`}>{s.label}</p>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>{s.desc}</p>
                  </div>
                  {limit.aiFeatures
                    ? <button onClick={()=>alert(`${s.label} added to timeline!`)} style={{ color: "#00D485" }}><Plus size={18}/></button>
                    : <span className="text-xs font-bold" style={{ color: "#00D485" }}>Basic+</span>
                  }
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Billboard Charts tab ── */}
      {musicSubTab==="billboard" && (
        <div className="space-y-3">
          <div className="grid grid-cols-4 gap-1.5">
            {(["pop","country","rap","rnb"] as const).map((g)=>(
              <button key={g} onClick={()=>setBbGenre(g)}
                className="py-2 rounded-xl text-xs font-bold transition-all"
                style={{
                  background: bbGenre===g ? GENRE_COLORS[g] : "rgba(255,255,255,0.04)",
                  color: bbGenre===g ? "#fff" : "rgba(255,255,255,0.45)",
                  border: bbGenre===g ? "none" : "1px solid rgba(255,255,255,0.08)",
                }}>
                {GENRE_ICONS[g]} {g==="rnb"?"R&B":g.charAt(0).toUpperCase()+g.slice(1)}
              </button>
            ))}
          </div>

          <div className="rounded-xl p-3 flex gap-2"
            style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.25)" }}>
            <span className="text-lg shrink-0">⚠️</span>
            <div>
              <p className="text-xs font-bold" style={{ color: "#F59E0B" }}>Licensed Music Required</p>
              <p className="text-xs mt-0.5" style={{ color: "rgba(245,158,11,0.65)" }}>These Billboard chart songs require a streaming license. Upgrade to Pro to request licensing.</p>
            </div>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {bbTracks.map((t)=>{
              const canAccess = user.tier === "pro";
              return (
                <div key={t.id} className="rounded-xl p-3 flex items-center gap-3 card-lift"
                  style={{
                    background: canAccess ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-bold text-xs"
                    style={{ background: GENRE_COLORS[t.genre]+"22", color: GENRE_COLORS[t.genre] }}>
                    #{t.peak}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-bold text-sm truncate ${canAccess?"text-white":"text-gray-400"}`}>{t.title}</p>
                    <p className="text-xs truncate" style={{ color: "rgba(255,255,255,0.35)" }}>{t.artist}</p>
                  </div>
                  {canAccess ? (
                    <button onClick={()=>alert(`License requested for "${t.title}". Our team will process within 24hrs.`)}
                      className="shrink-0 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                      style={{ background: "#00D485", color: "#000" }}>
                      License
                    </button>
                  ) : (
                    <div className="shrink-0 flex items-center gap-1">
                      <Lock size={13} style={{ color: "#00D485" }}/>
                      <button onClick={navigateToAccount} className="text-xs font-bold" style={{ color: "#00D485" }}>Pro</button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {!limit.aiFeatures && (
            <button onClick={navigateToAccount}
              className="w-full py-3 rounded-xl font-bold text-sm transition-all"
              style={{ background: "linear-gradient(135deg,#00D485,#4ade8e)", color: "#000" }}>
              Upgrade to Pro — Unlock Chart Music Licensing
            </button>
          )}
        </div>
      )}

      {/* ── AI Creator tab ── */}
      {musicSubTab==="ai" && (
        <div className="rounded-2xl p-4 space-y-3"
          style={{
            background: limit.aiFeatures ? "rgba(0,212,133,0.06)" : "rgba(255,255,255,0.03)",
            border: limit.aiFeatures ? "1px solid rgba(0,212,133,0.2)" : "1px solid rgba(255,255,255,0.07)",
          }}>
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-yellow-400"/>
            <h3 className="text-white font-bold">AI Music Creator</h3>
            {!limit.aiFeatures && (
              <button onClick={navigateToAccount}
                className="ml-auto text-xs font-bold px-3 py-1 rounded-full"
                style={{ background: "rgba(0,212,133,0.15)", color: "#00D485", border: "1px solid rgba(0,212,133,0.3)" }}>
                Upgrade
              </button>
            )}
          </div>
          <textarea
            className="w-full rounded-xl p-3 text-white text-sm resize-none outline-none transition-all"
            style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)" }}
            rows={2} placeholder="Describe your song..." value={prompt} onChange={(e)=>setPrompt(e.target.value)} disabled={!limit.aiFeatures}/>
          <div className="flex gap-2 flex-wrap">
            {["pop","country","rap","rnb","electronic","cinematic"].map((s)=>(
              <button key={s} onClick={()=>limit.aiFeatures&&setStyle(s)}
                className="px-2 py-1 rounded-full text-xs font-semibold capitalize transition-all"
                style={{
                  background: style===s ? "#00D485" : "rgba(255,255,255,0.05)",
                  color: style===s ? "#000" : "rgba(255,255,255,0.5)",
                }}>
                {s}
              </button>
            ))}
          </div>
          <button onClick={()=>limit.aiFeatures&&setVoiceRec(!voiceRec)}
            className="w-full rounded-xl p-3 flex items-center gap-2 transition-all"
            style={{
              background: voiceRec ? "rgba(0,212,133,0.08)" : "rgba(255,255,255,0.03)",
              border: `2px dashed ${voiceRec ? "#00D485" : "rgba(255,255,255,0.15)"}`,
            }}>
            {voiceRec ? <Mic size={20} style={{ color: "#00D485" }}/> : <MicOff size={20} style={{ color: "rgba(255,255,255,0.3)" }}/>}
            <span className="text-sm font-semibold" style={{ color: voiceRec ? "#00D485" : "rgba(255,255,255,0.4)" }}>
              {voiceRec?"Voice Recorded ✓":"Tap to record voice"}
            </span>
          </button>
          <button onClick={generate} disabled={aiProcessing}
            className="w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
            style={{
              background: aiProcessing ? "rgba(255,255,255,0.06)" : limit.aiFeatures ? "linear-gradient(135deg,#00D485,#4ade8e)" : "rgba(255,255,255,0.05)",
              color: aiProcessing ? "rgba(255,255,255,0.3)" : limit.aiFeatures ? "#000" : "rgba(255,255,255,0.3)",
            }}>
            <Sparkles size={16}/>{aiProcessing?"Creating...":limit.aiFeatures?"Create AI Song":"Upgrade to Use AI Music"}
          </button>
          {result && (
            <div className="rounded-xl p-3" style={{ background: "rgba(0,212,133,0.08)", border: "1px solid rgba(0,212,133,0.3)" }}>
              <p className="font-bold text-sm mb-2" style={{ color: "#4ade8e" }}>✅ AI Track Ready: {result}</p>
              <div className="flex gap-2">
                <button className="flex-1 font-bold py-2 rounded-xl text-sm transition-all"
                  style={{ background: "#00D485", color: "#000" }}>Add to Video</button>
                <button className="flex-1 font-bold py-2 rounded-xl text-sm transition-all"
                  style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.1)" }}>Save</button>
              </div>
            </div>
          )}

          {/* ── AI VOICE ARTIST BLEND ── */}
          <div className="pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="flex items-center gap-2 mb-2">
              <Mic size={18} className="text-pink-400"/>
              <h3 className="text-white font-bold">AI Voice Artist Blend</h3>
              {!limit.aiFeatures && (
                <button onClick={navigateToAccount}
                  className="ml-auto text-xs font-bold px-3 py-1 rounded-full"
                  style={{ background: "rgba(124,92,246,0.2)", color: "#7C5CF6", border: "1px solid rgba(124,92,246,0.35)" }}>
                  Pro Only
                </button>
              )}
            </div>
            <p className="text-xs mb-3" style={{ color: "rgba(255,255,255,0.35)" }}>
              Blend your voice with a top artist — creates a smooth, harmonious, uniquely different sound.
            </p>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {VOICE_ARTISTS.map((a) => (
                <button key={a.name}
                  onClick={() => { if (!limit.aiFeatures) { navigateToAccount(); return; } setSelectedArtist(a.name); }}
                  className="p-2.5 rounded-xl text-left transition-all"
                  style={{
                    background: selectedArtist===a.name ? "rgba(0,212,133,0.1)" : "rgba(255,255,255,0.03)",
                    border: selectedArtist===a.name ? "1px solid rgba(0,212,133,0.4)" : "1px solid rgba(255,255,255,0.07)",
                    boxShadow: selectedArtist===a.name ? "0 0 12px rgba(0,212,133,0.15)" : "none",
                  }}>
                  <p className="text-lg mb-0.5">{a.emoji}</p>
                  <p className="text-white text-xs font-bold leading-tight">{a.name}</p>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{a.genre}</p>
                </button>
              ))}
            </div>
            <button onClick={() => { if(!limit.aiFeatures) return; setVoiceBlendRec(!voiceBlendRec); }}
              className="w-full rounded-xl p-3 flex items-center gap-2 mb-3 transition-all"
              style={{
                background: voiceBlendRec ? "rgba(0,212,133,0.08)" : "rgba(255,255,255,0.03)",
                border: `2px dashed ${voiceBlendRec ? "#00D485" : "rgba(255,255,255,0.15)"}`,
              }}>
              {voiceBlendRec ? <Mic size={20} style={{ color: "#00D485" }}/> : <MicOff size={20} style={{ color: "rgba(255,255,255,0.3)" }}/>}
              <span className="text-sm font-semibold" style={{ color: voiceBlendRec ? "#00D485" : "rgba(255,255,255,0.4)" }}>
                {voiceBlendRec ? "Voice Captured ✓" : "Record your voice to blend"}
              </span>
            </button>
            <button
              onClick={() => {
                if (!limit.aiFeatures) { navigateToAccount(); return; }
                if (!selectedArtist) { alert("Select an artist to blend with."); return; }
                if (!voiceBlendRec) { alert("Record your voice first."); return; }
                setAiProcessing(true);
                setTimeout(() => {
                  setAiProcessing(false);
                  setBlendResult(`Your voice × ${selectedArtist} — smooth harmonious blend`);
                }, 3500);
              }}
              disabled={aiProcessing}
              className="w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
              style={{
                background: aiProcessing ? "rgba(255,255,255,0.06)" : limit.aiFeatures ? "linear-gradient(135deg,#7C5CF6,#a78bfa)" : "rgba(255,255,255,0.05)",
                color: aiProcessing ? "rgba(255,255,255,0.3)" : limit.aiFeatures ? "#fff" : "rgba(255,255,255,0.3)",
                boxShadow: (!aiProcessing && limit.aiFeatures) ? "0 0 20px rgba(124,92,246,0.3)" : "none",
              }}>
              <Sparkles size={16}/>{aiProcessing?"Blending voices...":limit.aiFeatures?"Create Voice Blend":"Upgrade to Pro"}
            </button>
            {blendResult && (
              <div className="mt-3 rounded-xl p-3" style={{ background: "rgba(124,92,246,0.1)", border: "1px solid rgba(124,92,246,0.3)" }}>
                <p className="font-bold text-sm mb-2" style={{ color: "#a78bfa" }}>✅ Voice Blend Ready: {blendResult}</p>
                <div className="flex gap-2">
                  <button className="flex-1 font-bold py-2 rounded-xl text-sm text-white transition-all"
                    style={{ background: "linear-gradient(135deg,#7C5CF6,#a78bfa)" }}>Add to Video</button>
                  <button className="flex-1 font-bold py-2 rounded-xl text-sm transition-all"
                    style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.1)" }}>Save Audio</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Skins Tab ────────────────────────────────────────────────────────────
function SkinsTab({ navigateToAccount }: { navigateToAccount:()=>void }) {
  const { user, selectedSkinId, setSelectedSkin } = useStore();
  const [skinTab, setSkinTab] = useState<"cartoon"|"anime"|"marvel"|"artists"|"styles">("cartoon");

  const SKIN_TABS = [
    { id: "cartoon" as const, label: "🎭 Cartoon",      skins: FREE_SKINS },
    { id: "anime"   as const, label: "⚡ Anime",         skins: ANIME_PAID_SKINS },
    { id: "marvel"  as const, label: "🦸 Marvel/Disney", skins: MARVEL_DISNEY_SKINS },
    { id: "artists" as const, label: "🎤 Artists",       skins: ARTIST_SKINS },
    { id: "styles"  as const, label: "🎬 Styles",        skins: STYLE_SKINS },
  ];

  // narrow the type so TypeScript accepts the id
  const activeSkins = SKIN_TABS.find((t) => (t.id as string) === skinTab)!.skins;
  const activeName  = ALL_CHAR_SKINS.find((s)=>s.id===selectedSkinId)?.name;

  const canUse = (tier: string) => {
    if (tier === "free")  return true;
    if (tier === "basic") return user.tier === "basic" || user.tier === "pro";
    return user.tier === "pro";
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-1.5">
        {SKIN_TABS.map((t)=>(
          <button key={t.id} onClick={()=>setSkinTab(t.id)}
            className="flex-1 py-2.5 rounded-xl font-bold text-xs transition-all"
            style={{
              background: skinTab===t.id ? "linear-gradient(135deg,#00D485,#4ade8e)" : "rgba(255,255,255,0.04)",
              color: skinTab===t.id ? "#000" : "rgba(255,255,255,0.45)",
              border: skinTab===t.id ? "none" : "1px solid rgba(255,255,255,0.08)",
            }}>
            {t.label}
          </button>
        ))}
      </div>

      {skinTab !== "cartoon" && (
        <div className="rounded-xl p-2 text-center"
          style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.25)" }}>
          <p className="text-xs font-semibold" style={{ color: "#F59E0B" }}>
            {skinTab === "anime"   ? "⚡ Basic+ unlocks Anime character frames"
            : skinTab === "marvel" ? "🦸 Pro plan · Marvel © Disney · Disney © Disney — commercial license required at launch"
            : skinTab === "artists"? "🎤 Basic+ unlocks Artist avatar frames"
            : "🎬 Basic+ unlocks Content Style overlays"}
          </p>
        </div>
      )}

      {selectedSkinId && activeName && (
        <div className="rounded-xl p-2 flex items-center gap-2"
          style={{ background: "rgba(0,212,133,0.08)", border: "1px solid rgba(0,212,133,0.25)" }}>
          <Check size={14} style={{ color: "#00D485" }}/>
          <span className="font-semibold text-xs" style={{ color: "#4ade8e" }}>Active: {activeName}</span>
          <button onClick={()=>setSelectedSkin(null)} className="ml-auto text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>Remove</button>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[480px] overflow-y-auto pr-1">
        {activeSkins.map((skin)=>{
          const StyleComp = AVATAR_MAP[skin.id];
          const unlocked = canUse(skin.tier);
          const active = selectedSkinId===skin.id;
          return (
            <button key={skin.id} onClick={()=>{
              if (!unlocked) { if(confirm(`Unlock "${skin.name}"?\nUpgrade to ${skin.tier} plan.`)) navigateToAccount(); return; }
              setSelectedSkin(active?null:skin.id);
            }}
              className="relative rounded-2xl overflow-hidden transition-all card-lift"
              style={{
                backgroundColor: skin.bg,
                border: active ? "2px solid #00D485" : "2px solid rgba(255,255,255,0.08)",
                boxShadow: active ? "0 0 20px rgba(0,212,133,0.3)" : "none",
              }}>
              <div className="h-32 flex items-center justify-center overflow-hidden" style={{ background: "rgba(0,0,0,0.2)" }}>
                {skin.imageUrl ? (
                  <img src={skin.imageUrl} alt={skin.name} className="h-full w-full object-contain p-1"
                    onError={(e)=>{
                      const t = e.currentTarget;
                      t.style.display = "none";
                      const fb = t.nextElementSibling as HTMLElement|null;
                      if (fb) fb.style.display = "flex";
                    }}
                  />
                ) : null}
                <div className="w-full h-full items-center justify-center text-5xl"
                  style={{ display: skin.imageUrl ? "none" : "flex" }}>
                  {StyleComp ? <StyleComp/> : <span>{skin.emoji}</span>}
                </div>
              </div>
              <div className="p-2 text-center" style={{ background: "rgba(0,0,0,0.5)" }}>
                <p className="text-white text-sm font-bold truncate">{skin.name}</p>
                <p className="text-xs truncate" style={{ color: "rgba(255,255,255,0.5)" }}>{skin.label}</p>
                {!unlocked && <span className="text-xs font-semibold capitalize" style={{ color: "#00D485" }}>🔒 {skin.tier}</span>}
              </div>
              {!unlocked && (
                <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl"
                  style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(2px)" }}>
                  <Lock size={26} style={{ color: "#00D485" }}/>
                  <span className="text-xs mt-1 font-bold capitalize" style={{ color: "#4ade8e" }}>{skin.tier} Plan</span>
                  <span className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>Tap to upgrade</span>
                </div>
              )}
              {active && (
                <div className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ background: "#00D485", boxShadow: "0 0 10px rgba(0,212,133,0.6)" }}>
                  <Check size={14} className="text-black"/>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Animated waveform for preview area ──────────────────────────────────
function PreviewWaveform() {
  return (
    <div className="flex items-end gap-0.5 h-8 w-20">
      {Array.from({length:14}).map((_,i)=>(
        <div key={i} className="flex-1 rounded-full wave-bar"
          style={{
            minHeight: 3,
            background: "linear-gradient(to top, #00D485, #7C5CF6)",
            "--dur": `${0.5+Math.random()*0.6}s`,
            "--delay": `${i*0.06}s`,
          } as React.CSSProperties}/>
      ))}
    </div>
  );
}

// ─── Main Editor ──────────────────────────────────────────────────────────
interface Clip { id:string; label:string; duration:number; color:string; type:"clip"|"upload"; }

export default function EditorPage() {
  const navigate = useNavigate();
  const { user, projects, aiProcessing, setAiProcessing, addProject } = useStore();
  const [tab, setTab] = useState("clips");
  const [clips, setClips] = useState<Clip[]>([]);
  const [filter, setFilter] = useState("None");
  const [speed, setSpeed] = useState("1x");
  const [volume, setVolume] = useState(80);
  const [clipUrl, setClipUrl] = useState("");
  const [showUrlInput, setShowUrlInput] = useState(false);
  const uploadRef = useRef<HTMLInputElement>(null);
  const limit = TIER_LIMITS[user.tier];
  const COLORS = ["#00A86B","#8B5CF6","#EF4444","#F59E0B","#0EA5E9","#EC4899"];

  const addClip = () => setClips((c) => [...c, { id:`clip-${Date.now()}`, label:`Clip ${c.length+1}`, duration: Math.floor(Math.random()*15)+5, color: COLORS[c.length%COLORS.length], type:"clip" }]);

  const addClipFromUrl = (url: string) => {
    const isYT = url.includes("youtube.com") || url.includes("youtu.be");
    const isIG = url.includes("instagram.com");
    const isTT = url.includes("tiktok.com");
    const isX  = url.includes("twitter.com") || url.includes("x.com");
    const source = isYT ? "YouTube" : isIG ? "Instagram" : isTT ? "TikTok" : isX ? "X/Twitter" : "Web";
    setClips((c) => [...c, {
      id: `url-${Date.now()}`,
      label: `${source} Clip`,
      duration: Math.floor(Math.random() * 60) + 10,
      color: isYT ? "#FF0000" : isIG ? "#E1306C" : isTT ? "#010101" : isX ? "#1D9BF0" : "#8B5CF6",
      type: "clip",
    }]);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach((file) => {
      const url = URL.createObjectURL(file);
      const label = file.name.length > 16 ? file.name.slice(0,14)+"…" : file.name;
      setClips((c) => [...c, { id:`upload-${Date.now()}-${Math.random()}`, label, duration: Math.floor(Math.random()*20)+5, color: COLORS[c.length%COLORS.length], type:"upload" }]);
      URL.revokeObjectURL(url);
    });
  };

  const runAI = () => {
    if (!limit.aiFeatures) { navigate("/account"); return; }
    setAiProcessing(true);
    setTimeout(() => { setAiProcessing(false); alert("✅ AI Enhancement complete!\n\nAudio cleaned · Video stabilized · Color graded · Smart cuts applied"); }, 2500);
  };

  const exportVideo = () => {
    if (!clips.length) { alert("Add clips to your timeline first."); return; }
    const saveLimit = limit.savedVideos;
    if (saveLimit !== Infinity && projects.length >= saveLimit) {
      alert(`You've reached your ${saveLimit}-video save limit. Delete an existing project or upgrade your plan to save more.`);
      navigate("/account");
      return;
    }
    addProject({ id:`proj-${Date.now()}`, name:`Project ${new Date().toLocaleDateString()}`, clipCount: clips.length, duration: clips.reduce((a,c)=>a+c.duration,0), createdAt: new Date().toLocaleDateString() });
    if (confirm("Project saved! Go to Social to schedule posting?")) navigate("/social");
  };

  const tabBtnStyle = (active: boolean) => ({
    display: "flex",
    alignItems: "center",
    gap: 4,
    padding: "10px 10px",
    fontSize: 11,
    fontWeight: 700,
    borderBottom: active ? "2px solid #00D485" : "2px solid transparent",
    color: active ? "#00D485" : "rgba(255,255,255,0.35)",
    background: "transparent",
    whiteSpace: "nowrap" as const,
    cursor: "pointer",
    transition: "all 0.2s",
    flexShrink: 0,
  });

  return (
    <div className="flex flex-col h-full" style={{ background: "transparent" }}>

      {/* ── Preview ── */}
      <div className="relative flex-shrink-0" style={{ height: 200 }}>
        {/* Neon corner frames */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
          {/* TL */}
          <div className="absolute top-2 left-2" style={{ width:28,height:28,borderTop:"2px solid #00D485",borderLeft:"2px solid #00D485",boxShadow:"inset 4px 4px 8px rgba(0,212,133,0.12)" }}/>
          {/* TR */}
          <div className="absolute top-2 right-2" style={{ width:28,height:28,borderTop:"2px solid #00D485",borderRight:"2px solid #00D485" }}/>
          {/* BL */}
          <div className="absolute bottom-2 left-2" style={{ width:28,height:28,borderBottom:"2px solid #00D485",borderLeft:"2px solid #00D485" }}/>
          {/* BR */}
          <div className="absolute bottom-2 right-2" style={{ width:28,height:28,borderBottom:"2px solid #00D485",borderRight:"2px solid #00D485" }}/>
        </div>

        <div className="w-full h-full flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}>
          {clips.length === 0 ? (
            <div className="text-center fade-up">
              <div className="mb-3 flex justify-center">
                <Film size={38} style={{ color: "rgba(0,212,133,0.4)" }}/>
              </div>
              <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>
                Add clips or upload footage to start editing
              </p>
              <div className="flex gap-3 justify-center">
                <button onClick={addClip}
                  className="text-sm font-bold px-4 py-2 rounded-xl transition-all"
                  style={{ background: "linear-gradient(135deg,#00D485,#4ade8e)", color: "#000", boxShadow: "0 0 16px rgba(0,212,133,0.35)" }}>
                  + Add Clip
                </button>
                <button onClick={()=>uploadRef.current?.click()}
                  className="text-sm font-bold px-4 py-2 rounded-xl flex items-center gap-1 transition-all"
                  style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.12)" }}>
                  <Upload size={14}/> Upload
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center" style={{ background: clips[0].color+"18" }}>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <PreviewWaveform/>
                </div>
                <p className="text-white font-bold">{clips.length} clip{clips.length>1?"s":""} · {clips.reduce((a,c)=>a+c.duration,0)}s total</p>
                <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>Filter: {filter} · Speed: {speed}</p>
              </div>
            </div>
          )}
        </div>

        {aiProcessing && (
          <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ background: "rgba(0,0,0,0.8)", zIndex: 3 }}>
            <Sparkles size={32} className="text-yellow-300 animate-pulse"/>
            <p className="text-white mt-2 font-bold animate-pulse">AI Processing...</p>
            <div className="mt-3 flex gap-0.5 h-6 w-24">
              {Array.from({length:16}).map((_,i)=>(
                <div key={i} className="flex-1 rounded-full wave-bar"
                  style={{ background: "linear-gradient(to top,#F59E0B,#FBBF24)", "--dur":"0.5s","--delay":`${i*0.04}s` } as React.CSSProperties}/>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Timeline ── */}
      <div className="flex items-center px-3 gap-2 overflow-x-auto shrink-0"
        style={{
          height: 64,
          background: "rgba(8,8,18,0.9)",
          backdropFilter: "blur(12px)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}>
        {clips.map((c) => (
          <div key={c.id}
            className="h-12 rounded-lg flex flex-col justify-center px-2 shrink-0 cursor-pointer transition-all card-lift"
            style={{ width: c.duration*8, backgroundColor: c.color+"55", minWidth: 48, border: `1px solid ${c.color}44` }}>
            <p className="text-white text-xs font-bold truncate">{c.label}</p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{c.duration}s · {c.type==="upload"?"📁":"🎬"}</p>
          </div>
        ))}
        <button onClick={addClip}
          className="w-14 h-12 rounded-lg flex flex-col items-center justify-center shrink-0 transition-all"
          style={{ border: "2px dashed rgba(0,212,133,0.4)", color: "#00D485" }}>
          <Plus size={16}/><span className="text-xs font-bold">Clip</span>
        </button>
        <button onClick={()=>uploadRef.current?.click()}
          className="w-14 h-12 rounded-lg flex flex-col items-center justify-center shrink-0 transition-all"
          style={{ border: "2px dashed rgba(124,92,246,0.4)", color: "#7C5CF6" }}>
          <Upload size={16}/><span className="text-xs font-bold">Upload</span>
        </button>
      </div>

      {/* Hidden upload input */}
      <input ref={uploadRef} type="file" accept="video/*,image/*,audio/*" multiple className="hidden" onChange={handleUpload}/>

      {/* ── Tab bar ── */}
      <div className="flex overflow-x-auto shrink-0"
        style={{
          background: "rgba(8,8,18,0.85)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}>
        {TABS.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} style={tabBtnStyle(tab===t.id)}>
            <t.icon size={13}/><span className="hidden sm:inline">{t.label}</span>
          </button>
        ))}
      </div>

      {/* ── Tab content ── */}
      <div className="flex-1 overflow-y-auto p-4" style={{ background: "transparent" }}>

        {tab==="clips" && (
          <div className="space-y-4">
            {/* Add Clip via URL */}
            <div className="rounded-2xl overflow-hidden"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="p-3 flex items-center justify-between">
                <div>
                  <p className="text-white font-bold text-sm">Add Clip from URL</p>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>YouTube, TikTok, Instagram, X/Twitter</p>
                </div>
                {!limit.canAddClipUrl ? (
                  <button onClick={()=>navigate("/account")}
                    className="text-xs font-bold px-3 py-1.5 rounded-full"
                    style={{ background: "linear-gradient(135deg,#00D485,#4ade8e)", color: "#000" }}>
                    Basic+
                  </button>
                ) : (
                  <button onClick={()=>setShowUrlInput(!showUrlInput)}
                    className="text-xs font-bold px-3 py-1.5 rounded-full transition-all"
                    style={{ background: "linear-gradient(135deg,#00D485,#4ade8e)", color: "#000" }}>
                    {showUrlInput ? "Cancel" : "+ URL"}
                  </button>
                )}
              </div>
              {showUrlInput && limit.canAddClipUrl && (
                <div className="p-3 space-y-2" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                  <input
                    type="url" value={clipUrl} onChange={(e) => setClipUrl(e.target.value)}
                    placeholder="https://youtube.com/watch?v=..."
                    className="w-full rounded-xl p-3 text-white text-sm outline-none"
                    style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.1)" }}
                  />
                  <button
                    onClick={() => {
                      if (!clipUrl) { alert("Paste a video URL first."); return; }
                      try { new URL(clipUrl); } catch { alert("That doesn't look like a valid URL."); return; }
                      addClipFromUrl(clipUrl);
                      setClipUrl("");
                      setShowUrlInput(false);
                    }}
                    className="w-full py-2.5 rounded-xl font-bold text-sm transition-all"
                    style={{ background: "linear-gradient(135deg,#00D485,#4ade8e)", color: "#000" }}>
                    Add Clip from URL
                  </button>
                </div>
              )}
              {!limit.canAddClipUrl && (
                <div className="px-3 pb-3">
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>Upgrade to Basic or Pro to insert clips from YouTube, TikTok, Instagram, and more.</p>
                </div>
              )}
            </div>

            {/* Filters */}
            <div>
              <p className="font-bold mb-2 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>Filters</p>
              <div className="flex gap-2 flex-wrap">
                {FILTERS.map((f) => (
                  <button key={f} onClick={() => setFilter(f)}
                    className="px-3 py-2 rounded-lg text-sm font-semibold transition-all"
                    style={{
                      background: filter===f ? "linear-gradient(135deg,#00D485,#4ade8e)" : "rgba(255,255,255,0.05)",
                      color: filter===f ? "#000" : "rgba(255,255,255,0.55)",
                      border: filter===f ? "none" : "1px solid rgba(255,255,255,0.08)",
                    }}>
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Speed */}
            <div>
              <p className="font-bold mb-2 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>Speed</p>
              <div className="flex gap-2 flex-wrap">
                {SPEEDS.map((s) => (
                  <button key={s} onClick={() => setSpeed(s)}
                    className="px-3 py-2 rounded-lg text-sm font-semibold transition-all"
                    style={{
                      background: speed===s ? "linear-gradient(135deg,#7C5CF6,#a78bfa)" : "rgba(255,255,255,0.05)",
                      color: speed===s ? "#fff" : "rgba(255,255,255,0.55)",
                      border: speed===s ? "none" : "1px solid rgba(255,255,255,0.08)",
                    }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Volume */}
            <div>
              <p className="font-bold mb-2 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>Volume: {volume}%</p>
              <input type="range" min={0} max={100} value={volume} onChange={(e)=>setVolume(+e.target.value)}
                className="w-full" style={{ accentColor: "#00D485" }}/>
            </div>
          </div>
        )}

        {tab==="upload" && (
          <div className="space-y-4">
            <button onClick={()=>uploadRef.current?.click()}
              className="w-full rounded-2xl p-8 flex flex-col items-center gap-3 transition-all"
              style={{
                border: "2px dashed rgba(0,212,133,0.35)",
                background: "rgba(0,212,133,0.03)",
              }}
              onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.background = "rgba(0,212,133,0.07)"; }}
              onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.background = "rgba(0,212,133,0.03)"; }}>
              <div className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg,#00D485,#4ade8e)", boxShadow: "0 0 24px rgba(0,212,133,0.4)" }}>
                <Upload size={28} className="text-black"/>
              </div>
              <p className="text-white font-bold text-lg">Upload Your Footage</p>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Tap to select video, photo, or audio files</p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>Supports MP4, MOV, AVI, JPG, PNG, MP3, WAV</p>
            </button>
            {clips.filter(c=>c.type==="upload").length > 0 && (
              <div>
                <p className="font-bold mb-2 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>Uploaded Files</p>
                <div className="space-y-2">
                  {clips.filter(c=>c.type==="upload").map((c)=>(
                    <div key={c.id} className="rounded-xl p-3 flex items-center gap-3 card-lift"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: c.color+"22" }}>
                        <Upload size={18} style={{ color: c.color }}/>
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">{c.label}</p>
                        <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{c.duration}s · Added to timeline</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {tab==="music" && <MusicTab limit={limit} navigateToAccount={()=>navigate("/account")}/>}

        {tab==="skins" && <SkinsTab navigateToAccount={()=>navigate("/account")}/>}

        {tab==="audio" && (
          <div className="space-y-2">
            {["Noise Reduction","Bass Boost","Treble Enhance","Echo Removal","Volume Normalize","Fade In/Out"].map((t) => (
              <div key={t} className="rounded-xl p-3 flex items-center justify-between card-lift"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <span className="text-white text-sm font-semibold">{t}</span>
                <input type="checkbox" style={{ accentColor: "#00D485", width: 16, height: 16 }}/>
              </div>
            ))}
          </div>
        )}

        {tab==="text" && (
          <div className="space-y-3">
            <p className="font-bold text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>Text Styles</p>
            <div className="flex flex-wrap gap-2">
              {["Bold","Neon","Shadow","Outline","Gradient","Handwrite","Glitch","Rainbow"].map((s)=>(
                <button key={s}
                  className="px-4 py-2 rounded-xl text-sm font-semibold transition-all card-lift"
                  style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.09)" }}>
                  {s}
                </button>
              ))}
            </div>
            <div className={`rounded-xl p-3 flex items-center justify-between ${!limit.aiFeatures?"opacity-50":""}`}
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-yellow-400"/>
                <span className="text-white text-sm">Auto-Caption (AI)</span>
              </div>
              {!limit.aiFeatures
                ? <span className="text-xs font-bold cursor-pointer" style={{ color: "#00D485" }} onClick={()=>navigate("/account")}>Upgrade</span>
                : <input type="checkbox" style={{ accentColor: "#00D485", width: 16, height: 16 }}/>}
            </div>
          </div>
        )}

        {tab==="effects" && (
          <div className="flex flex-wrap gap-2">
            {EFFECTS.map((e)=>(
              <button key={e}
                className="px-4 py-2 rounded-xl text-sm font-semibold transition-all card-lift"
                style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.09)" }}>
                {e}
              </button>
            ))}
          </div>
        )}

        {tab==="transitions" && (
          <div className="grid grid-cols-4 gap-3">
            {TRANS.map((t)=>(
              <button key={t}
                className="rounded-xl p-3 flex flex-col items-center gap-1 transition-all card-lift"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <Zap size={20} style={{ color: "#00D485" }}/>
                <span className="text-white text-xs font-semibold">{t}</span>
              </button>
            ))}
          </div>
        )}

        {tab==="ai" && (
          <div className="space-y-3">
            <div className="rounded-2xl p-4"
              style={{
                background: limit.aiFeatures ? "rgba(0,212,133,0.06)" : "rgba(255,255,255,0.03)",
                border: limit.aiFeatures ? "1px solid rgba(0,212,133,0.2)" : "1px solid rgba(255,255,255,0.07)",
              }}>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={20} className="text-yellow-400"/>
                <h3 className="text-white font-bold">AI Smart Edit</h3>
              </div>
              <p className="text-sm mb-3" style={{ color: "rgba(255,255,255,0.45)" }}>One-tap AI: audio clean, color grade, stabilize, smart cuts.</p>
              <button onClick={runAI}
                className="w-full py-3 rounded-xl font-bold transition-all"
                style={{
                  background: aiProcessing ? "rgba(255,255,255,0.06)" : limit.aiFeatures ? "linear-gradient(135deg,#00D485,#4ade8e)" : "rgba(255,255,255,0.05)",
                  color: aiProcessing ? "rgba(255,255,255,0.3)" : limit.aiFeatures ? "#000" : "rgba(255,255,255,0.3)",
                  boxShadow: (!aiProcessing && limit.aiFeatures) ? "0 0 20px rgba(0,212,133,0.3)" : "none",
                }}>
                {aiProcessing ? "Processing..." : limit.aiFeatures ? "✨ Run AI Enhance" : "Upgrade to Unlock AI"}
              </button>
            </div>

            {[
              {label:"AI Audio Perfect",desc:"Remove noise, normalize, enhance clarity"},
              {label:"AI Video Upscale",desc:"Enhance resolution & sharpness"},
              {label:"AI Smart Crop",desc:"Auto-frame for Instagram, YouTube, TikTok"},
              {label:"AI Caption Generator",desc:"Auto-transcribe and add styled captions"},
              {label:"AI Thumbnail Creator",desc:"Generate eye-catching thumbnails"},
            ].map((item)=>(
              <div key={item.label} onClick={()=>!limit.aiFeatures&&navigate("/account")}
                className="rounded-xl p-3 flex items-center gap-3 cursor-pointer card-lift transition-all"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  opacity: !limit.aiFeatures ? 0.6 : 1,
                }}>
                <Sparkles size={18} style={{ color: "#00D485" }} className="shrink-0"/>
                <div>
                  <p className="text-white font-semibold text-sm">{item.label}</p>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{item.desc}</p>
                </div>
                {!limit.aiFeatures && <span className="ml-auto text-xs font-bold" style={{ color: "#00D485" }}>Upgrade</span>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Export bar ── */}
      <div className="shrink-0 flex gap-3 px-4 py-3"
        style={{
          background: "rgba(8,8,18,0.92)",
          backdropFilter: "blur(16px)",
          borderTop: "1px solid rgba(255,255,255,0.07)",
        }}>
        <button
          className="flex-1 font-semibold py-3 rounded-xl transition-all"
          style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.09)" }}>
          Save Draft
        </button>
        <button onClick={exportVideo}
          className="flex-1 font-bold py-3 rounded-xl transition-all"
          style={{
            background: "linear-gradient(135deg,#00D485,#4ade8e)",
            color: "#000",
            boxShadow: "0 0 20px rgba(0,212,133,0.35)",
          }}>
          Export & Share
        </button>
      </div>
    </div>
  );
}
