export type SubscriptionTier = "free" | "basic" | "pro";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  tier: SubscriptionTier;
  recordingSecondsUsedToday: number;
  connectedAccounts: SocialAccount[];
  unlockedSkins: string[];
  currentSkin: string | null;
}

export interface SocialAccount {
  platform: "youtube" | "instagram" | "twitter" | "snapchat";
  username: string;
  connected: boolean;
  accessToken?: string;
}

export interface ScheduledPost {
  id: string;
  videoUri: string;
  thumbnail: string;
  caption: string;
  platforms: SocialAccount["platform"][];
  scheduledAt: Date;
  status: "pending" | "published" | "failed";
}

export interface CartoonSkin {
  id: string;
  name: string;
  era: "retro" | "anime";
  category: string;
  colors: string[];
  isPremium: boolean;
  unlocksAt?: SubscriptionTier;
}

export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  genre: "pop" | "country" | "rap" | "rnb" | "electronic" | "custom";
  duration: number;
  bpm: number;
  isAIGenerated: boolean;
  uri?: string;
  waveform?: number[];
}

export interface VideoProject {
  id: string;
  name: string;
  clips: VideoClip[];
  audioTrack?: MusicTrack;
  skin?: string;
  duration: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface VideoClip {
  id: string;
  uri: string;
  startTime: number;
  endTime: number;
  trimStart: number;
  trimEnd: number;
  volume: number;
  speed: number;
  filters: string[];
  aiEnhanced: boolean;
}

export interface TierLimit {
  dailyRecordingSeconds: number;
  scheduledPosts: number;
  newSkinsPerMonth: number;
  aiFeatures: boolean;
  unlimitedEdit: boolean;
}

export const TIER_LIMITS: Record<SubscriptionTier, TierLimit> = {
  free: {
    dailyRecordingSeconds: 180,
    scheduledPosts: 0,
    newSkinsPerMonth: 0,
    aiFeatures: false,
    unlimitedEdit: false,
  },
  basic: {
    dailyRecordingSeconds: 3000,
    scheduledPosts: 1,
    newSkinsPerMonth: 1,
    aiFeatures: true,
    unlimitedEdit: false,
  },
  pro: {
    dailyRecordingSeconds: Infinity,
    scheduledPosts: Infinity,
    newSkinsPerMonth: 1,
    aiFeatures: true,
    unlimitedEdit: true,
  },
};

export const TIER_PRICES: Record<SubscriptionTier, string> = {
  free: "Free",
  basic: "$4.99/mo",
  pro: "$10.00/mo",
};
