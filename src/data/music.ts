export interface MusicTrack { id:string; title:string; artist:string; genre:string; duration:number; bpm:number; isAIGenerated:boolean; url:string; waveform?:number[]; }

export const MUSIC_LIBRARY: MusicTrack[] = [
  {id:"pop-1", title:"Upbeat Pop Vibes",     artist:"SoundHelix Studios",  genre:"pop",    duration:222,bpm:128,isAIGenerated:false, url:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",  waveform:[.3,.7,.5,.8,.6,.9,.4,.7,.5,.6,.7,.4,.8,.5,.6,.9,.3,.7,.5,.8]},
  {id:"pop-2", title:"Electric Summer",      artist:"SoundHelix Studios",  genre:"pop",    duration:334,bpm:120,isAIGenerated:false, url:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",  waveform:[.4,.6,.8,.5,.7,.3,.9,.5,.6,.4,.8,.6,.5,.7,.4,.6,.8,.5,.7,.3]},
  {id:"pop-3", title:"Golden Hour Groove",   artist:"SoundHelix Studios",  genre:"pop",    duration:227,bpm:116,isAIGenerated:false, url:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",  waveform:[.5,.5,.7,.8,.6,.4,.7,.5,.6,.7,.5,.8,.6,.4,.7,.5,.6,.7,.5,.8]},
  {id:"pop-4", title:"Midnight Neon",        artist:"SoundHelix Studios",  genre:"pop",    duration:288,bpm:110,isAIGenerated:false, url:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",  waveform:[.6,.4,.8,.5,.7,.6,.3,.8,.5,.6,.4,.8,.5,.7,.6,.3,.8,.5,.6,.4]},
  {id:"pop-5", title:"Feel Good Friday",     artist:"SoundHelix Studios",  genre:"pop",    duration:315,bpm:124,isAIGenerated:false, url:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",  waveform:[.7,.5,.6,.8,.4,.7,.5,.6,.8,.4,.7,.5,.6,.8,.4,.7,.5,.6,.8,.4]},
  {id:"cty-1", title:"Open Road Anthem",     artist:"SoundHelix Studios",  genre:"country",duration:276,bpm:96, isAIGenerated:false, url:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",  waveform:[.4,.6,.5,.7,.5,.6,.4,.7,.5,.6,.4,.7,.5,.6,.4,.7,.5,.6,.4,.7]},
  {id:"cty-2", title:"Southern Sunset",      artist:"SoundHelix Studios",  genre:"country",duration:339,bpm:88, isAIGenerated:false, url:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",  waveform:[.3,.7,.6,.5,.8,.4,.6,.5,.7,.4,.3,.7,.6,.5,.8,.4,.6,.5,.7,.4]},
  {id:"cty-3", title:"Country Roads Vibes",  artist:"SoundHelix Studios",  genre:"country",duration:258,bpm:92, isAIGenerated:false, url:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",  waveform:[.5,.5,.7,.6,.4,.8,.5,.6,.4,.7,.5,.5,.7,.6,.4,.8,.5,.6,.4,.7]},
  {id:"cty-4", title:"Boots & Steel Guitar", artist:"SoundHelix Studios",  genre:"country",duration:245,bpm:100,isAIGenerated:false, url:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",  waveform:[.6,.4,.5,.8,.6,.4,.7,.5,.6,.5,.6,.4,.5,.8,.6,.4,.7,.5,.6,.5]},
  {id:"cty-5", title:"Wildflower Highway",   artist:"SoundHelix Studios",  genre:"country",duration:302,bpm:85, isAIGenerated:false, url:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", waveform:[.4,.7,.5,.6,.8,.3,.6,.7,.5,.4,.4,.7,.5,.6,.8,.3,.6,.7,.5,.4]},
  {id:"rap-1", title:"808 City Nights",      artist:"SoundHelix Studios",  genre:"rap",    duration:260,bpm:140,isAIGenerated:false, url:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3", waveform:[.8,.3,.9,.4,.8,.3,.9,.4,.8,.3,.8,.3,.9,.4,.8,.3,.9,.4,.8,.3]},
  {id:"rap-2", title:"Street Anthems",       artist:"SoundHelix Studios",  genre:"rap",    duration:281,bpm:136,isAIGenerated:false, url:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3", waveform:[.7,.4,.8,.5,.7,.4,.8,.5,.7,.4,.7,.4,.8,.5,.7,.4,.8,.5,.7,.4]},
  {id:"rap-3", title:"Hustle Hard Beat",     artist:"SoundHelix Studios",  genre:"rap",    duration:265,bpm:142,isAIGenerated:false, url:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3", waveform:[.9,.2,.8,.3,.9,.2,.8,.3,.9,.2,.9,.2,.8,.3,.9,.2,.8,.3,.9,.2]},
  {id:"rap-4", title:"Boss Flow",            artist:"SoundHelix Studios",  genre:"rap",    duration:293,bpm:130,isAIGenerated:false, url:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3", waveform:[.6,.5,.7,.6,.5,.7,.6,.5,.7,.6,.6,.5,.7,.6,.5,.7,.6,.5,.7,.6]},
  {id:"rap-5", title:"Crown Season",         artist:"SoundHelix Studios",  genre:"rap",    duration:275,bpm:138,isAIGenerated:false, url:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3", waveform:[.8,.4,.7,.5,.8,.4,.7,.5,.8,.4,.8,.4,.7,.5,.8,.4,.7,.5,.8,.4]},
  {id:"rnb-1", title:"Velvet Soul",          artist:"SoundHelix Studios",  genre:"rnb",    duration:316,bpm:90, isAIGenerated:false, url:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3", waveform:[.4,.6,.5,.7,.6,.5,.4,.7,.6,.5,.4,.6,.5,.7,.6,.5,.4,.7,.6,.5]},
  {id:"rnb-2", title:"After Hours Smooth",   artist:"SoundHelix Studios",  genre:"rnb",    duration:328,bpm:84, isAIGenerated:false, url:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3", waveform:[.5,.5,.6,.7,.5,.6,.5,.6,.7,.5,.5,.5,.6,.7,.5,.6,.5,.6,.7,.5]},
  {id:"rnb-3", title:"Silk Midnight",        artist:"SoundHelix Studios",  genre:"rnb",    duration:297,bpm:92, isAIGenerated:false, url:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",  waveform:[.6,.4,.7,.5,.6,.4,.7,.5,.6,.4,.6,.4,.7,.5,.6,.4,.7,.5,.6,.4]},
  {id:"rnb-4", title:"Ocean Breeze R&B",     artist:"SoundHelix Studios",  genre:"rnb",    duration:345,bpm:88, isAIGenerated:false, url:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",  waveform:[.5,.6,.4,.7,.5,.6,.4,.7,.5,.6,.5,.6,.4,.7,.5,.6,.4,.7,.5,.6]},
  {id:"rnb-5", title:"Lavender Nights",      artist:"SoundHelix Studios",  genre:"rnb",    duration:309,bpm:82, isAIGenerated:false, url:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",  waveform:[.4,.7,.5,.6,.4,.7,.5,.6,.4,.7,.4,.7,.5,.6,.4,.7,.5,.6,.4,.7]},
];

export const GENRE_LABELS: Record<string,string> = {
  pop:"Pop", country:"Country", rap:"Rap / Hip-Hop", rnb:"R&B", electronic:"Electronic", custom:"AI Created",
};

export function formatDuration(seconds:number):string {
  return `${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,"0")}`;
}
