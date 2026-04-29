import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AboutSection } from "./components/AboutSection";
import { BottomNav } from "./components/BottomNav";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { Preloader } from "./components/Preloader";
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

const SECTIONS: SectionKey[] = ["home", "share", "read", "recovery", "about"];
const SECTION_TRANSITION_MS = 150;

function sectionFromHash(hash: string): SectionKey {
  const section = hash.replace(/^#\/?/, "");
  return SECTIONS.includes(section as SectionKey)
    ? (section as SectionKey)
    : "home";
}

function urlForSection(section: SectionKey): string {
  const path = window.location.pathname + window.location.search;
  return section === "home" ? path : `${path}#${section}`;
}

function AppShell() {
  const [section, setSection] = useState<SectionKey>(() =>
    sectionFromHash(window.location.hash),
  );
  const [isSwitchingSection, setIsSwitchingSection] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);
  const transitionTimeoutRef = useRef<number | null>(null);
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

  useEffect(() => {
    const syncSectionFromUrl = () => {
      if (transitionTimeoutRef.current !== null) {
        window.clearTimeout(transitionTimeoutRef.current);
        transitionTimeoutRef.current = null;
      }
      setIsSwitchingSection(false);
      setSection(sectionFromHash(window.location.hash));
    };

    window.addEventListener("hashchange", syncSectionFromUrl);
    window.addEventListener("popstate", syncSectionFromUrl);
    return () => {
      window.removeEventListener("hashchange", syncSectionFromUrl);
      window.removeEventListener("popstate", syncSectionFromUrl);
      if (transitionTimeoutRef.current !== null) {
        window.clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

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
  const handleNavigate = useCallback(
    (next: SectionKey) => {
      if (next === section) {
        window.history.pushState(null, "", urlForSection(next));
        queueMicrotask(() => window.scrollTo({ top: 0, behavior: "smooth" }));
        return;
      }

      if (transitionTimeoutRef.current !== null) {
        window.clearTimeout(transitionTimeoutRef.current);
      }

      setIsSwitchingSection(true);
      window.history.pushState(null, "", urlForSection(next));

      transitionTimeoutRef.current = window.setTimeout(() => {
        setSection(next);
        setIsSwitchingSection(false);
        transitionTimeoutRef.current = null;
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, SECTION_TRANSITION_MS);
    },
    [section],
  );

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

  const handlePreloaderDone = useCallback(() => {
    setShowPreloader(false);
  }, []);

  /* render ----------------------------------------------------------- */
  return (
    <div className="relative flex min-h-screen flex-col">
      {showPreloader && <Preloader onDone={handlePreloaderDone} />}
      <Header active={section} onSelect={handleNavigate} />

      <main className="flex-1 pb-24 lg:pb-0">
        <div
          key={section}
          className={[
            "page-transition",
            isSwitchingSection ? "page-transition--out" : "",
          ].join(" ")}
        >
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
        </div>
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
