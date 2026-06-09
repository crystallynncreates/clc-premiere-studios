import type { MusicTrack } from "../types";

// NOTE: Current chart songs (Billboard, etc.) are copyrighted and require licensing.
// This library uses royalty-free tracks from sources like Free Music Archive,
// ccMixter, and Incompetech. For mainstream licensed music, integrate with
// services like Musicbed, Artlist, or direct label agreements.

export const MUSIC_LIBRARY: MusicTrack[] = [
  // Pop
  { id: "pop-1",  title: "Electric Feel",       artist: "Studio Session",   genre: "pop",     duration: 198, bpm: 128, isAIGenerated: false, waveform: [0.3,0.7,0.5,0.8,0.6,0.9,0.4,0.7,0.5,0.6] },
  { id: "pop-2",  title: "Neon Lights",         artist: "Crystal Beats",    genre: "pop",     duration: 210, bpm: 120, isAIGenerated: false, waveform: [0.4,0.6,0.8,0.5,0.7,0.3,0.9,0.5,0.6,0.4] },
  { id: "pop-3",  title: "Summer Glow",         artist: "Royalty Free Co",  genre: "pop",     duration: 185, bpm: 116, isAIGenerated: false, waveform: [0.5,0.5,0.7,0.8,0.6,0.4,0.7,0.5,0.6,0.7] },
  { id: "pop-4",  title: "Midnight Drive",      artist: "Studio Session",   genre: "pop",     duration: 222, bpm: 110, isAIGenerated: false, waveform: [0.6,0.4,0.8,0.5,0.7,0.6,0.3,0.8,0.5,0.6] },
  { id: "pop-5",  title: "Golden Hour",         artist: "Sunwave",          genre: "pop",     duration: 195, bpm: 124, isAIGenerated: false, waveform: [0.7,0.5,0.6,0.8,0.4,0.7,0.5,0.6,0.8,0.4] },
  // Country
  { id: "cty-1", title: "Dirt Road Anthem",     artist: "Southern Sounds",  genre: "country", duration: 215, bpm: 96,  isAIGenerated: false, waveform: [0.4,0.6,0.5,0.7,0.5,0.6,0.4,0.7,0.5,0.6] },
  { id: "cty-2", title: "Boots & Fireflies",    artist: "Country Free",     genre: "country", duration: 228, bpm: 88,  isAIGenerated: false, waveform: [0.3,0.7,0.6,0.5,0.8,0.4,0.6,0.5,0.7,0.4] },
  { id: "cty-3", title: "Wide Open Spaces",     artist: "Lone Star RF",     genre: "country", duration: 205, bpm: 92,  isAIGenerated: false, waveform: [0.5,0.5,0.7,0.6,0.4,0.8,0.5,0.6,0.4,0.7] },
  { id: "cty-4", title: "Honky Tonk Nights",    artist: "Southern Sounds",  genre: "country", duration: 190, bpm: 100, isAIGenerated: false, waveform: [0.6,0.4,0.5,0.8,0.6,0.4,0.7,0.5,0.6,0.5] },
  { id: "cty-5", title: "Whiskey & Wildflowers",artist: "Country Free",     genre: "country", duration: 235, bpm: 85,  isAIGenerated: false, waveform: [0.4,0.7,0.5,0.6,0.8,0.3,0.6,0.7,0.5,0.4] },
  // Rap / Hip-Hop
  { id: "rap-1", title: "808 Reality",          artist: "Trap Beats RF",    genre: "rap",     duration: 200, bpm: 140, isAIGenerated: false, waveform: [0.8,0.3,0.9,0.4,0.8,0.3,0.9,0.4,0.8,0.3] },
  { id: "rap-2", title: "City Lights",          artist: "Urban RF",         genre: "rap",     duration: 212, bpm: 136, isAIGenerated: false, waveform: [0.7,0.4,0.8,0.5,0.7,0.4,0.8,0.5,0.7,0.4] },
  { id: "rap-3", title: "Hustle Season",        artist: "Trap Beats RF",    genre: "rap",     duration: 195, bpm: 142, isAIGenerated: false, waveform: [0.9,0.2,0.8,0.3,0.9,0.2,0.8,0.3,0.9,0.2] },
  { id: "rap-4", title: "Crown Up",             artist: "Beat Factory RF",  genre: "rap",     duration: 225, bpm: 130, isAIGenerated: false, waveform: [0.6,0.5,0.7,0.6,0.5,0.7,0.6,0.5,0.7,0.6] },
  { id: "rap-5", title: "West Coast Wind",      artist: "Urban RF",         genre: "rap",     duration: 208, bpm: 138, isAIGenerated: false, waveform: [0.8,0.4,0.7,0.5,0.8,0.4,0.7,0.5,0.8,0.4] },
  // R&B
  { id: "rnb-1", title: "Velvet Moonlight",     artist: "Soul Sessions",    genre: "rnb",     duration: 230, bpm: 90,  isAIGenerated: false, waveform: [0.4,0.6,0.5,0.7,0.6,0.5,0.4,0.7,0.6,0.5] },
  { id: "rnb-2", title: "After Midnight",       artist: "Smooth RF",        genre: "rnb",     duration: 245, bpm: 84,  isAIGenerated: false, waveform: [0.5,0.5,0.6,0.7,0.5,0.6,0.5,0.6,0.7,0.5] },
  { id: "rnb-3", title: "Silk & Gold",          artist: "Soul Sessions",    genre: "rnb",     duration: 218, bpm: 92,  isAIGenerated: false, waveform: [0.6,0.4,0.7,0.5,0.6,0.4,0.7,0.5,0.6,0.4] },
  { id: "rnb-4", title: "Ocean Deep",           artist: "Neo Soul RF",      genre: "rnb",     duration: 252, bpm: 88,  isAIGenerated: false, waveform: [0.5,0.6,0.4,0.7,0.5,0.6,0.4,0.7,0.5,0.6] },
  { id: "rnb-5", title: "Lavender Sky",         artist: "Smooth RF",        genre: "rnb",     duration: 225, bpm: 82,  isAIGenerated: false, waveform: [0.4,0.7,0.5,0.6,0.4,0.7,0.5,0.6,0.4,0.7] },
];

export const GENRE_LABELS: Record<string, string> = {
  pop: "Pop",
  country: "Country",
  rap: "Rap / Hip-Hop",
  rnb: "R&B",
  electronic: "Electronic",
  custom: "AI Created",
};

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}
