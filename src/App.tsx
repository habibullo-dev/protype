import { useCallback, useEffect, useMemo, useState } from "react";
import { AboutSection } from "./components/AboutSection";
import { BottomNav } from "./components/BottomNav";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { RecoverySection } from "./components/RecoverySection";
import { ShareStorySection } from "./components/ShareStorySection";
import { StoriesSection } from "./components/StoriesSection";
import { ToastProvider, useToast } from "./components/ToastContext";
import { SAMPLE_STORIES } from "./data/sampleStories";
import { makeId } from "./lib/id";
import {
  loadReactionOverrides,
  loadUserStories,
  mergeStories,
  saveReactionOverrides,
  saveUserStories,
} from "./lib/storage";
import type { ReactionCounts, ReactionKey, SectionKey, Story } from "./types";

function AppShell() {
  const [section, setSection] = useState<SectionKey>("home");
  const [userStories, setUserStories] = useState<Story[]>(() =>
    loadUserStories(),
  );
  const [overrides, setOverrides] = useState<Record<string, ReactionCounts>>(
    () => loadReactionOverrides(),
  );
  const { toast } = useToast();

  /* persistence ------------------------------------------------------ */
  useEffect(() => {
    saveUserStories(userStories);
  }, [userStories]);

  useEffect(() => {
    saveReactionOverrides(overrides);
  }, [overrides]);

  /* derived state ---------------------------------------------------- */
  const stories = useMemo(() => {
    const sortedUser = [...userStories].sort((a, b) =>
      a.createdAt < b.createdAt ? -1 : 1,
    );
    return mergeStories(SAMPLE_STORIES, sortedUser, overrides);
  }, [userStories, overrides]);

  const numbersById = useMemo(() => {
    const map = new Map<string, number>();
    stories.forEach((s, i) => map.set(s.id, i + 1));
    return map;
  }, [stories]);

  const numberFor = useCallback(
    (story: Story): number => numbersById.get(story.id) ?? stories.length,
    [numbersById, stories.length],
  );

  /* handlers --------------------------------------------------------- */
  const handleNavigate = useCallback((next: SectionKey) => {
    setSection(next);
    queueMicrotask(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  }, []);

  const handleCreateStory = useCallback(
    (
      input: Omit<Story, "id" | "createdAt" | "reactions" | "source">,
    ): Story => {
      const story: Story = {
        ...input,
        id: makeId(),
        createdAt: new Date().toISOString(),
        reactions: { relate: 0, notAlone: 0, thankYou: 0, helped: 0 },
        source: "user",
      };
      setUserStories((prev) => [...prev, story]);
      toast("Thank you. Your story may help another student feel less alone.");
      return story;
    },
    [toast],
  );

  const handleReact = useCallback(
    (storyId: string, key: ReactionKey) => {
      setOverrides((prev) => {
        const current = prev[storyId] ??
          stories.find((s) => s.id === storyId)?.reactions ?? {
            relate: 0,
            notAlone: 0,
            thankYou: 0,
            helped: 0,
          };
        return {
          ...prev,
          [storyId]: { ...current, [key]: current[key] + 1 },
        };
      });
    },
    [stories],
  );

  const handleReport = useCallback(() => {
    toast("Thank you. In a real version, this story would be reviewed.");
  }, [toast]);

  /* render ----------------------------------------------------------- */
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header active={section} onSelect={handleNavigate} />

      <main className="flex-1 pb-24 lg:pb-0">
        {section === "home" && (
          <HeroSection
            onNavigate={handleNavigate}
            storyCount={stories.length}
          />
        )}
        {section === "share" && (
          <ShareStorySection
            pool={stories}
            numberFor={numberFor}
            onCreateStory={handleCreateStory}
            onReact={handleReact}
            onReport={handleReport}
            onNavigate={handleNavigate}
          />
        )}
        {section === "read" && (
          <StoriesSection
            stories={stories}
            numberFor={numberFor}
            onReact={handleReact}
            onReport={handleReport}
          />
        )}
        {section === "recovery" && (
          <RecoverySection
            stories={stories}
            numberFor={numberFor}
            onReact={handleReact}
            onReport={handleReport}
          />
        )}
        {section === "about" && <AboutSection onNavigate={handleNavigate} />}
      </main>

      <Footer onNavigate={handleNavigate} />
      <BottomNav active={section} onSelect={handleNavigate} />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppShell />
    </ToastProvider>
  );
}
