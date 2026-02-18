/**
 * Persists user creations and drafts to localStorage, keyed by wallet address.
 * When wallet is connected, all data is stored and restored on load.
 */

const STORAGE_PREFIX = "mememator_";

export type LaunchRecord = {
  id: string;
  tokenName: string;
  ticker: string;
  description: string;
  createdAt: number;
};

export type MemeRecord = {
  id: string;
  /** Base64 data URL of the meme image (thumbnail or full) */
  imageDataUrl: string;
  tokenName?: string;
  ticker?: string;
  caption?: string;
  createdAt: number;
};

export type UserStorageData = {
  launches: LaunchRecord[];
  memes: MemeRecord[];
  /** Last used forge draft */
  lastDraft?: {
    tokenName: string;
    ticker: string;
    description: string;
    style?: string;
  };
  updatedAt: number;
};

const MAX_LAUNCHES = 50;
const MAX_MEMES = 30;

function getKey(walletAddress: string): string {
  return `${STORAGE_PREFIX}${walletAddress}`;
}

export function loadUserData(walletAddress: string | null): UserStorageData | null {
  if (!walletAddress || typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(getKey(walletAddress));
    if (!raw) return null;
    const data = JSON.parse(raw) as UserStorageData;
    return data;
  } catch {
    return null;
  }
}

export function saveUserData(walletAddress: string | null, data: UserStorageData): void {
  if (!walletAddress || typeof window === "undefined") return;
  try {
    data.updatedAt = Date.now();
    localStorage.setItem(getKey(walletAddress), JSON.stringify(data));
  } catch {
    // quota exceeded or disabled
  }
}

export function addLaunch(
  walletAddress: string | null,
  record: Omit<LaunchRecord, "id" | "createdAt">
): void {
  const existing = loadUserData(walletAddress) ?? { launches: [], memes: [], updatedAt: 0 };
  const launch: LaunchRecord = {
    ...record,
    id: `launch_${Date.now()}`,
    createdAt: Date.now(),
  };
  existing.launches = [launch, ...existing.launches].slice(0, MAX_LAUNCHES);
  saveUserData(walletAddress, existing);
}

export function addMeme(
  walletAddress: string | null,
  record: Omit<MemeRecord, "id" | "createdAt">
): void {
  const existing = loadUserData(walletAddress) ?? { launches: [], memes: [], updatedAt: 0 };
  const meme: MemeRecord = {
    ...record,
    id: `meme_${Date.now()}`,
    createdAt: Date.now(),
  };
  existing.memes = [meme, ...existing.memes].slice(0, MAX_MEMES);
  saveUserData(walletAddress, existing);
}

export function saveLastDraft(
  walletAddress: string | null,
  draft: UserStorageData["lastDraft"]
): void {
  const existing = loadUserData(walletAddress) ?? { launches: [], memes: [], updatedAt: 0 };
  existing.lastDraft = draft;
  saveUserData(walletAddress, existing);
}

export function deleteLaunch(walletAddress: string | null, id: string): void {
  const existing = loadUserData(walletAddress);
  if (!existing) return;
  existing.launches = existing.launches.filter((l) => l.id !== id);
  saveUserData(walletAddress, existing);
}

export function deleteMeme(walletAddress: string | null, id: string): void {
  const existing = loadUserData(walletAddress);
  if (!existing) return;
  existing.memes = existing.memes.filter((m) => m.id !== id);
  saveUserData(walletAddress, existing);
}
