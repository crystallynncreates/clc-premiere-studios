import { create } from "zustand";
import type { User, ScheduledPost, VideoProject, MusicTrack, SubscriptionTier } from "../types";

interface AppState {
  user: User;
  projects: VideoProject[];
  scheduledPosts: ScheduledPost[];
  activeProject: VideoProject | null;
  isRecording: boolean;
  isStreaming: boolean;
  recordingSeconds: number;
  selectedSkinId: string | null;
  aiProcessing: boolean;

  setUser: (user: Partial<User>) => void;
  setTier: (tier: SubscriptionTier) => void;
  connectSocial: (platform: User["connectedAccounts"][0]["platform"], username: string) => void;
  disconnectSocial: (platform: User["connectedAccounts"][0]["platform"]) => void;
  setIsRecording: (v: boolean) => void;
  setIsStreaming: (v: boolean) => void;
  addRecordingSeconds: (s: number) => void;
  setSelectedSkin: (id: string | null) => void;
  setAiProcessing: (v: boolean) => void;
  addProject: (project: VideoProject) => void;
  setActiveProject: (project: VideoProject | null) => void;
  addScheduledPost: (post: ScheduledPost) => void;
  unlockSkin: (skinId: string) => void;
}

export const useStore = create<AppState>((set) => ({
  user: {
    id: "user-1",
    name: "Crystal Lynn",
    email: "crystallynncreates@gmail.com",
    tier: "free",
    recordingSecondsUsedToday: 0,
    connectedAccounts: [
      { platform: "youtube", username: "", connected: false },
      { platform: "instagram", username: "", connected: false },
      { platform: "twitter", username: "", connected: false },
      { platform: "snapchat", username: "", connected: false },
    ],
    unlockedSkins: ["retro-1", "anime-1"],
    currentSkin: null,
  },
  projects: [],
  scheduledPosts: [],
  activeProject: null,
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
      user: {
        ...st.user,
        recordingSecondsUsedToday: st.user.recordingSecondsUsedToday + s,
      },
      recordingSeconds: st.recordingSeconds + s,
    })),

  setSelectedSkin: (id) => set({ selectedSkinId: id }),
  setAiProcessing: (v) => set({ aiProcessing: v }),
  addProject: (project) => set((s) => ({ projects: [project, ...s.projects] })),
  setActiveProject: (project) => set({ activeProject: project }),
  addScheduledPost: (post) =>
    set((s) => ({ scheduledPosts: [post, ...s.scheduledPosts] })),

  unlockSkin: (skinId) =>
    set((s) => ({
      user: {
        ...s.user,
        unlockedSkins: [...s.user.unlockedSkins, skinId],
      },
    })),
}));
