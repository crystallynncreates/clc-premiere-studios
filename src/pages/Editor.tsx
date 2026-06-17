import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Film, Plus, Sparkles, Music, Type, Wand2, Scissors, Zap, Upload, Palette, Play, Pause, Mic, MicOff, Lock, Check } from "lucide-react";
import { useStore } from "../store/useStore";
import { TIER_LIMITS } from "../types";
import { MUSIC_LIBRARY, GENRE_LABELS, formatDuration } from "../data/music";
import { ALL_CHAR_SKINS, FREE_SKINS, ANIME_PAID_SKINS, ARTIST_SKINS, STYLE_SKINS } from "../data/characterSkins";
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

  if (v === 0) return ( // Classic round toon - big head, simple eyes
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
  if (v === 1) return ( // Buck teeth comedy toon
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
  if (v === 2) return ( // Square jaw superhero
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
  if (v === 3) return ( // Pigtails girl with freckles
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
  if (v === 4) return ( // Robot/mechanical
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
  if (v === 5) return ( // Big ears elf/gnome
    <svg width={s} height={s} viewBox="0 0 100 100">
      <circle cx="50" cy="54" r="33" fill={c1}/>
      <ellipse cx="17" cy="54" rx="12" ry="8" fill={c1}/><ellipse cx="83" cy="54" rx="12" ry="8" fill={c1}/>
      <path d="M22 28 Q50 5 78 28 Q78 18 50 14 Q22 18 22 28 Z" fill={c3||"#5d3c1a"}/>
      <circle cx="37" cy="50" r="9" fill="white"/><circle cx="63" cy="50" r="9" fill="white"/>
      <circle cx="38" cy="51" r="5" fill={c2||"#6600aa"}/><circle cx="64" cy="51" r="5" fill={c2||"#6600aa"}/>
      <circle cx="39" cy="49" r="2" fill="white"/><circle cx="65" cy="49" r="2" fill="white"/>
      <path d="M40 65 Q50 74 60 65" stroke="#cc4488" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <circle cx="33" cy="57" r="5" fill="#ffbbcc" opacity=".5"/>
      <circle cx="67" cy="57" r="5" fill="#ffbbcc" opacity=".5"/>
    </svg>
  );
  if (v === 6) return ( // Cat/animal hybrid
    <svg width={s} height={s} viewBox="0 0 100 100">
      <circle cx="50" cy="54" r="33" fill={c1}/>
      <polygon points="22,30 30,10 38,30" fill={c3||"#ff8844"}/>
      <polygon points="62,30 70,10 78,30" fill={c3||"#ff8844"}/>
      <polygon points="24,30 30,15 36,30" fill="#ffccaa"/>
      <polygon points="64,30 70,15 76,30" fill="#ffccaa"/>
      <circle cx="37" cy="50" r="9" fill="white"/><circle cx="63" cy="50" r="9" fill="white"/>
      <ellipse cx="38" cy="51" rx="4" ry="6" fill={c2||"#116600"}/><ellipse cx="64" cy="51" rx="4" ry="6" fill={c2||"#116600"}/>
      <circle cx="38" cy="49" r="1.5" fill="white"/><circle cx="64" cy="49" r="1.5" fill="white"/>
      <ellipse cx="50" cy="64" rx="6" ry="4" fill="#ff8899"/>
      {[-12,-6,0,6,12].map((x,i)=><line key={i} x1={50+x} y1={60} x2={50+x+(i<2?-8:i>2?8:0)} y2={57} stroke="#777" strokeWidth="1"/>)}
    </svg>
  );
  if (v === 7) return ( // Friendly monster
    <svg width={s} height={s} viewBox="0 0 100 100">
      <circle cx="50" cy="55" r="36" fill={c1}/>
      {[33,42,50,58,67].map((x,i)=><rect key={i} x={x-4} y="19" width="8" height="14" rx="3" fill={c1}/>)}
      <circle cx="36" cy="48" r="11" fill="white" stroke={c2||"#333"} strokeWidth="1"/>
      <circle cx="64" cy="48" r="11" fill="white" stroke={c2||"#333"} strokeWidth="1"/>
      <circle cx="37" cy="49" r="6" fill={c2||"#cc0000"}/><circle cx="65" cy="49" r="6" fill={c2||"#cc0000"}/>
      <circle cx="38" cy="47" r="2.5" fill="white"/><circle cx="66" cy="47" r="2.5" fill="white"/>
      <path d="M32 68 L38 62 L44 68 L50 62 L56 68 L62 62 L68 68" stroke="white" strokeWidth="2" fill="none"/>
    </svg>
  );
  if (v === 8) return ( // Nerd with glasses
    <svg width={s} height={s} viewBox="0 0 100 100">
      <circle cx="50" cy="53" r="34" fill={c1}/>
      <path d="M22 28 Q50 8 78 28" fill={c3||"#4a2200"} strokeWidth="0"/>
      <circle cx="37" cy="48" r="11" fill="none" stroke={c2||"#333"} strokeWidth="3"/>
      <circle cx="63" cy="48" r="11" fill="none" stroke={c2||"#333"} strokeWidth="3"/>
      <circle cx="37" cy="48" r="8" fill="white" opacity=".9"/>
      <circle cx="63" cy="48" r="8" fill="white" opacity=".9"/>
      <circle cx="37" cy="49" r="4" fill="#4466cc"/><circle cx="63" cy="49" r="4" fill="#4466cc"/>
      <circle cx="38" cy="47" r="1.5" fill="white"/><circle cx="64" cy="47" r="1.5" fill="white"/>
      <line x1="48" y1="48" x2="52" y2="48" stroke={c2||"#333"} strokeWidth="3"/>
      <line x1="16" y1="48" x2="26" y2="48" stroke={c2||"#333"} strokeWidth="3"/>
      <line x1="74" y1="48" x2="84" y2="48" stroke={c2||"#333"} strokeWidth="3"/>
      <path d="M38 65 Q50 74 62 65" stroke="#cc4455" strokeWidth="2" fill="none" strokeLinecap="round"/>
    </svg>
  );
  // v === 9: Sunglasses cool kid
  return (
    <svg width={s} height={s} viewBox="0 0 100 100">
      <circle cx="50" cy="53" r="34" fill={c1}/>
      <path d="M20 30 Q50 6 80 30 Q75 20 50 16 Q25 20 20 30 Z" fill={c3||"#1a1a1a"}/>
      <rect x="24" y="44" width="22" height="14" rx="7" fill="#1a1a1a"/>
      <rect x="54" y="44" width="22" height="14" rx="7" fill="#1a1a1a"/>
      <line x1="46" y1="51" x2="54" y2="51" stroke="#1a1a1a" strokeWidth="3"/>
      <line x1="16" y1="51" x2="24" y2="51" stroke="#1a1a1a" strokeWidth="3"/>
      <line x1="76" y1="51" x2="84" y2="51" stroke="#1a1a1a" strokeWidth="3"/>
      <rect x="26" y="46" width="18" height="10" rx="5" fill={c2||"#4488ff"} opacity=".55"/>
      <rect x="56" y="46" width="18" height="10" rx="5" fill={c2||"#4488ff"} opacity=".55"/>
      <path d="M38 68 Q50 77 62 68" stroke="#cc4455" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <circle cx="32" cy="59" r="5" fill="#ffbbcc" opacity=".5"/>
      <circle cx="68" cy="59" r="5" fill="#ffbbcc" opacity=".5"/>
    </svg>
  );
}

// ─── Anime SVG Characters ──────────────────────────────────────────────────
function AnimeAvatar({ colors, variant, size=100 }: { colors:string[]; variant:number; size?:number }) {
  const [c1,c2,c3] = colors;
  const v = variant % 10;

  if (v === 0) return ( // Magical girl - flowing hair, big sparkle eyes
    <svg width={size} height={size} viewBox="0 0 100 100">
      <ellipse cx="50" cy="55" rx="30" ry="34" fill={c1}/>
      <path d="M20 40 Q20 10 50 8 Q80 10 80 40 Q70 20 50 18 Q30 20 20 40Z" fill={c3||"#cc44aa"}/>
      <path d="M15 50 Q10 70 16 82 Q20 62 25 58Z" fill={c3||"#cc44aa"}/>
      <path d="M85 50 Q90 70 84 82 Q80 62 75 58Z" fill={c3||"#cc44aa"}/>
      <ellipse cx="36" cy="50" rx="11" ry="13" fill="white"/><ellipse cx="64" cy="50" rx="11" ry="13" fill="white"/>
      <ellipse cx="36" cy="52" rx="7" ry="9" fill={c2||"#aa00cc"}/><ellipse cx="64" cy="52" rx="7" ry="9" fill={c2||"#aa00cc"}/>
      <ellipse cx="35" cy="51" rx="3" ry="4" fill="#1a1a2e"/><ellipse cx="63" cy="51" rx="3" ry="4" fill="#1a1a2e"/>
      <circle cx="33" cy="49" r="2.5" fill="white"/><circle cx="61" cy="49" r="2.5" fill="white"/>
      <path d="M44 67 Q50 73 56 67" stroke="#ff6688" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <circle cx="30" cy="60" r="5" fill="#ffaacc" opacity=".6"/><circle cx="70" cy="60" r="5" fill="#ffaacc" opacity=".6"/>
    </svg>
  );
  if (v === 1) return ( // Spiky battle hair warrior
    <svg width={size} height={size} viewBox="0 0 100 100">
      <ellipse cx="50" cy="56" rx="28" ry="32" fill={c1}/>
      <polygon points="50,5 56,25 62,8 65,28 72,12 72,30 78,18 74,34" fill={c3||"#ffcc00"}/>
      <polygon points="50,5 44,25 38,8 35,28 28,12 28,30 22,18 26,34" fill={c3||"#ffcc00"}/>
      <ellipse cx="37" cy="50" rx="9" ry="11" fill="white"/><ellipse cx="63" cy="50" rx="9" ry="11" fill="white"/>
      <ellipse cx="37" cy="52" rx="6" ry="8" fill={c2||"#0044cc"}/><ellipse cx="63" cy="52" rx="6" ry="8" fill={c2||"#0044cc"}/>
      <ellipse cx="36" cy="51" rx="3" ry="4" fill="#111"/><ellipse cx="62" cy="51" rx="3" ry="4" fill="#111"/>
      <circle cx="34" cy="49" r="2" fill="white"/><circle cx="60" cy="49" r="2" fill="white"/>
      <path d="M44 68 Q50 74 56 68" stroke="#cc2255" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M26 44 Q36 40 38 44" stroke="#555" strokeWidth="1.5" fill="none"/>
      <path d="M74 44 Q64 40 62 44" stroke="#555" strokeWidth="1.5" fill="none"/>
    </svg>
  );
  if (v === 2) return ( // Short bob cut
    <svg width={size} height={size} viewBox="0 0 100 100">
      <ellipse cx="50" cy="55" rx="28" ry="33" fill={c1}/>
      <path d="M22 46 Q22 14 50 12 Q78 14 78 46 Q74 30 50 28 Q26 30 22 46Z" fill={c3||"#222244"}/>
      <path d="M22 46 Q18 60 20 70 Q24 56 28 52Z" fill={c3||"#222244"}/>
      <path d="M78 46 Q82 60 80 70 Q76 56 72 52Z" fill={c3||"#222244"}/>
      <ellipse cx="37" cy="52" rx="10" ry="12" fill="white"/><ellipse cx="63" cy="52" rx="10" ry="12" fill="white"/>
      <ellipse cx="37" cy="54" rx="6.5" ry="8" fill={c2||"#009966"}/><ellipse cx="63" cy="54" rx="6.5" ry="8" fill={c2||"#009966"}/>
      <ellipse cx="36" cy="53" rx="3" ry="4" fill="#111"/><ellipse cx="62" cy="53" rx="3" ry="4" fill="#111"/>
      <circle cx="34" cy="51" r="2" fill="white"/><circle cx="60" cy="51" r="2" fill="white"/>
      <path d="M43 68 Q50 75 57 68" stroke="#ff6699" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <circle cx="31" cy="62" r="5" fill="#ffbbcc" opacity=".55"/><circle cx="69" cy="62" r="5" fill="#ffbbcc" opacity=".55"/>
    </svg>
  );
  if (v === 3) return ( // Twin tails chibi
    <svg width={size} height={size} viewBox="0 0 100 100">
      <ellipse cx="50" cy="57" rx="27" ry="31" fill={c1}/>
      <path d="M23 42 Q23 15 50 13 Q77 15 77 42 Q68 22 50 20 Q32 22 23 42Z" fill={c3||"#ff44aa"}/>
      <ellipse cx="18" cy="65" rx="10" ry="18" fill={c3||"#ff44aa"} transform="rotate(-20 18 65)"/>
      <ellipse cx="82" cy="65" rx="10" ry="18" fill={c3||"#ff44aa"} transform="rotate(20 82 65)"/>
      <ellipse cx="37" cy="53" rx="11" ry="13" fill="white"/><ellipse cx="63" cy="53" rx="11" ry="13" fill="white"/>
      <ellipse cx="37" cy="55" rx="7" ry="9" fill={c2||"#cc00ff"}/><ellipse cx="63" cy="55" rx="7" ry="9" fill={c2||"#cc00ff"}/>
      <ellipse cx="36" cy="54" rx="3.5" ry="4.5" fill="#111"/><ellipse cx="62" cy="54" rx="3.5" ry="4.5" fill="#111"/>
      <circle cx="33" cy="52" r="2.5" fill="white"/><circle cx="59" cy="52" r="2.5" fill="white"/>
      <path d="M43 69 Q50 76 57 69" stroke="#ff4488" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <circle cx="30" cy="62" r="6" fill="#ffaadd" opacity=".55"/><circle cx="70" cy="62" r="6" fill="#ffaadd" opacity=".55"/>
    </svg>
  );
  if (v === 4) return ( // Wild spiky intense hair
    <svg width={size} height={size} viewBox="0 0 100 100">
      <ellipse cx="50" cy="57" rx="27" ry="31" fill={c1}/>
      <polygon points="50,6 54,22 60,5 63,22 70,6 70,24 77,10 73,28 78,18 74,34 22,34 26,18 22,10 30,24 30,6 37,22 40,5 46,22" fill={c3||"#cc2200"}/>
      <ellipse cx="37" cy="52" rx="10" ry="12" fill="white"/><ellipse cx="63" cy="52" rx="10" ry="12" fill="white"/>
      <ellipse cx="37" cy="54" rx="7" ry="9" fill={c2||"#cc0000"}/><ellipse cx="63" cy="54" rx="7" ry="9" fill={c2||"#cc0000"}/>
      <ellipse cx="36" cy="53" rx="3.5" ry="4.5" fill="#111"/><ellipse cx="62" cy="53" rx="3.5" ry="4.5" fill="#111"/>
      <circle cx="33" cy="51" r="2.5" fill="white"/><circle cx="59" cy="51" r="2.5" fill="white"/>
      <path d="M44 68 Q50 74 56 68" stroke="#222" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M26 46 Q37 41 39 46" stroke="#444" strokeWidth="1.5" fill="none"/>
      <path d="M74 46 Q63 41 61 46" stroke="#444" strokeWidth="1.5" fill="none"/>
    </svg>
  );
  if (v === 5) return ( // Side-swept hair
    <svg width={size} height={size} viewBox="0 0 100 100">
      <ellipse cx="50" cy="55" rx="29" ry="33" fill={c1}/>
      <path d="M78 42 Q78 12 50 10 Q25 12 22 35 Q32 15 58 18 Q76 22 78 42Z" fill={c3||"#8844cc"}/>
      <path d="M78 42 Q85 55 82 68 Q79 54 74 50Z" fill={c3||"#8844cc"}/>
      <path d="M22 35 Q16 25 20 15 Q22 30 28 38Z" fill={c3||"#8844cc"}/>
      <ellipse cx="37" cy="51" rx="10" ry="12" fill="white"/><ellipse cx="63" cy="51" rx="10" ry="12" fill="white"/>
      <ellipse cx="37" cy="53" rx="6.5" ry="8.5" fill={c2||"#6600aa"}/><ellipse cx="63" cy="53" rx="6.5" ry="8.5" fill={c2||"#6600aa"}/>
      <ellipse cx="36" cy="52" rx="3" ry="4" fill="#111"/><ellipse cx="62" cy="52" rx="3" ry="4" fill="#111"/>
      <circle cx="34" cy="50" r="2" fill="white"/><circle cx="60" cy="50" r="2" fill="white"/>
      <path d="M43 67 Q50 74 57 67" stroke="#ff5599" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <circle cx="31" cy="61" r="5" fill="#ffccdd" opacity=".6"/><circle cx="69" cy="61" r="5" fill="#ffccdd" opacity=".6"/>
    </svg>
  );
  if (v === 6) return ( // Top bun traditional
    <svg width={size} height={size} viewBox="0 0 100 100">
      <ellipse cx="50" cy="58" rx="28" ry="32" fill={c1}/>
      <path d="M22 42 Q22 16 50 14 Q78 16 78 42 Q72 24 50 22 Q28 24 22 42Z" fill={c3||"#1a1a1a"}/>
      <ellipse cx="50" cy="12" rx="16" ry="12" fill={c3||"#1a1a1a"}/>
      <circle cx="50" cy="12" r="8" fill={c2||"#cc0044"}/>
      <ellipse cx="37" cy="53" rx="10" ry="12" fill="white"/><ellipse cx="63" cy="53" rx="10" ry="12" fill="white"/>
      <ellipse cx="37" cy="55" rx="6.5" ry="8.5" fill={c2||"#cc0044"}/><ellipse cx="63" cy="55" rx="6.5" ry="8.5" fill={c2||"#cc0044"}/>
      <ellipse cx="36" cy="54" rx="3" ry="4" fill="#111"/><ellipse cx="62" cy="54" rx="3" ry="4" fill="#111"/>
      <circle cx="34" cy="52" r="2" fill="white"/><circle cx="60" cy="52" r="2" fill="white"/>
      <path d="M42 69 Q50 76 58 69" stroke="#ff4488" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <circle cx="30" cy="63" r="5" fill="#ffbbcc" opacity=".55"/><circle cx="70" cy="63" r="5" fill="#ffbbcc" opacity=".55"/>
    </svg>
  );
  if (v === 7) return ( // Headband/forehead protector ninja
    <svg width={size} height={size} viewBox="0 0 100 100">
      <ellipse cx="50" cy="56" rx="28" ry="32" fill={c1}/>
      <path d="M22 38 Q22 14 50 12 Q78 14 78 38 Q70 20 50 18 Q30 20 22 38Z" fill={c3||"#222222"}/>
      <rect x="20" y="33" width="60" height="12" rx="4" fill={c2||"#0044cc"}/>
      <rect x="44" y="35" width="12" height="8" rx="2" fill="silver"/>
      <ellipse cx="37" cy="54" rx="10" ry="12" fill="white"/><ellipse cx="63" cy="54" rx="10" ry="12" fill="white"/>
      <ellipse cx="37" cy="56" rx="6.5" ry="8.5" fill={c2||"#0044cc"}/><ellipse cx="63" cy="56" rx="6.5" ry="8.5" fill={c2||"#0044cc"}/>
      <ellipse cx="36" cy="55" rx="3" ry="4" fill="#111"/><ellipse cx="62" cy="55" rx="3" ry="4" fill="#111"/>
      <circle cx="34" cy="53" r="2" fill="white"/><circle cx="60" cy="53" r="2" fill="white"/>
      <path d="M43 69 Q50 75 57 69" stroke="#cc2244" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M26 48 Q37 43 39 48" stroke="#444" strokeWidth="1.5" fill="none"/>
      <path d="M74 48 Q63 43 61 48" stroke="#444" strokeWidth="1.5" fill="none"/>
    </svg>
  );
  if (v === 8) return ( // Silver/white hair serious
    <svg width={size} height={size} viewBox="0 0 100 100">
      <ellipse cx="50" cy="55" rx="28" ry="33" fill={c1}/>
      <path d="M22 42 Q22 12 50 10 Q78 12 78 42 Q72 22 50 20 Q28 22 22 42Z" fill="white"/>
      <path d="M22 42 Q16 55 18 67 Q22 52 28 48Z" fill="white"/>
      <path d="M78 42 Q84 55 82 67 Q78 52 72 48Z" fill="white"/>
      <ellipse cx="37" cy="50" rx="10" ry="12" fill="white"/><ellipse cx="63" cy="50" rx="10" ry="12" fill="white"/>
      <ellipse cx="37" cy="52" rx="6.5" ry="8.5" fill={c2||"#6600aa"}/><ellipse cx="63" cy="52" rx="6.5" ry="8.5" fill={c2||"#6600aa"}/>
      <ellipse cx="36" cy="51" rx="3" ry="4" fill="#111"/><ellipse cx="62" cy="51" rx="3" ry="4" fill="#111"/>
      <circle cx="34" cy="49" r="2" fill="white"/><circle cx="60" cy="49" r="2" fill="white"/>
      <path d="M45 66 Q50 70 55 66" stroke="#888" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M26 44 Q37 39 39 44" stroke="#aaa" strokeWidth="1.5" fill="none"/>
      <path d="M74 44 Q63 39 61 44" stroke="#aaa" strokeWidth="1.5" fill="none"/>
    </svg>
  );
  // v === 9: Ponytail athletic
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

// ─── Billboard chart songs (require licensing — shown for paid plans) ─────────
const BILLBOARD_SONGS = [
  // Pop
  { id:"bb-p1", title:"Espresso",               artist:"Sabrina Carpenter",          genre:"pop",    peak:1  },
  { id:"bb-p2", title:"Die With A Smile",        artist:"Lady Gaga & Bruno Mars",     genre:"pop",    peak:1  },
  { id:"bb-p3", title:"Please Please Please",    artist:"Sabrina Carpenter",          genre:"pop",    peak:2  },
  { id:"bb-p4", title:"APT.",                    artist:"ROSÉ & Bruno Mars",          genre:"pop",    peak:1  },
  { id:"bb-p5", title:"Beautiful Things",        artist:"Benson Boone",               genre:"pop",    peak:2  },
  // Country
  { id:"bb-c1", title:"I Had Some Help",         artist:"Post Malone ft. Morgan Wallen", genre:"country", peak:1 },
  { id:"bb-c2", title:"White Horse",             artist:"Chris Stapleton",            genre:"country", peak:2  },
  { id:"bb-c3", title:"Save Me",                 artist:"Jelly Roll",                 genre:"country", peak:4  },
  { id:"bb-c4", title:"Miles On It",             artist:"Kane Brown & Marshmello",    genre:"country", peak:5  },
  { id:"bb-c5", title:"Cowgirls",                artist:"Morgan Wallen",              genre:"country", peak:3  },
  // Rap/Hip-Hop
  { id:"bb-r1", title:"Not Like Us",             artist:"Kendrick Lamar",             genre:"rap",    peak:1  },
  { id:"bb-r2", title:"Like That",               artist:"Future, Metro Boomin & Kendrick Lamar", genre:"rap", peak:1 },
  { id:"bb-r3", title:"CARNIVAL",                artist:"¥$, Kanye West & Ty Dolla $ign", genre:"rap", peak:2 },
  { id:"bb-r4", title:"Wanna Be",                artist:"GloRilla & Megan Thee Stallion", genre:"rap", peak:3 },
  { id:"bb-r5", title:"Neon Signs",              artist:"Morgan Wallen",              genre:"rap",    peak:6  },
  // R&B
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
    // Hand clap = shaped white noise burst
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
    // "Ohhhh" crowd = descending sine sweep
    const osc = ctx.createOscillator();
    const g   = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(520, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(360, ctx.currentTime + 1.2);
    g.gain.setValueAtTime(0, ctx.currentTime);
    g.gain.linearRampToValueAtTime(0.38, ctx.currentTime + 0.12);
    g.gain.linearRampToValueAtTime(0.32, ctx.currentTime + 0.8);
    g.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.4);
    // add chorus layer
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
    // "Ahhh!" crowd = ascending bright cheer
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
    // Rhythmic laugh-track bursts
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
  const audioRef = useRef<HTMLAudioElement|null>(null);

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

  return (
    <div className="space-y-3">
      {/* Sub-tab bar */}
      <div className="grid grid-cols-4 gap-1">
        {([["library","🎵 Library"],["sfx","🔊 Sound FX"],["billboard","🏆 Charts"],["ai","🤖 AI"]] as const).map(([t,label])=>(
          <button key={t} onClick={()=>setMusicSubTab(t)}
            className={`py-2 rounded-xl font-bold text-xs transition-colors ${musicSubTab===t?"bg-jade-500 text-white":"bg-gray-700 text-gray-400 hover:text-gray-200"}`}>
            {label}
          </button>
        ))}
      </div>

      {/* ── Library tab ── */}
      {musicSubTab==="library" && (
        <>
          <div className="flex gap-1 flex-wrap">
            {GENRES.map((g)=>(
              <button key={g} onClick={()=>setGenre(g)}
                className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors ${genre===g?"bg-jade-500 border-jade-500 text-white":"border-gray-600 text-gray-400 hover:text-gray-200"}`}>
                {g==="all"?"All":GENRE_LABELS[g]}
              </button>
            ))}
          </div>
          <p className="text-gray-500 text-xs">Royalty-free tracks — tap to play/pause</p>
          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {tracks.map((t)=>{
              const isPlaying = playingId===t.id;
              return (
                <div key={t.id} onClick={()=>handlePlay(t.id, t.url)}
                  className={`rounded-xl p-3 cursor-pointer transition-all flex items-center gap-3 ${isPlaying?"bg-jade-900/60 border border-jade-600":"bg-gray-700 hover:bg-gray-600"}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isPlaying?"bg-jade-500":"bg-gray-600"}`}>
                    {isPlaying?<Pause size={16} className="text-white"/>:<Play size={16} className="text-white"/>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-bold text-sm truncate">{t.title}</p>
                    <p className="text-gray-400 text-xs">{GENRE_LABELS[t.genre]} · {formatDuration(t.duration)} · {t.bpm} BPM</p>
                  </div>
                  {isPlaying && (
                    <div className="flex items-center gap-0.5 h-6 w-12">
                      {t.waveform?.slice(0,10).map((h,i)=>(
                        <div key={i} className="flex-1 rounded-full bg-jade-400 animate-pulse" style={{height:`${h*100}%`}}/>
                      ))}
                    </div>
                  )}
                  <button className="text-jade-400 hover:text-jade-300 shrink-0" onClick={(e)=>{e.stopPropagation();alert(`"${t.title}" added to timeline!`)}}><Plus size={18}/></button>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* ── Sound FX tab ── */}
      {musicSubTab==="sfx" && (
        <div className="space-y-3">
          <p className="text-gray-400 text-xs">Tap any sound to preview it instantly — add to your timeline with +</p>

          {/* Free SFX */}
          <div>
            <p className="text-jade-400 text-xs font-bold uppercase tracking-wider mb-2">✨ Free Sound Effects</p>
            <div className="space-y-2">
              {SOUND_FX.filter(s=>s.free).map((s)=>(
                <div key={s.id} className="bg-gray-700 rounded-xl p-3 flex items-center gap-3">
                  <button onClick={()=>playSoundFx(s.id)}
                    className="w-11 h-11 rounded-full bg-jade-500 hover:bg-jade-400 flex items-center justify-center shrink-0 transition-colors">
                    <Play size={18} className="text-white"/>
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-bold text-sm">{s.label}</p>
                    <p className="text-gray-400 text-xs">{s.desc}</p>
                  </div>
                  <button onClick={()=>alert(`${s.label} added to timeline!`)}
                    className="text-jade-400 hover:text-jade-300 transition-colors"><Plus size={18}/></button>
                </div>
              ))}
            </div>
          </div>

          {/* Paid SFX */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-yellow-400 text-xs font-bold uppercase tracking-wider">🔒 Premium Sound Effects</p>
              {!limit.aiFeatures && (
                <button onClick={navigateToAccount} className="text-xs bg-jade-600 text-white px-2 py-0.5 rounded-full font-bold">Upgrade</button>
              )}
            </div>
            <div className="space-y-2">
              {SOUND_FX.filter(s=>!s.free).map((s)=>(
                <div key={s.id} className={`rounded-xl p-3 flex items-center gap-3 ${limit.aiFeatures?"bg-gray-700":"bg-gray-800"}`}>
                  <button onClick={()=>{ if(!limit.aiFeatures){navigateToAccount();return;} playSoundFx(s.id); }}
                    className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-colors relative ${limit.aiFeatures?"bg-jade-500 hover:bg-jade-400":"bg-gray-600"}`}>
                    {limit.aiFeatures ? <Play size={18} className="text-white"/> : <Lock size={16} className="text-jade-400"/>}
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className={`font-bold text-sm ${limit.aiFeatures?"text-white":"text-gray-400"}`}>{s.label}</p>
                    <p className="text-gray-500 text-xs">{s.desc}</p>
                  </div>
                  {limit.aiFeatures
                    ? <button onClick={()=>alert(`${s.label} added to timeline!`)} className="text-jade-400 hover:text-jade-300 transition-colors"><Plus size={18}/></button>
                    : <span className="text-jade-500 text-xs font-bold">Basic+</span>
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
          {/* Genre selector */}
          <div className="grid grid-cols-4 gap-1">
            {(["pop","country","rap","rnb"] as const).map((g)=>(
              <button key={g} onClick={()=>setBbGenre(g)}
                className={`py-2 rounded-xl text-xs font-bold transition-colors border ${bbGenre===g?"border-transparent text-white":"border-gray-600 text-gray-400 hover:text-gray-200 bg-gray-800"}`}
                style={bbGenre===g?{backgroundColor:GENRE_COLORS[g]}:{}}>
                {GENRE_ICONS[g]} {g==="rnb"?"R&B":g.charAt(0).toUpperCase()+g.slice(1)}
              </button>
            ))}
          </div>

          {/* Licensing notice */}
          <div className="bg-yellow-900/30 border border-yellow-700/50 rounded-xl p-3 flex gap-2">
            <span className="text-yellow-400 text-lg shrink-0">⚠️</span>
            <div>
              <p className="text-yellow-300 text-xs font-bold">Licensed Music Required</p>
              <p className="text-yellow-200/70 text-xs mt-0.5">These Billboard chart songs require a streaming license. Upgrade to Pro to request licensing through our music marketplace.</p>
            </div>
          </div>

          {/* Songs list */}
          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {bbTracks.map((t)=>{
              const canAccess = user.tier === "pro";
              return (
                <div key={t.id} className={`rounded-xl p-3 flex items-center gap-3 ${canAccess?"bg-gray-700":"bg-gray-800"}`}>
                  {/* Chart rank */}
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-bold text-xs"
                    style={{backgroundColor: GENRE_COLORS[t.genre]+"33", color: GENRE_COLORS[t.genre]}}>
                    #{t.peak}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-bold text-sm truncate ${canAccess?"text-white":"text-gray-300"}`}>{t.title}</p>
                    <p className="text-gray-400 text-xs truncate">{t.artist}</p>
                  </div>
                  {canAccess ? (
                    <button onClick={()=>alert(`License requested for "${t.title}". Our team will process within 24hrs.`)}
                      className="shrink-0 text-xs bg-jade-500 hover:bg-jade-400 text-white font-bold px-3 py-1.5 rounded-lg transition-colors">
                      License
                    </button>
                  ) : (
                    <div className="shrink-0 flex items-center gap-1">
                      <Lock size={13} className="text-jade-500"/>
                      <button onClick={navigateToAccount} className="text-jade-400 text-xs font-bold hover:text-jade-300">Pro</button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {!limit.aiFeatures && (
            <button onClick={navigateToAccount}
              className="w-full py-3 rounded-xl bg-jade-600 hover:bg-jade-500 text-white font-bold text-sm transition-colors">
              Upgrade to Pro — Unlock Chart Music Licensing
            </button>
          )}
        </div>
      )}

      {/* ── AI Creator tab ── */}
      {musicSubTab==="ai" && (
        <div className={`rounded-2xl p-4 ${limit.aiFeatures?"bg-jade-900/40 border border-jade-700":"bg-gray-700"}`}>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={18} className="text-yellow-400"/><h3 className="text-white font-bold">AI Music Creator</h3>
            {!limit.aiFeatures&&<button onClick={navigateToAccount} className="ml-auto bg-jade-600 text-white text-xs font-bold px-3 py-1 rounded-full">Upgrade</button>}
          </div>
          <textarea className="w-full bg-gray-800 rounded-xl p-3 text-white text-sm mb-3 resize-none border border-gray-700 focus:border-jade-500 outline-none"
            rows={2} placeholder="Describe your song..." value={prompt} onChange={(e)=>setPrompt(e.target.value)} disabled={!limit.aiFeatures}/>
          <div className="flex gap-2 flex-wrap mb-3">
            {["pop","country","rap","rnb","electronic","cinematic"].map((s)=>(
              <button key={s} onClick={()=>limit.aiFeatures&&setStyle(s)}
                className={`px-2 py-1 rounded-full text-xs font-semibold capitalize transition-colors ${style===s?"bg-jade-500 text-white":"bg-gray-700 text-gray-400"}`}>{s}</button>
            ))}
          </div>
          <button onClick={()=>limit.aiFeatures&&setVoiceRec(!voiceRec)}
            className={`w-full rounded-xl p-3 flex items-center gap-2 border-2 border-dashed mb-3 transition-colors ${voiceRec?"border-jade-500 bg-jade-900/30":"border-gray-600 bg-gray-800"}`}>
            {voiceRec?<Mic size={20} className="text-jade-400"/>:<MicOff size={20} className="text-gray-500"/>}
            <span className={`text-sm font-semibold ${voiceRec?"text-jade-400":"text-gray-400"}`}>
              {voiceRec?"Voice Recorded ✓":"Tap to record voice"}
            </span>
          </button>
          <button onClick={generate} disabled={aiProcessing}
            className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors ${aiProcessing?"bg-gray-600 text-gray-400":limit.aiFeatures?"bg-jade-500 text-white hover:bg-jade-600":"bg-gray-700 text-gray-400"}`}>
            <Sparkles size={16}/>{aiProcessing?"Creating...":limit.aiFeatures?"Create AI Song":"Upgrade to Use AI Music"}
          </button>
          {result && (
            <div className="mt-3 bg-jade-900/40 border border-jade-600 rounded-xl p-3">
              <p className="text-jade-300 font-bold text-sm mb-1">✅ AI Track Ready: {result}</p>
              <div className="flex gap-2">
                <button className="flex-1 bg-jade-500 text-white font-bold py-2 rounded-xl text-sm hover:bg-jade-600 transition-colors">Add to Video</button>
                <button className="flex-1 bg-gray-700 text-gray-200 font-bold py-2 rounded-xl text-sm hover:bg-gray-600 transition-colors">Save</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Skins Tab (embedded) ─────────────────────────────────────────────────
function SkinsTab({ navigateToAccount }: { navigateToAccount:()=>void }) {
  const { user, selectedSkinId, setSelectedSkin } = useStore();
  const [skinTab, setSkinTab] = useState<"cartoon"|"anime"|"artists"|"styles">("cartoon");

  const SKIN_TABS = [
    { id: "cartoon" as const, label: "🎭 Cartoon", skins: FREE_SKINS },
    { id: "anime"   as const, label: "⚡ Anime",   skins: ANIME_PAID_SKINS },
    { id: "artists" as const, label: "🎤 Artists", skins: ARTIST_SKINS },
    { id: "styles"  as const, label: "🎬 Styles",  skins: STYLE_SKINS },
  ];

  const activeSkins = SKIN_TABS.find((t)=>t.id===skinTab)!.skins;
  const activeName  = ALL_CHAR_SKINS.find((s)=>s.id===selectedSkinId)?.name;

  const canUse = (tier: string) => {
    if (tier==="free") return true;
    if (tier==="basic") return user.tier==="basic"||user.tier==="pro";
    return user.tier==="pro";
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-1">
        {SKIN_TABS.map((t)=>(
          <button key={t.id} onClick={()=>setSkinTab(t.id)}
            className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition-colors ${skinTab===t.id?"bg-jade-500 text-white":"bg-gray-700 text-gray-400 hover:text-gray-200"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {skinTab!=="cartoon" && (
        <div className="bg-amber-900/30 border border-amber-600/50 rounded-xl p-2 text-center">
          <p className="text-amber-300 text-xs font-semibold">
            {skinTab==="anime" ? "⚡ Basic+ unlocks Anime characters"
            : skinTab==="artists" ? "🎤 Basic+ unlocks Artist avatars"
            : "🎬 Basic+ unlocks Content Style overlays"}
          </p>
        </div>
      )}

      {selectedSkinId && activeName && (
        <div className="bg-jade-900/40 border border-jade-600 rounded-xl p-2 flex items-center gap-2">
          <Check size={14} className="text-jade-400"/>
          <span className="text-jade-300 font-semibold text-xs">Active: {activeName}</span>
          <button onClick={()=>setSelectedSkin(null)} className="ml-auto text-gray-500 text-xs hover:text-gray-300">Remove</button>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[480px] overflow-y-auto pr-1">
        {activeSkins.map((skin)=>{
          const StyleComp = AVATAR_MAP[skin.id]; // only used for style overlays (no imageUrl)
          const unlocked = canUse(skin.tier);
          const active = selectedSkinId===skin.id;
          return (
            <button key={skin.id} onClick={()=>{
              if (!unlocked) { if(confirm(`Unlock "${skin.name}"?\nUpgrade to ${skin.tier} plan.`)) navigateToAccount(); return; }
              setSelectedSkin(active?null:skin.id);
            }} className={`relative rounded-2xl overflow-hidden border-2 transition-all ${active?"border-jade-400 shadow-lg shadow-jade-900/50":"border-gray-600 hover:border-jade-500"}`}
              style={{ backgroundColor: skin.bg }}>

              {/* Image area */}
              <div className="h-32 flex items-center justify-center overflow-hidden bg-black/20">
                {skin.imageUrl ? (
                  <img
                    src={skin.imageUrl}
                    alt={skin.name}
                    className="h-full w-full object-contain p-1"
                    onError={(e)=>{
                      const t = e.currentTarget;
                      t.style.display = "none";
                      const fb = t.nextElementSibling as HTMLElement|null;
                      if (fb) fb.style.display = "flex";
                    }}
                  />
                ) : null}
                {/* fallback shown when image missing or fails */}
                <div
                  className="w-full h-full items-center justify-center text-5xl"
                  style={{ display: skin.imageUrl ? "none" : "flex" }}>
                  {StyleComp
                    ? <StyleComp/>
                    : <span>{skin.emoji}</span>
                  }
                </div>
              </div>

              <div className="p-2 text-center bg-black/40">
                <p className="text-white text-sm font-bold truncate">{skin.name}</p>
                <p className="text-gray-300 text-xs truncate">{skin.label}</p>
                {!unlocked && (
                  <span className="text-jade-300 text-xs font-semibold capitalize">🔒 {skin.tier}</span>
                )}
              </div>
              {!unlocked && (
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center rounded-2xl">
                  <Lock size={26} className="text-jade-400"/>
                  <span className="text-jade-300 text-xs mt-1 font-bold capitalize">{skin.tier} Plan</span>
                  <span className="text-gray-300 text-xs mt-0.5">Tap to upgrade</span>
                </div>
              )}
              {active && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-jade-500 rounded-full flex items-center justify-center">
                  <Check size={14} className="text-white"/>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main Editor ───────────────────────────────────────────────────────────
interface Clip { id:string; label:string; duration:number; color:string; type:"clip"|"upload"; }

export default function EditorPage() {
  const navigate = useNavigate();
  const { user, aiProcessing, setAiProcessing, addProject } = useStore();
  const [tab, setTab] = useState("clips");
  const [clips, setClips] = useState<Clip[]>([]);
  const [filter, setFilter] = useState("None");
  const [speed, setSpeed] = useState("1x");
  const [volume, setVolume] = useState(80);
  const uploadRef = useRef<HTMLInputElement>(null);
  const limit = TIER_LIMITS[user.tier];
  const COLORS = ["#00A86B","#8B5CF6","#EF4444","#F59E0B","#0EA5E9","#EC4899"];

  const addClip = () => setClips((c) => [...c, { id:`clip-${Date.now()}`, label:`Clip ${c.length+1}`, duration: Math.floor(Math.random()*15)+5, color: COLORS[c.length%COLORS.length], type:"clip" }]);

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
    addProject({ id:`proj-${Date.now()}`, name:`Project ${new Date().toLocaleDateString()}`, clipCount: clips.length, duration: clips.reduce((a,c)=>a+c.duration,0), createdAt: new Date().toLocaleDateString() });
    if (confirm("Project saved! Go to Social to schedule posting?")) navigate("/social");
  };

  return (
    <div className="flex flex-col h-full bg-gray-900">
      {/* Preview */}
      <div className="bg-black h-48 md:h-56 flex items-center justify-center relative">
        {clips.length === 0 ? (
          <div className="text-center">
            <Film size={40} className="text-gray-700 mx-auto mb-2" />
            <p className="text-gray-500 mb-3">Add clips or upload footage to start editing</p>
            <div className="flex gap-3 justify-center">
              <button onClick={addClip} className="bg-jade-500 text-white px-4 py-2 rounded-xl font-bold hover:bg-jade-600 transition-colors text-sm">+ Add Clip</button>
              <button onClick={()=>uploadRef.current?.click()} className="bg-gray-700 text-white px-4 py-2 rounded-xl font-bold hover:bg-gray-600 transition-colors text-sm flex items-center gap-1"><Upload size={14}/> Upload</button>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: clips[0].color+"30" }}>
            <div className="text-center">
              <Film size={36} style={{ color: clips[0].color }} className="mx-auto mb-1" />
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
            <p className="text-white/70 text-xs">{c.duration}s · {c.type==="upload"?"📁":"🎬"}</p>
          </div>
        ))}
        <button onClick={addClip} className="w-14 h-12 border-2 border-dashed border-jade-600 rounded-lg flex flex-col items-center justify-center text-jade-400 shrink-0 hover:bg-jade-900/30 transition-colors">
          <Plus size={16}/><span className="text-xs">Clip</span>
        </button>
        <button onClick={()=>uploadRef.current?.click()} className="w-14 h-12 border-2 border-dashed border-blue-600 rounded-lg flex flex-col items-center justify-center text-blue-400 shrink-0 hover:bg-blue-900/30 transition-colors">
          <Upload size={16}/><span className="text-xs">Upload</span>
        </button>
      </div>

      {/* Hidden upload input */}
      <input ref={uploadRef} type="file" accept="video/*,image/*,audio/*" multiple className="hidden" onChange={handleUpload}/>

      {/* Tabs */}
      <div className="flex bg-gray-800 border-b border-gray-700 overflow-x-auto">
        {TABS.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex items-center gap-1 px-3 py-3 text-xs font-semibold border-b-2 shrink-0 transition-colors ${tab===t.id?"border-jade-400 text-jade-400":"border-transparent text-gray-400 hover:text-gray-200"}`}>
            <t.icon size={13}/><span className="hidden sm:inline">{t.label}</span>
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
              <input type="range" min={0} max={100} value={volume} onChange={(e)=>setVolume(+e.target.value)} className="w-full accent-jade-500" />
            </div>
          </div>
        )}

        {tab==="upload" && (
          <div className="space-y-4">
            <div className="text-center">
              <button onClick={()=>uploadRef.current?.click()}
                className="w-full border-2 border-dashed border-jade-600 rounded-2xl p-8 flex flex-col items-center gap-3 hover:bg-jade-900/20 transition-colors">
                <Upload size={40} className="text-jade-400"/>
                <p className="text-white font-bold text-lg">Upload Your Footage</p>
                <p className="text-gray-400 text-sm">Tap to select video, photo, or audio files</p>
                <p className="text-gray-500 text-xs">Supports MP4, MOV, AVI, JPG, PNG, MP3, WAV</p>
              </button>
            </div>
            {clips.filter(c=>c.type==="upload").length > 0 && (
              <div>
                <p className="text-gray-300 font-bold mb-2">Uploaded Files</p>
                <div className="space-y-2">
                  {clips.filter(c=>c.type==="upload").map((c)=>(
                    <div key={c.id} className="bg-gray-700 rounded-xl p-3 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{backgroundColor:c.color+"44"}}>
                        <Upload size={18} style={{color:c.color}}/>
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">{c.label}</p>
                        <p className="text-gray-400 text-xs">{c.duration}s · Added to timeline</p>
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
              <div key={t} className="bg-gray-800 rounded-xl p-3 flex items-center justify-between">
                <span className="text-white">{t}</span>
                <input type="checkbox" className="accent-jade-500 w-4 h-4" />
              </div>
            ))}
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
                className={`bg-gray-800 rounded-xl p-3 flex items-center gap-3 cursor-pointer hover:bg-gray-700 transition-colors ${!limit.aiFeatures?"opacity-60":""}`}>
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
