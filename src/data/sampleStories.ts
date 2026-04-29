import type { Story } from "../types";

const ZERO = { relate: 0, notAlone: 0, thankYou: 0, helped: 0 };

export const SAMPLE_STORIES: Story[] = [
  {
    id: "sample-001",
    category: "study",
    event:
      "I studied for a midterm for several days, but my score was much lower than I expected.",
    feeling: "I felt stupid because my friends said the exam was easy.",
    recovery:
      "After a few days, I realized I needed a different study method, not self-blame. I asked one classmate how they reviewed and changed my plan.",
    isRecoveryStory: true,
    createdAt: "2026-02-12T09:14:00Z",
    reactions: { ...ZERO, relate: 7, notAlone: 4, thankYou: 2, helped: 3 },
    source: "sample",
  },
  {
    id: "sample-002",
    category: "social-media",
    event:
      "I saw many people posting internships and awards, while I was still unsure about my future.",
    feeling: "I felt like I was falling behind everyone.",
    recovery:
      "I muted some accounts for a while and wrote down one small thing I could do that week. It helped me focus on my own timeline.",
    isRecoveryStory: true,
    createdAt: "2026-02-20T18:42:00Z",
    reactions: { ...ZERO, relate: 12, notAlone: 9, thankYou: 5, helped: 6 },
    source: "sample",
  },
  {
    id: "sample-003",
    category: "career",
    event:
      "I applied for six summer internships and got rejected from all of them. One company did not even reply.",
    feeling:
      "I felt embarrassed talking to my classmates because they all had something lined up.",
    recovery:
      "A senior told me she also got rejected many times in her third year. She helped me redo my résumé and I tried again the next semester.",
    isRecoveryStory: true,
    createdAt: "2026-03-02T11:05:00Z",
    reactions: { ...ZERO, relate: 9, notAlone: 6, thankYou: 4, helped: 4 },
    source: "sample",
  },
  {
    id: "sample-004",
    category: "friendship",
    event:
      "My close friend stopped replying to my messages for two weeks and I did not know why.",
    feeling:
      "I kept reading our old chats wondering if I had said something wrong. I did not feel like seeing anyone.",
    recovery: "",
    isRecoveryStory: false,
    createdAt: "2026-03-10T15:30:00Z",
    reactions: { ...ZERO, relate: 5, notAlone: 8, thankYou: 1, helped: 0 },
    source: "sample",
  },
  {
    id: "sample-005",
    category: "family",
    event:
      "My parents kept comparing my grades to my older cousin who got into med school.",
    feeling:
      "I felt like nothing I did was enough, even when I was already doing my best.",
    recovery:
      "I started journaling small wins each week. Reading them back reminded me I am not actually behind, just on a different path.",
    isRecoveryStory: true,
    createdAt: "2026-03-15T20:18:00Z",
    reactions: { ...ZERO, relate: 14, notAlone: 11, thankYou: 7, helped: 5 },
    source: "sample",
  },
  {
    id: "sample-006",
    category: "confidence",
    event:
      "I had to give a class presentation and I forgot half of what I wanted to say in front of everyone.",
    feeling:
      "I wanted to disappear. For a week I avoided eye contact with the people in that class.",
    recovery:
      "I practiced first with one friend, then tried again. The second time was better.",
    isRecoveryStory: true,
    createdAt: "2026-03-22T13:00:00Z",
    reactions: { ...ZERO, relate: 11, notAlone: 8, thankYou: 3, helped: 6 },
    source: "sample",
  },
  {
    id: "sample-007",
    category: "time",
    event:
      "I planned to start a project a month early but ended up doing it the night before. The result was not good.",
    feeling:
      "I felt ashamed because I always promise myself I will not do this again, and then I do.",
    recovery: "",
    isRecoveryStory: false,
    createdAt: "2026-03-28T22:11:00Z",
    reactions: { ...ZERO, relate: 17, notAlone: 6, thankYou: 2, helped: 1 },
    source: "sample",
  },
  {
    id: "sample-008",
    category: "study",
    event:
      "I switched majors in my second year and felt like I had wasted a whole year compared to my friends.",
    feeling:
      "Every time someone asked what year I was in, I did not know how to answer without feeling small.",
    recovery:
      "A professor told me changing direction is part of learning, not falling behind. I started counting from the day I felt sure, not from when I started university.",
    isRecoveryStory: true,
    createdAt: "2026-04-04T10:25:00Z",
    reactions: { ...ZERO, relate: 8, notAlone: 9, thankYou: 6, helped: 7 },
    source: "sample",
  },
  {
    id: "sample-009",
    category: "social-media",
    event:
      "Everyone posted travel photos during the break. I stayed home because I had to work part-time.",
    feeling:
      "I told people I was just resting at home, but I felt left out and a little jealous.",
    recovery:
      "I noticed two of those friends later said the trip was actually stressful. The pictures were not the whole story.",
    isRecoveryStory: true,
    createdAt: "2026-04-10T08:50:00Z",
    reactions: { ...ZERO, relate: 13, notAlone: 7, thankYou: 4, helped: 3 },
    source: "sample",
  },
  {
    id: "sample-010",
    category: "friendship",
    event:
      "I joined a club hoping to make new friends but everyone already had their groups.",
    feeling:
      "I went to two meetings and stopped going. I told myself I am just bad at this.",
    recovery: "",
    isRecoveryStory: false,
    createdAt: "2026-04-18T17:33:00Z",
    reactions: { ...ZERO, relate: 10, notAlone: 12, thankYou: 2, helped: 2 },
    source: "sample",
  },
];
