export type SubscriptionTier = "free" | "basic" | "pro";

export interface User {
  id: string; name: string; email: string; tier: SubscriptionTier;
  recordingSecondsUsedToday: number;
  connectedAccounts: { platform: string; username: string; connected: boolean }[];
  unlockedSkins: string[]; currentSkin: string | null;
}
export interface ScheduledPost {
  id: string; videoUri: string; caption: string;
  platforms: string[]; scheduledAt: string; status: "pending"|"published"|"failed";
}
export interface VideoProject {
  id: string; name: string; clipCount: number; duration: number; createdAt: string; thumbnail?: string;
}
export interface TierLimit {
  dailyRecordingSeconds: number;
  scheduledPosts: number;
  newSkinsPerMonth: number;
  aiFeatures: boolean;
  canGoLive: boolean;
  canAddClipUrl: boolean;
  savedVideos: number;
  canUseMarvelDisney: boolean;
}
export const TIER_LIMITS: Record<SubscriptionTier, TierLimit> = {
  free:  { dailyRecordingSeconds: 180,      scheduledPosts: 0,        newSkinsPerMonth: 0, aiFeatures: false, canGoLive: false, canAddClipUrl: false, savedVideos: 20,       canUseMarvelDisney: false },
  basic: { dailyRecordingSeconds: 3000,     scheduledPosts: 5,        newSkinsPerMonth: 1, aiFeatures: false, canGoLive: true,  canAddClipUrl: true,  savedVideos: 50,       canUseMarvelDisney: false },
  pro:   { dailyRecordingSeconds: Infinity, scheduledPosts: Infinity, newSkinsPerMonth: 1, aiFeatures: true,  canGoLive: true,  canAddClipUrl: true,  savedVideos: Infinity, canUseMarvelDisney: true  },
};
export const TIER_PRICES: Record<SubscriptionTier, string> = {
  free: "Free", basic: "$4.99/mo", pro: "$9.99/mo",
};
export const TIER_PRICES_ANNUAL: Record<SubscriptionTier, string> = {
  free: "Free", basic: "$47.99/yr", pro: "$120/yr",
};
