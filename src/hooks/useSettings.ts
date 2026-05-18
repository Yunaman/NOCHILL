"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BrandSettings {
  heroText: string;
  introText: string;
  dropTitle: string;
  dropDate: string;
  dropDescription: string;
  dropImage: string;
  maintenanceMode: boolean;
}

interface SettingsStore {
  settings: BrandSettings;
  updateSettings: (newSettings: Partial<BrandSettings>) => void;
}

const DEFAULT_SETTINGS: BrandSettings = {
  heroText: "NOCHILL",
  introText: "A Vision by Yuna // No Signal Found",
  dropTitle: "VOID OPERATIVE",
  dropDate: "2024-12-31T23:59:59.000Z",
  dropDescription: "THE NEXT CHAPTER OF THE UNDERGROUND. PREPARE FOR DEPLOYMENT.",
  dropImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000",
  maintenanceMode: false,
};

export const useSettings = create<SettingsStore>()(
  persist(
    (set) => ({
      settings: DEFAULT_SETTINGS,
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
    }),
    {
      name: "nochill-settings",
    }
  )
);
