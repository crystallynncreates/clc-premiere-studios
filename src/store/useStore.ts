import { create } from "zustand";
import type { User, ScheduledPost, VideoProject, SubscriptionTier } from "../types";

interface AppState {
  user: User;
  projects: VideoProject[];
  scheduledPosts: ScheduledPost[];
  isRecording: boolean;
  isStreaming: boolean;
  recordingSeconds: number;
  selectedSkinId: string | null;
  aiProcessing: boolean;
  setUser: (u: Partial<User>) => void;
  setTier: (tier: SubscriptionTier) => void;
  connectSocial: (platform: string, username: string) => void;
  disconnectSocial: (platform: string) => void;
  setIsRecording: (v: boolean) => void;
  setIsStreaming: (v: boolean) => void;
  addRecordingSeconds: (s: number) => void;
  setSelectedSkin: (id: string | null) => void;
  setAiProcessing: (v: boolean) => void;
  addProject: (p: VideoProject) => void;
  addScheduledPost: (p: ScheduledPost) => void;
  unlockSkin: (id: string) => void;
}

export const useStore = create<AppState>((set) => ({
  user: {
    id: "user-1",
    name: "Crystal Lynn",
    email: "crystallynncreates@gmail.com",
    tier: "free",
    recordingSecondsUsedToday: 0,
    connectedAccounts: [
      { platform: "youtube",   username: "", connected: false },
      { platform: "instagram", username: "", connected: false },
      { platform: "twitter",   username: "", connected: false },
      { platform: "snapchat",  username: "", connected: false },
    ],
    unlockedSkins: ["retro-1","retro-2","anime-1","anime-2"],
    currentSkin: null,
  },
  projects: [],
  scheduledPosts: [],
  isRecording: false,
  isStreaming: false,
  recordingSeconds: 0,
  selectedSkinId: null,
  aiProcessing: false,
  setUser: (u) => set((s) => ({ user: { ...s.user, ...u } })),
  setTier: (tier) => set((s) => ({ user: { ...s.user, tier } })),
  connectSocial: (platform, username) =>
    set((s) => ({
      user: {
        ...s.user,
        connectedAccounts: s.user.connectedAccounts.map((a) =>
          a.platform === platform ? { ...a, connected: true, username } : a
        ),
      },
    })),
  disconnectSocial: (platform) =>
    set((s) => ({
      user: {
        ...s.user,
        connectedAccounts: s.user.connectedAccounts.map((a) =>
          a.platform === platform ? { ...a, connected: false, username: "" } : a
        ),
      },
    })),
  setIsRecording: (v) => set({ isRecording: v }),
  setIsStreaming: (v) => set({ isStreaming: v }),
  addRecordingSeconds: (s) =>
    set((st) => ({
      user: { ...st.user, recordingSecondsUsedToday: st.user.recordingSecondsUsedToday + s },
      recordingSeconds: st.recordingSeconds + s,
    })),
  setSelectedSkin: (id) => set({ selectedSkinId: id }),
  setAiProcessing: (v) => set({ aiProcessing: v }),
  addProject: (p) => set((s) => ({ projects: [p, ...s.projects] })),
  addScheduledPost: (p) => set((s) => ({ scheduledPosts: [p, ...s.scheduledPosts] })),
  unlockSkin: (id) =>
    set((s) => ({ user: { ...s.user, unlockedSkins: [...s.user.unlockedSkins, id] } })),
}));
