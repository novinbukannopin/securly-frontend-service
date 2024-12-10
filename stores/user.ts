import { create } from 'zustand';

interface UserProfile {
  id: number;
  name: string;
  email: string;
  isEmailVerified: boolean;
  count: number;
  username: string;
  dob: Date;
  language: string;
}

interface UserState {
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile) => void;
  clearUserProfile: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  userProfile: null,
  setUserProfile: (profile) => set({ userProfile: profile }),
  clearUserProfile: () => set({ userProfile: null }),
}));
