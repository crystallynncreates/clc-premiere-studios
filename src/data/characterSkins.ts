export type SkinTier = "free" | "basic" | "pro";
export type SkinCategory = "cartoon" | "anime" | "artist";

export interface CharSkin {
  id: string;
  name: string;
  category: SkinCategory;
  tier: SkinTier;
  label: string;    // short descriptor shown under the avatar
  bg: string;       // card background color
}

// ── FREE cartoon / animation characters ─────────────────────────────────────
export const FREE_SKINS: CharSkin[] = [
  { id:"c-pup",      name:"Scooby",          category:"cartoon", tier:"free", label:"Mystery Pup",     bg:"#78350F" },
  { id:"c-sponge",   name:"Sea Sponge",      category:"cartoon", tier:"free", label:"Krabby Hero",     bg:"#854D0E" },
  { id:"c-mouse",    name:"Toon Mouse",      category:"cartoon", tier:"free", label:"Classic Toon",    bg:"#374151" },
  { id:"c-princess", name:"Magic Princess",  category:"cartoon", tier:"free", label:"Royal Toon",      bg:"#86198F" },
  { id:"c-robot",    name:"Space Bot",       category:"cartoon", tier:"free", label:"Sci-Fi Hero",     bg:"#1E3A5F" },
  { id:"c-lion",     name:"Jungle King",     category:"cartoon", tier:"free", label:"Cartoon Wild",    bg:"#92400E" },
];

// ── PAID anime characters ────────────────────────────────────────────────────
export const ANIME_PAID_SKINS: CharSkin[] = [
  { id:"a-naruto",   name:"Naruto",          category:"anime", tier:"basic", label:"Leaf Ninja",       bg:"#C2410C" },
  { id:"a-pikachu",  name:"Pikachu",         category:"anime", tier:"basic", label:"Electric Pokémon", bg:"#CA8A04" },
  { id:"a-luffy",    name:"Luffy",           category:"anime", tier:"basic", label:"Straw Hat Pirate", bg:"#DC2626" },
  { id:"a-goku",     name:"Goku",            category:"anime", tier:"basic", label:"Super Saiyan",     bg:"#1D4ED8" },
  { id:"a-tanjiro",  name:"Tanjiro",         category:"anime", tier:"basic", label:"Demon Slayer",     bg:"#1E3A5F" },
  { id:"a-deku",     name:"Deku",            category:"anime", tier:"basic", label:"My Hero Academia", bg:"#166534" },
  { id:"a-sasuke",   name:"Sasuke",          category:"anime", tier:"pro",   label:"Uchiha Clan",      bg:"#1E1B4B" },
  { id:"a-sailor",   name:"Sailor Moon",     category:"anime", tier:"pro",   label:"Moon Guardian",    bg:"#7C3AED" },
  { id:"a-saitama",  name:"One Punch",       category:"anime", tier:"pro",   label:"Saitama",          bg:"#B45309" },
  { id:"a-zoro",     name:"Zoro",            category:"anime", tier:"pro",   label:"Three Sword Style",bg:"#064E3B" },
];

// ── PAID artist cartoon avatars ───────────────────────────────────────────────
export const ARTIST_SKINS: CharSkin[] = [
  { id:"ar-biggie",  name:"Biggie",          category:"artist", tier:"basic", label:"Brooklyn King",    bg:"#1C1C1C" },
  { id:"ar-tupac",   name:"2Pac",            category:"artist", tier:"basic", label:"Makaveli",         bg:"#292524" },
  { id:"ar-beyonce", name:"Queen B",         category:"artist", tier:"basic", label:"Pop Royalty",      bg:"#78350F" },
  { id:"ar-cardib",  name:"Cardi B",         category:"artist", tier:"basic", label:"Bronx Queen",      bg:"#831843" },
  { id:"ar-nicki",   name:"Nicki M.",        category:"artist", tier:"basic", label:"Pink Icon",        bg:"#BE185D" },
  { id:"ar-keisha",  name:"Keyshia Cole",    category:"artist", tier:"basic", label:"R&B Queen",        bg:"#3730A3" },
  { id:"ar-ed",      name:"Ed Sheeran",      category:"artist", tier:"pro",   label:"Ginger Troubadour",bg:"#7C2D12" },
  { id:"ar-stapleton",name:"C. Stapleton",   category:"artist", tier:"pro",   label:"Mountain Voice",   bg:"#292524" },
  { id:"ar-kpop1",   name:"K-Pop Idol",      category:"artist", tier:"pro",   label:"Stage Star",       bg:"#312E81" },
  { id:"ar-kpop2",   name:"K-Pop Queen",     category:"artist", tier:"pro",   label:"Hallyu Star",      bg:"#701A75" },
];

export const ALL_CHAR_SKINS = [...FREE_SKINS, ...ANIME_PAID_SKINS, ...ARTIST_SKINS];
