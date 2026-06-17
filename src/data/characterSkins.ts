export type SkinTier = "free" | "basic" | "pro";
export type SkinCategory = "cartoon" | "anime" | "artist";

export interface CharSkin {
  id: string;
  name: string;
  category: SkinCategory;
  tier: SkinTier;
  label: string;
  bg: string;
  imageUrl: string;  // real picture URL
  emoji: string;     // fallback if image fails
}

// ── FREE cartoon / animation characters ──────────────────────────────────────
export const FREE_SKINS: CharSkin[] = [
  {
    id:"c-pup", name:"Scooby-Doo", category:"cartoon", tier:"free",
    label:"Mystery Inc.", bg:"#2D4A1E",
    imageUrl:"",
    emoji:"🐕",
  },
  {
    id:"c-sponge", name:"SpongeBob", category:"cartoon", tier:"free",
    label:"Krabby Hero", bg:"#854D0E",
    imageUrl:"https://pngimg.com/uploads/spongebob/spongebob_PNG43.png",
    emoji:"🧽",
  },
  {
    id:"c-mouse", name:"Tom Cat", category:"cartoon", tier:"free",
    label:"Tom & Jerry", bg:"#1E2A4A",
    imageUrl:"https://pngimg.com/uploads/tom_and_jerry/tom_and_jerry_PNG7.png",
    emoji:"🐱",
  },
  {
    id:"c-princess", name:"Cinderella", category:"cartoon", tier:"free",
    label:"Disney Princess", bg:"#1E3A8A",
    imageUrl:"https://pngimg.com/uploads/cinderella/cinderella_PNG20.png",
    emoji:"👸",
  },
  {
    id:"c-robot", name:"Bender", category:"cartoon", tier:"free",
    label:"Futurama", bg:"#1E3A5F",
    imageUrl:"https://pngimg.com/uploads/futurama/futurama_PNG7.png",
    emoji:"🤖",
  },
  {
    id:"c-lion", name:"Simba", category:"cartoon", tier:"free",
    label:"Lion King", bg:"#92400E",
    imageUrl:"https://pngimg.com/uploads/lion_king/lion_king_PNG4.png",
    emoji:"🦁",
  },
];

// ── PAID anime characters ─────────────────────────────────────────────────────
export const ANIME_PAID_SKINS: CharSkin[] = [
  {
    id:"a-naruto", name:"Naruto Uzumaki", category:"anime", tier:"basic",
    label:"Leaf Village Ninja", bg:"#7C2D12",
    imageUrl:"https://pngimg.com/uploads/naruto/naruto_PNG30.png",
    emoji:"🍥",
  },
  {
    id:"a-pikachu", name:"Pikachu", category:"anime", tier:"basic",
    label:"Electric Pokémon", bg:"#78350F",
    imageUrl:"https://pngimg.com/uploads/pokemon/pokemon_PNG14.png",
    emoji:"⚡",
  },
  {
    id:"a-luffy", name:"Monkey D. Luffy", category:"anime", tier:"basic",
    label:"Straw Hat Captain", bg:"#7F1D1D",
    imageUrl:"https://images3.alphacoders.com/130/1302570.jpg",
    emoji:"🏴‍☠️",
  },
  {
    id:"a-goku", name:"Son Goku", category:"anime", tier:"basic",
    label:"Super Saiyan", bg:"#1D4ED8",
    imageUrl:"https://s4.anilist.co/file/anilistcdn/character/large/246-wsRRr6z1kii8.png",
    emoji:"💥",
  },
  {
    id:"a-tanjiro", name:"Tanjiro Kamado", category:"anime", tier:"basic",
    label:"Demon Slayer", bg:"#1E3A5F",
    imageUrl:"https://s4.anilist.co/file/anilistcdn/character/large/b126071-BTNEc1nRIv68.png",
    emoji:"🗡️",
  },
  {
    id:"a-deku", name:"Izuku Midoriya", category:"anime", tier:"basic",
    label:"My Hero Academia", bg:"#166534",
    imageUrl:"https://s4.anilist.co/file/anilistcdn/character/large/b89028-8w1I9o1ISHMg.png",
    emoji:"💚",
  },
  {
    id:"a-sasuke", name:"Sasuke Uchiha", category:"anime", tier:"pro",
    label:"Uchiha Clan", bg:"#1E1B4B",
    imageUrl:"https://s4.anilist.co/file/anilistcdn/character/large/b13-SISLEw1oAD7a.png",
    emoji:"👁️",
  },
  {
    id:"a-sailor", name:"Sailor Moon", category:"anime", tier:"pro",
    label:"Moon Guardian", bg:"#4C1D95",
    imageUrl:"https://s4.anilist.co/file/anilistcdn/character/large/b2030-GQvVYPEYkXCy.jpg",
    emoji:"🌙",
  },
  {
    id:"a-saitama", name:"Saitama", category:"anime", tier:"pro",
    label:"One Punch Man", bg:"#78350F",
    imageUrl:"https://s4.anilist.co/file/anilistcdn/character/large/b73935-ON5d0mAcrItd.jpg",
    emoji:"👊",
  },
  {
    id:"a-zoro", name:"Roronoa Zoro", category:"anime", tier:"pro",
    label:"Three Sword Style", bg:"#064E3B",
    imageUrl:"https://s4.anilist.co/file/anilistcdn/character/large/b62-S7oAeA9WInjV.png",
    emoji:"⚔️",
  },
];

// ── PAID artist skins ─────────────────────────────────────────────────────────
export const ARTIST_SKINS: CharSkin[] = [
  {
    id:"ar-biggie", name:"Biggie Smalls", category:"artist", tier:"basic",
    label:"Brooklyn King", bg:"#1C1C1C",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/a/ae/Notorious_BIG.jpg",
    emoji:"👑",
  },
  {
    id:"ar-tupac", name:"Tupac Shakur", category:"artist", tier:"basic",
    label:"Makaveli", bg:"#292524",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/a/a8/Tupac_Shakur_1993.jpg",
    emoji:"🕊️",
  },
  {
    id:"ar-beyonce", name:"Beyoncé", category:"artist", tier:"basic",
    label:"Pop Royalty", bg:"#78350F",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Beyonc%C3%A9_at_The_Formation_World_Tour.jpg/440px-Beyonc%C3%A9_at_The_Formation_World_Tour.jpg",
    emoji:"👑",
  },
  {
    id:"ar-cardib", name:"Cardi B", category:"artist", tier:"basic",
    label:"Bronx Queen", bg:"#831843",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Cardi_B_at_the_2019_Met_Gala.jpg/440px-Cardi_B_at_the_2019_Met_Gala.jpg",
    emoji:"💅",
  },
  {
    id:"ar-nicki", name:"Nicki Minaj", category:"artist", tier:"basic",
    label:"Pink Icon", bg:"#BE185D",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Nicki_Minaj_2015.jpg/440px-Nicki_Minaj_2015.jpg",
    emoji:"💗",
  },
  {
    id:"ar-keisha", name:"Keyshia Cole", category:"artist", tier:"basic",
    label:"R&B Queen", bg:"#3730A3",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Keyshia_Cole_2009.jpg/440px-Keyshia_Cole_2009.jpg",
    emoji:"🎤",
  },
  {
    id:"ar-ed", name:"Ed Sheeran", category:"artist", tier:"pro",
    label:"Ginger Troubadour", bg:"#7C2D12",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Ed_Sheeran_2013.jpg/440px-Ed_Sheeran_2013.jpg",
    emoji:"🎸",
  },
  {
    id:"ar-stapleton", name:"Chris Stapleton", category:"artist", tier:"pro",
    label:"Mountain Voice", bg:"#292524",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Chris_Stapleton_2016.jpg/440px-Chris_Stapleton_2016.jpg",
    emoji:"🤠",
  },
  {
    id:"ar-kpop1", name:"BTS", category:"artist", tier:"pro",
    label:"K-Pop Icons", bg:"#312E81",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/191028_BTS_at_the_2019_Seoul_International_Drama_Awards.jpg/440px-191028_BTS_at_the_2019_Seoul_International_Drama_Awards.jpg",
    emoji:"⭐",
  },
  {
    id:"ar-kpop2", name:"BLACKPINK", category:"artist", tier:"pro",
    label:"Hallyu Queens", bg:"#701A75",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Blackpink_at_Coachella_2019.jpg/440px-Blackpink_at_Coachella_2019.jpg",
    emoji:"🖤",
  },
];

// ── Content style overlays ────────────────────────────────────────────────────
export const STYLE_SKINS: CharSkin[] = [
  { id:"st-tiktok",  name:"TikTok Style",   category:"cartoon", tier:"basic", label:"Bold Captions + Subs", bg:"#0A0A1A", imageUrl:"", emoji:"📱" },
  { id:"st-yt-doc",  name:"YT Documentary", category:"cartoon", tier:"basic", label:"Dark Cinematic Look",  bg:"#0D0D0D", imageUrl:"", emoji:"🎬" },
  { id:"st-ig-reel", name:"Instagram Reel", category:"cartoon", tier:"basic", label:"Bright Fast Cuts",     bg:"#8134AF", imageUrl:"", emoji:"📸" },
  { id:"st-gaming",  name:"Gaming Overlay", category:"cartoon", tier:"basic", label:"HUD + Crosshair",      bg:"#0A0A14", imageUrl:"", emoji:"🎮" },
];

export const ALL_CHAR_SKINS = [...FREE_SKINS, ...ANIME_PAID_SKINS, ...ARTIST_SKINS, ...STYLE_SKINS];
