import type { Category, CategoryMeta } from "../types";

export const CATEGORIES: CategoryMeta[] = [
  { key: "study", label: "Study stress", short: "Study" },
  { key: "career", label: "Career / internship", short: "Career" },
  { key: "friendship", label: "Friendship", short: "Friendship" },
  { key: "family", label: "Family pressure", short: "Family" },
  {
    key: "social-media",
    label: "Social media comparison",
    short: "Social media",
  },
  { key: "confidence", label: "Confidence", short: "Confidence" },
  { key: "time", label: "Time management", short: "Time" },
  { key: "other", label: "Other", short: "Other" },
];

const META_BY_KEY: Record<Category, CategoryMeta> = CATEGORIES.reduce(
  (acc, c) => {
    acc[c.key] = c;
    return acc;
  },
  {} as Record<Category, CategoryMeta>,
);

export function getCategoryMeta(key: Category): CategoryMeta {
  return META_BY_KEY[key];
}
