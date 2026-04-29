export type Category =
  | "study"
  | "career"
  | "friendship"
  | "family"
  | "social-media"
  | "confidence"
  | "time"
  | "other";

export type ReactionKey = "relate" | "notAlone" | "thankYou" | "helped";

export interface ReactionCounts {
  relate: number;
  notAlone: number;
  thankYou: number;
  helped: number;
}

export interface Story {
  id: string;
  category: Category;
  event: string;
  feeling: string;
  recovery: string;
  isRecoveryStory: boolean;
  createdAt: string;
  reactions: ReactionCounts;
  source: "sample" | "user";
}

export type SectionKey = "home" | "share" | "read" | "recovery" | "about";

export interface CategoryMeta {
  key: Category;
  label: string;
  short: string;
}
