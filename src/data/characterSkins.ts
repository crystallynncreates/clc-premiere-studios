// ── LEGAL NOTICE ──────────────────────────────────────────────────────────────
// Character names and likenesses are trademarks of their respective owners.
// These skins are shown as a preview catalog for prototype purposes only.
// Commercial deployment requires licensing agreements with each IP holder:
//   • Anime characters: respective Japanese studios / Viz Media / Crunchyroll
//   • Disney / Pixar characters: The Walt Disney Company
//   • Marvel characters: Marvel Entertainment, LLC (Disney)
//   • Cartoon characters: Warner Bros., Nickelodeon, etc.
// Music licensing: BMI / ASCAP / SESAC or direct label agreement required.
// ──────────────────────────────────────────────────────────────────────────────

export type SkinTier = "free" | "basic" | "pro";
export type SkinCategory = "cartoon" | "anime" | "marvel-disney" | "artist";

export interface CharSkin {
  id: string;
  name: string;
  category: SkinCategory;
  tier: SkinTier;
  label: string;
  bg: string;
  imageUrl: string;
  emoji: string;
}

// ── FREE CARTOON CHARACTERS ───────────────────────────────────────────────────
// Images sourced from Wikipedia Commons (CC-licensed press/promo images)
// or pngimg.com (fan/editorial use). Commercial deployment needs full IP license.
export const FREE_SKINS: CharSkin[] = [
  {
    id: "c-bugs", name: "Bugs Bunny", category: "cartoon", tier: "free",
    label: "Looney Tunes", bg: "#1a2e1a",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/4/4a/Bugs_Bunny.png",
    emoji: "🐰",
  },
  {
    id: "c-sponge", name: "SpongeBob SquarePants", category: "cartoon", tier: "free",
    label: "Bikini Bottom", bg: "#854D0E",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/3/3b/SpongeBob_SquarePants_character.svg",
    emoji: "🧽",
  },
  {
    id: "c-tom", name: "Tom Cat", category: "cartoon", tier: "free",
    label: "Tom & Jerry", bg: "#1E2A4A",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/1/14/Tom_Tom_and_Jerry.png",
    emoji: "🐱",
  },
  {
    id: "c-scooby", name: "Scooby-Doo", category: "cartoon", tier: "free",
    label: "Mystery Inc.", bg: "#2D4A1E",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/5/53/Scooby-Doo.png",
    emoji: "🐕",
  },
  {
    id: "c-bart", name: "Bart Simpson", category: "cartoon", tier: "free",
    label: "The Simpsons", bg: "#854D0E",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/a/aa/Bart_Simpson_200px.png",
    emoji: "👦",
  },
  {
    id: "c-stewie", name: "Stewie Griffin", category: "cartoon", tier: "free",
    label: "Family Guy", bg: "#1E3A5F",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/b/b3/Stewie_Griffin.png",
    emoji: "👶",
  },
];

// ── PAID ANIME CHARACTERS ─────────────────────────────────────────────────────
// Images from AniList CDN (anilist.co) — official character art.
// Commercial use requires licensing from respective studios.
export const ANIME_PAID_SKINS: CharSkin[] = [
  {
    id: "a-naruto", name: "Naruto Uzumaki", category: "anime", tier: "basic",
    label: "Leaf Village Ninja", bg: "#7C2D12",
    imageUrl: "https://s4.anilist.co/file/anilistcdn/character/large/b17-OnAef4ToQqOR.png",
    emoji: "🍥",
  },
  {
    id: "a-goku", name: "Son Goku", category: "anime", tier: "basic",
    label: "Dragon Ball Z", bg: "#1D4ED8",
    imageUrl: "https://s4.anilist.co/file/anilistcdn/character/large/b246-wsRRr6z1kii8.png",
    emoji: "💥",
  },
  {
    id: "a-pikachu", name: "Pikachu", category: "anime", tier: "basic",
    label: "Pokémon", bg: "#78350F",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Jigglypuff_Pokémon_anime.png/240px-Jigglypuff_Pokémon_anime.png",
    emoji: "⚡",
  },
  {
    id: "a-luffy", name: "Monkey D. Luffy", category: "anime", tier: "basic",
    label: "One Piece", bg: "#7F1D1D",
    imageUrl: "https://s4.anilist.co/file/anilistcdn/character/large/b40-YoHBHCDHbngV.png",
    emoji: "🏴‍☠️",
  },
  {
    id: "a-tanjiro", name: "Tanjiro Kamado", category: "anime", tier: "basic",
    label: "Demon Slayer", bg: "#1E3A5F",
    imageUrl: "https://s4.anilist.co/file/anilistcdn/character/large/b126071-BTNEc1nRIv68.png",
    emoji: "🗡️",
  },
  {
    id: "a-deku", name: "Izuku Midoriya", category: "anime", tier: "basic",
    label: "My Hero Academia", bg: "#166534",
    imageUrl: "https://s4.anilist.co/file/anilistcdn/character/large/b89028-8w1I9o1ISHMg.png",
    emoji: "💚",
  },
  {
    id: "a-sasuke", name: "Sasuke Uchiha", category: "anime", tier: "basic",
    label: "Naruto", bg: "#1E1B4B",
    imageUrl: "https://s4.anilist.co/file/anilistcdn/character/large/b13-SISLEw1oAD7a.png",
    emoji: "👁️",
  },
  {
    id: "a-sailor", name: "Sailor Moon", category: "anime", tier: "basic",
    label: "Sailor Moon", bg: "#4C1D95",
    imageUrl: "https://s4.anilist.co/file/anilistcdn/character/large/b2030-GQvVYPEYkXCy.jpg",
    emoji: "🌙",
  },
  {
    id: "a-saitama", name: "Saitama", category: "anime", tier: "basic",
    label: "One Punch Man", bg: "#78350F",
    imageUrl: "https://s4.anilist.co/file/anilistcdn/character/large/b73935-ON5d0mAcrItd.jpg",
    emoji: "👊",
  },
  {
    id: "a-zoro", name: "Roronoa Zoro", category: "anime", tier: "basic",
    label: "One Piece", bg: "#064E3B",
    imageUrl: "https://s4.anilist.co/file/anilistcdn/character/large/b62-S7oAeA9WInjV.png",
    emoji: "⚔️",
  },
  {
    id: "a-zenitsu", name: "Zenitsu Agatsuma", category: "anime", tier: "basic",
    label: "Demon Slayer", bg: "#78350F",
    imageUrl: "https://s4.anilist.co/file/anilistcdn/character/large/b126072-MlT7u4r3nNbQ.png",
    emoji: "⚡",
  },
  {
    id: "a-itachi", name: "Itachi Uchiha", category: "anime", tier: "pro",
    label: "Naruto", bg: "#0F0F1A",
    imageUrl: "https://s4.anilist.co/file/anilistcdn/character/large/b14-JHHrqBsGcMpD.png",
    emoji: "🌑",
  },
  {
    id: "a-eren", name: "Eren Yeager", category: "anime", tier: "pro",
    label: "Attack on Titan", bg: "#1A1A2E",
    imageUrl: "https://s4.anilist.co/file/anilistcdn/character/large/b40882-YJwJnzGjDXOW.png",
    emoji: "⚡",
  },
  {
    id: "a-mikasa", name: "Mikasa Ackerman", category: "anime", tier: "pro",
    label: "Attack on Titan", bg: "#1C1C2E",
    imageUrl: "https://s4.anilist.co/file/anilistcdn/character/large/b40883-cAXSAAlTnPPz.png",
    emoji: "🗡️",
  },
  {
    id: "a-nezuko", name: "Nezuko Kamado", category: "anime", tier: "pro",
    label: "Demon Slayer", bg: "#4A1942",
    imageUrl: "https://s4.anilist.co/file/anilistcdn/character/large/b126074-BFMA3VqGZHVb.png",
    emoji: "🌸",
  },
  {
    id: "a-levi", name: "Levi Ackerman", category: "anime", tier: "pro",
    label: "Attack on Titan", bg: "#0A0A14",
    imageUrl: "https://s4.anilist.co/file/anilistcdn/character/large/b40881-YL2TARfaJPRH.png",
    emoji: "⚔️",
  },
  {
    id: "a-killua", name: "Killua Zoldyck", category: "anime", tier: "pro",
    label: "Hunter x Hunter", bg: "#0F1A2A",
    imageUrl: "https://s4.anilist.co/file/anilistcdn/character/large/b30-pCDlBi2tLWaw.png",
    emoji: "⚡",
  },
  {
    id: "a-gon", name: "Gon Freecss", category: "anime", tier: "pro",
    label: "Hunter x Hunter", bg: "#14401A",
    imageUrl: "https://s4.anilist.co/file/anilistcdn/character/large/b30-pCDlBi2tLWaw.png",
    emoji: "🌿",
  },
];

// ── MARVEL & DISNEY PRO-TIER SKINS ────────────────────────────────────────────
// ⚠️  LICENSING REQUIRED: Marvel characters © Marvel Entertainment / Disney.
//     Disney characters © The Walt Disney Company.
//     These appear as a preview catalog. A licensing agreement with Disney /
//     Marvel must be executed before commercial launch of this feature.
//     Contact: marvel.com/licensing  |  disneylicensing.com
export const MARVEL_DISNEY_SKINS: CharSkin[] = [
  // ── Marvel ──
  {
    id: "mv-spiderman", name: "Spider-Man", category: "marvel-disney", tier: "pro",
    label: "Marvel · Pro Frame", bg: "#7F1D1D",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/2/21/Web_of_Spider-Man_Vol_1_129-1.png",
    emoji: "🕷️",
  },
  {
    id: "mv-ironman", name: "Iron Man", category: "marvel-disney", tier: "pro",
    label: "Marvel · Pro Frame", bg: "#7C2D12",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/4/47/Iron_Man_%28circa_2018%29.png",
    emoji: "🦾",
  },
  {
    id: "mv-blackpanther", name: "Black Panther", category: "marvel-disney", tier: "pro",
    label: "Marvel · Pro Frame", bg: "#0F0F1A",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/8/85/Black_Panther_%28T%27Challa%29.png",
    emoji: "🐾",
  },
  {
    id: "mv-captain", name: "Captain America", category: "marvel-disney", tier: "pro",
    label: "Marvel · Pro Frame", bg: "#1D3A6E",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/3/35/Captain_America_Vol_7_1_Cassaday_Variant_Textless.jpg",
    emoji: "🛡️",
  },
  {
    id: "mv-thor", name: "Thor", category: "marvel-disney", tier: "pro",
    label: "Marvel · Pro Frame", bg: "#1E2A5F",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/e/e5/Thor_Odinson.jpg",
    emoji: "⚡",
  },
  {
    id: "mv-wanda", name: "Scarlet Witch", category: "marvel-disney", tier: "pro",
    label: "Marvel · Pro Frame", bg: "#4A0A0A",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/9/98/Wanda_Maximoff_WandaVision.jpg",
    emoji: "🔮",
  },
  {
    id: "mv-bwidow", name: "Black Widow", category: "marvel-disney", tier: "pro",
    label: "Marvel · Pro Frame", bg: "#0A0A0A",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/4/4c/Black_Widow_%28Natasha_Romanova%29.png",
    emoji: "🕷️",
  },
  {
    id: "mv-hulk", name: "The Hulk", category: "marvel-disney", tier: "pro",
    label: "Marvel · Pro Frame", bg: "#14401A",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/5/59/Hulk_%28comics_character%29.png",
    emoji: "💚",
  },
  // ── Disney / Pixar ──
  {
    id: "ds-moana", name: "Moana", category: "marvel-disney", tier: "pro",
    label: "Disney · Pro Frame", bg: "#0A2A4A",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/5/59/Moana_%28Disney_character%29.png",
    emoji: "🌊",
  },
  {
    id: "ds-encanto", name: "Mirabel (Encanto)", category: "marvel-disney", tier: "pro",
    label: "Disney · Pro Frame", bg: "#1A0A2A",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/7/7d/Mirabel_Madrigal.png",
    emoji: "🦋",
  },
  {
    id: "ds-frozone", name: "Frozone", category: "marvel-disney", tier: "pro",
    label: "The Incredibles · Pro", bg: "#0A2A3A",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/9/9e/Frozone.png",
    emoji: "❄️",
  },
  {
    id: "ds-lightningmcqueen", name: "Lightning McQueen", category: "marvel-disney", tier: "pro",
    label: "Pixar Cars · Pro Frame", bg: "#7F1D1D",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/5/59/LightningMcQueenFilmCaracter.png",
    emoji: "🏎️",
  },
  {
    id: "ds-tiana", name: "Princess Tiana", category: "marvel-disney", tier: "pro",
    label: "Disney · Pro Frame", bg: "#0A2A14",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/4/49/Tiana_%28Disney%29.png",
    emoji: "🐸",
  },
  {
    id: "ds-simba", name: "Adult Simba", category: "marvel-disney", tier: "pro",
    label: "The Lion King · Pro", bg: "#92400E",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/5/57/The_Lion_King_Simba.png",
    emoji: "🦁",
  },
  {
    id: "ds-elsa", name: "Elsa", category: "marvel-disney", tier: "pro",
    label: "Frozen · Pro Frame", bg: "#0A2A3A",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/8/8d/Elsa_%28Disney%27s_Frozen%29.png",
    emoji: "❄️",
  },
  {
    id: "ds-mulan", name: "Mulan", category: "marvel-disney", tier: "pro",
    label: "Disney · Pro Frame", bg: "#4A0A0A",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/4/4d/Fa_Mulan.png",
    emoji: "🌸",
  },
];

// ── ARTIST SKINS ──────────────────────────────────────────────────────────────
// Images from Wikipedia Commons (CC-licensed press photos).
export const ARTIST_SKINS: CharSkin[] = [
  {
    id: "ar-beyonce", name: "Beyoncé", category: "artist", tier: "basic",
    label: "Pop Royalty", bg: "#78350F",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Beyonc%C3%A9_at_The_Formation_World_Tour.jpg/440px-Beyonc%C3%A9_at_The_Formation_World_Tour.jpg",
    emoji: "👑",
  },
  {
    id: "ar-nicki", name: "Nicki Minaj", category: "artist", tier: "basic",
    label: "Pink Icon", bg: "#BE185D",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Nicki_Minaj_2015.jpg/440px-Nicki_Minaj_2015.jpg",
    emoji: "💗",
  },
  {
    id: "ar-cardib", name: "Cardi B", category: "artist", tier: "basic",
    label: "Bronx Queen", bg: "#831843",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Cardi_B_at_the_2019_Met_Gala.jpg/440px-Cardi_B_at_the_2019_Met_Gala.jpg",
    emoji: "💅",
  },
  {
    id: "ar-biggie", name: "The Notorious B.I.G.", category: "artist", tier: "basic",
    label: "Brooklyn Legend", bg: "#1C1C1C",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Notorious_BIG.jpg",
    emoji: "👑",
  },
  {
    id: "ar-tupac", name: "Tupac Shakur", category: "artist", tier: "basic",
    label: "Makaveli", bg: "#292524",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Tupac_Shakur_1993.jpg",
    emoji: "🕊️",
  },
  {
    id: "ar-keisha", name: "Keyshia Cole", category: "artist", tier: "basic",
    label: "R&B Queen", bg: "#3730A3",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Keyshia_Cole_2009.jpg/440px-Keyshia_Cole_2009.jpg",
    emoji: "🎤",
  },
  {
    id: "ar-ed", name: "Ed Sheeran", category: "artist", tier: "pro",
    label: "Ginger Troubadour", bg: "#7C2D12",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Ed_Sheeran_2013.jpg/440px-Ed_Sheeran_2013.jpg",
    emoji: "🎸",
  },
  {
    id: "ar-stapleton", name: "Chris Stapleton", category: "artist", tier: "pro",
    label: "Mountain Voice", bg: "#292524",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Chris_Stapleton_2016.jpg/440px-Chris_Stapleton_2016.jpg",
    emoji: "🤠",
  },
  {
    id: "ar-bts", name: "BTS", category: "artist", tier: "pro",
    label: "K-Pop Icons", bg: "#312E81",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/191028_BTS_at_the_2019_Seoul_International_Drama_Awards.jpg/440px-191028_BTS_at_the_2019_Seoul_International_Drama_Awards.jpg",
    emoji: "⭐",
  },
  {
    id: "ar-blackpink", name: "BLACKPINK", category: "artist", tier: "pro",
    label: "Hallyu Queens", bg: "#701A75",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Blackpink_at_Coachella_2019.jpg/440px-Blackpink_at_Coachella_2019.jpg",
    emoji: "🖤",
  },
];

// ── CONTENT STYLE OVERLAYS ────────────────────────────────────────────────────
export const STYLE_SKINS: CharSkin[] = [
  { id:"st-tiktok",  name:"TikTok Style",   category:"cartoon", tier:"basic", label:"Bold Captions + Subs", bg:"#0A0A1A", imageUrl:"", emoji:"📱" },
  { id:"st-yt-doc",  name:"YT Documentary", category:"cartoon", tier:"basic", label:"Dark Cinematic Look",  bg:"#0D0D0D", imageUrl:"", emoji:"🎬" },
  { id:"st-ig-reel", name:"Instagram Reel", category:"cartoon", tier:"basic", label:"Bright Fast Cuts",     bg:"#8134AF", imageUrl:"", emoji:"📸" },
  { id:"st-gaming",  name:"Gaming Overlay", category:"cartoon", tier:"basic", label:"HUD + Crosshair",      bg:"#0A0A14", imageUrl:"", emoji:"🎮" },
];

export const ALL_CHAR_SKINS = [
  ...FREE_SKINS,
  ...ANIME_PAID_SKINS,
  ...ARTIST_SKINS,
  ...MARVEL_DISNEY_SKINS,
  ...STYLE_SKINS,
];
