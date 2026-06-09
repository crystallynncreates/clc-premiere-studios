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
  id: string; name: string; clipCount: number; duration: number; createdAt: string;
}
export interface TierLimit {
  dailyRecordingSeconds: number; scheduledPosts: number;
  newSkinsPerMonth: number; aiFeatures: boolean;
}
export const TIER_LIMITS: Record<SubscriptionTier, TierLimit> = {
  free:  { dailyRecordingSeconds: 180,      scheduledPosts: 0,        newSkinsPerMonth: 0, aiFeatures: false },
  basic: { dailyRecordingSeconds: 3000,     scheduledPosts: 1,        newSkinsPerMonth: 1, aiFeatures: true  },
  pro:   { dailyRecordingSeconds: Infinity, scheduledPosts: Infinity, newSkinsPerMonth: 1, aiFeatures: true  },
};
export const TIER_PRICES: Record<SubscriptionTier, string> = {
  free: "Free", basic: "$4.99/mo", pro: "$10.00/mo",
};
