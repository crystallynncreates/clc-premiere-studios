import { create } from "zustand";
import type { User, ScheduledPost, VideoProject, SubscriptionTier } from "../types";

// ── Persisted user accounts (localStorage) ────────────────────────────────────
export interface StoredAccount {
  id: string;
  name: string;
  email: string;
  passwordHash: string; // simple hash for demo; production would use bcrypt/server-side auth
  tier: SubscriptionTier;
  projects: VideoProject[];
  connectedAccounts: { platform: string; username: string; connected: boolean }[];
  unlockedSkins: string[];
  currentSkin: string | null;
  recordingSecondsUsedToday: number;
  createdAt: string;
}

// Very lightweight hash — fine for a prototype, never for production
function simpleHash(str: string): string {
  let h = 0;
  for (let i = 0; i < str.length; i++) { h = (Math.imul(31, h) + str.charCodeAt(i)) | 0; }
  return h.toString(16);
}

const ACCOUNTS_KEY = "clc_accounts";
const SESSION_KEY  = "clc_session";

export function loadAccounts(): StoredAccount[] {
  try { return JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || "[]"); } catch { return []; }
}
function saveAccounts(accs: StoredAccount[]) {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accs));
}
export function loadSession(): string | null {
  return localStorage.getItem(SESSION_KEY);
}
function saveSession(id: string | null) {
  if (id) localStorage.setItem(SESSION_KEY, id);
  else localStorage.removeItem(SESSION_KEY);
}

export function registerAccount(name: string, email: string, password: string): StoredAccount | string {
  const accounts = loadAccounts();
  if (accounts.find((a) => a.email.toLowerCase() === email.toLowerCase())) {
    return "An account with that email already exists.";
  }
  const acc: StoredAccount = {
    id: `user-${Date.now()}`,
    name, email,
    passwordHash: simpleHash(password),
    tier: "free",
    projects: [],
    connectedAccounts: [
      { platform: "youtube",   username: "", connected: false },
      { platform: "instagram", username: "", connected: false },
      { platform: "twitter",   username: "", connected: false },
      { platform: "snapchat",  username: "", connected: false },
    ],
    unlockedSkins: [],
    currentSkin: null,
    recordingSecondsUsedToday: 0,
    createdAt: new Date().toISOString(),
  };
  saveAccounts([...accounts, acc]);
  saveSession(acc.id);
  return acc;
}

export function loginAccount(email: string, password: string): StoredAccount | string {
  const accounts = loadAccounts();
  const acc = accounts.find((a) => a.email.toLowerCase() === email.toLowerCase());
  if (!acc) return "No account found with that email.";
  if (acc.passwordHash !== simpleHash(password)) return "Incorrect password.";
  saveSession(acc.id);
  return acc;
}

export function logoutAccount() { saveSession(null); }

function persistUser(updater: (acc: StoredAccount) => StoredAccount, id: string) {
  const accounts = loadAccounts();
  saveAccounts(accounts.map((a) => (a.id === id ? updater(a) : a)));
}

// ── Store ──────────────────────────────────────────────────────────────────────
interface AppState {
  user: User;
  projects: VideoProject[];
  scheduledPosts: ScheduledPost[];
  isRecording: boolean;
  isStreaming: boolean;
  recordingSeconds: number;
  selectedSkinId: string | null;
  aiProcessing: boolean;
  isLoggedIn: boolean;
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
  deleteProject: (id: string) => void;
  addScheduledPost: (p: ScheduledPost) => void;
  unlockSkin: (id: string) => void;
  loginFromAccount: (acc: StoredAccount) => void;
  logout: () => void;
}

function defaultUser(): User {
  return {
    id: "",
    name: "",
    email: "",
    tier: "free",
    recordingSecondsUsedToday: 0,
    connectedAccounts: [],
    unlockedSkins: [],
    currentSkin: null,
  };
}

// Restore session on page load
const sessionId = loadSession();
const sessionAccount = sessionId
  ? loadAccounts().find((a) => a.id === sessionId) ?? null
  : null;

export const useStore = create<AppState>((set, get) => ({
  user: sessionAccount
    ? {
        id: sessionAccount.id,
        name: sessionAccount.name,
        email: sessionAccount.email,
        tier: sessionAccount.tier,
        recordingSecondsUsedToday: sessionAccount.recordingSecondsUsedToday,
        connectedAccounts: sessionAccount.connectedAccounts,
        unlockedSkins: sessionAccount.unlockedSkins,
        currentSkin: sessionAccount.currentSkin,
      }
    : defaultUser(),
  projects: sessionAccount?.projects ?? [],
  scheduledPosts: [],
  isRecording: false,
  isStreaming: false,
  recordingSeconds: 0,
  selectedSkinId: sessionAccount?.currentSkin ?? null,
  aiProcessing: false,
  isLoggedIn: !!sessionAccount,

  loginFromAccount: (acc) =>
    set({
      isLoggedIn: true,
      user: {
        id: acc.id, name: acc.name, email: acc.email, tier: acc.tier,
        recordingSecondsUsedToday: acc.recordingSecondsUsedToday,
        connectedAccounts: acc.connectedAccounts,
        unlockedSkins: acc.unlockedSkins,
        currentSkin: acc.currentSkin,
      },
      projects: acc.projects,
      selectedSkinId: acc.currentSkin,
    }),

  logout: () => {
    logoutAccount();
    set({ isLoggedIn: false, user: defaultUser(), projects: [], scheduledPosts: [] });
  },

  setUser: (u) => {
    set((s) => ({ user: { ...s.user, ...u } }));
    const { user } = get();
    persistUser((a) => ({ ...a, ...u }), user.id);
  },

  setTier: (tier) => {
    set((s) => ({ user: { ...s.user, tier } }));
    const { user } = get();
    persistUser((a) => ({ ...a, tier }), user.id);
  },

  connectSocial: (platform, username) => {
    set((s) => ({
      user: {
        ...s.user,
        connectedAccounts: s.user.connectedAccounts.map((a) =>
          a.platform === platform ? { ...a, connected: true, username } : a
        ),
      },
    }));
    const { user } = get();
    persistUser((a) => ({
      ...a,
      connectedAccounts: a.connectedAccounts.map((ca) =>
        ca.platform === platform ? { ...ca, connected: true, username } : ca
      ),
    }), user.id);
  },

  disconnectSocial: (platform) => {
    set((s) => ({
      user: {
        ...s.user,
        connectedAccounts: s.user.connectedAccounts.map((a) =>
          a.platform === platform ? { ...a, connected: false, username: "" } : a
        ),
      },
    }));
    const { user } = get();
    persistUser((a) => ({
      ...a,
      connectedAccounts: a.connectedAccounts.map((ca) =>
        ca.platform === platform ? { ...ca, connected: false, username: "" } : ca
      ),
    }), user.id);
  },

  setIsRecording: (v) => set({ isRecording: v }),
  setIsStreaming: (v) => set({ isStreaming: v }),

  addRecordingSeconds: (s) => {
    set((st) => ({
      user: { ...st.user, recordingSecondsUsedToday: st.user.recordingSecondsUsedToday + s },
      recordingSeconds: st.recordingSeconds + s,
    }));
    const { user } = get();
    persistUser((a) => ({ ...a, recordingSecondsUsedToday: a.recordingSecondsUsedToday + s }), user.id);
  },

  setSelectedSkin: (id) => {
    set({ selectedSkinId: id });
    const { user } = get();
    persistUser((a) => ({ ...a, currentSkin: id }), user.id);
  },

  setAiProcessing: (v) => set({ aiProcessing: v }),

  addProject: (p) => {
    set((s) => ({ projects: [p, ...s.projects] }));
    const { user } = get();
    const projects = get().projects;
    persistUser((a) => ({ ...a, projects }), user.id);
  },

  deleteProject: (id) => {
    set((s) => ({ projects: s.projects.filter((p) => p.id !== id) }));
    const { user } = get();
    const projects = get().projects;
    persistUser((a) => ({ ...a, projects }), user.id);
  },

  addScheduledPost: (p) => set((s) => ({ scheduledPosts: [p, ...s.scheduledPosts] })),

  unlockSkin: (id) => {
    set((s) => ({ user: { ...s.user, unlockedSkins: [...s.user.unlockedSkins, id] } }));
    const { user } = get();
    persistUser((a) => ({ ...a, unlockedSkins: [...a.unlockedSkins, id] }), user.id);
  },
}));
