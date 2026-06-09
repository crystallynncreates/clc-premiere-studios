# CLC Premiere Studios — Setup Guide

## What's Built

A full **React Native + Expo** app targeting iOS, Android, and Web from one codebase.

### Features Included
- **Stream Studio** — live streaming + face cam recording with daily time limits by plan
- **Video Editor** — CapCut/Splice-style editor with filters, speed, transitions, AI tools
- **Music Library** — royalty-free pop/country/rap/R&B tracks + AI music creator
- **Social Hub** — connect YouTube, Instagram, X, Snapchat + schedule posts
- **60 Cartoon Skins** — 30 retro 80s/90s + 30 anime (SVG-rendered avatars)
- **AI Features** — audio perfection, video enhancement, smart captions, music generation
- **Subscription Tiers** — Free (3 min/day) · Basic $4.99 (50 min, 1 post, 1 skin/mo) · Pro $10 (unlimited)
- **Jade color theme** throughout
- **Crystal Lynn Creates logo** (SVG recreation — see step 3 to add your actual logo)

---

## Installation

### Prerequisites
- **Node.js 18+** — Download from https://nodejs.org (choose "LTS" version)
  - After installing, restart your terminal/PowerShell
- Expo CLI: `npm install -g expo-cli`
- For iOS: Xcode (Mac only)
- For Android: Android Studio

### Steps

```bash
cd clc-premiere-studios
npm install
npx expo start
```

Then press:
- `w` → open in browser (web)
- `a` → open in Android emulator
- `i` → open in iOS simulator
- Scan QR code with Expo Go app on your phone

---

## Adding Your Real Logo

1. Save your Crystal Lynn Creates logo PNG to: `assets/logo.png`
2. In `components/Logo.tsx`, replace `<CLCLogo />` with:
   ```tsx
   import { Image } from "react-native";
   <Image source={require("../assets/logo.png")} style={{ width: size, height: size }} resizeMode="contain" />
   ```

---

## Production Integrations Needed

### Payments (Stripe)
- Install `@stripe/stripe-react-native`
- Add your Stripe publishable key
- Replace the `handleUpgrade` Alert in `app/account.tsx` with real Stripe Payment Sheet

### Social Media OAuth
Each platform requires developer account approval:

| Platform | Developer Portal | Approval Time |
|----------|-----------------|---------------|
| YouTube | Google Cloud Console | ~1 week |
| Instagram | Meta for Developers | 1-4 weeks |
| X (Twitter) | developer.twitter.com | ~1 week |
| Snapchat | developers.snap.com | 2-4 weeks |

Replace the `handleConnect` Alert in `app/social.tsx` with actual OAuth WebView flows.

### AI Features
- **Audio Enhancement**: AssemblyAI or Dolby.io Audio API
- **Video AI**: Twelve Labs or RunwayML API
- **Music Generation**: Suno AI API or Udio API
- **Voice-to-Song**: ElevenLabs + Suno AI combined
- **AI Captions**: OpenAI Whisper API

### Streaming
- **Live Streaming**: Mux (mux.com) or Agora.io
- Both have React Native SDKs

### Music Licensing
Current tracks are royalty-free placeholders. For mainstream songs:
- License through **Musicbed**, **Artlist**, or **Epidemic Sound**
- Or partner with labels directly

---

## File Structure

```
clc-premiere-studios/
├── app/                  # Expo Router pages (tabs)
│   ├── _layout.tsx       # Tab navigation + Header
│   ├── index.tsx         # Home dashboard
│   ├── studio.tsx        # Stream Studio
│   ├── editor.tsx        # Video Editor
│   ├── music.tsx         # Music Library + AI Music
│   ├── social.tsx        # Social Media Hub
│   ├── skins.tsx         # 60 Cartoon Skins
│   └── account.tsx       # Plans & Billing
├── components/
│   ├── Logo.tsx          # SVG CLC logo
│   └── layout/Header.tsx # App header
├── store/useStore.ts     # Zustand global state
├── types/index.ts        # TypeScript types + tier limits
├── data/
│   ├── skins.ts          # All 60 cartoon skin definitions
│   └── music.ts          # Music library tracks
└── SETUP.md              # This file
```

---

## Publishing

### Web
```bash
npx expo export --platform web
# Deploy the dist/ folder to Vercel, Netlify, or any static host
```

### iOS App Store
```bash
npx eas build --platform ios
npx eas submit --platform ios
```

### Google Play
```bash
npx eas build --platform android
npx eas submit --platform android
```

Requires an **Expo EAS** account (free tier available at expo.dev).
