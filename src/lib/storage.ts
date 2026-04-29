import type { ReactionCounts, Story } from "../types";

const USER_STORIES_KEY = "failmate.userStories.v1";
const REACTION_OVERRIDES_KEY = "failmate.reactionOverrides.v1";

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function isBrowser(): boolean {
  return (
    typeof window !== "undefined" && typeof window.localStorage !== "undefined"
  );
}

export function loadUserStories(): Story[] {
  if (!isBrowser()) return [];
  return safeParse<Story[]>(window.localStorage.getItem(USER_STORIES_KEY), []);
}

export function saveUserStories(stories: Story[]): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(USER_STORIES_KEY, JSON.stringify(stories));
}

export function loadReactionOverrides(): Record<string, ReactionCounts> {
  if (!isBrowser()) return {};
  return safeParse<Record<string, ReactionCounts>>(
    window.localStorage.getItem(REACTION_OVERRIDES_KEY),
    {},
  );
}

export function saveReactionOverrides(
  overrides: Record<string, ReactionCounts>,
): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(
    REACTION_OVERRIDES_KEY,
    JSON.stringify(overrides),
  );
}

export function mergeStories(
  samples: Story[],
  user: Story[],
  overrides: Record<string, ReactionCounts>,
): Story[] {
  const all = [...samples, ...user];
  return all.map((s) => {
    const override = overrides[s.id];
    return override ? { ...s, reactions: override } : s;
  });
}
