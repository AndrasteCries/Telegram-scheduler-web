import { Orientation } from "./photo-types";

export type Template = { columns: string; rows: string[] };

export type Variant = {
  template: Template;
  matches: (orientations: Orientation[]) => boolean;
};

export const VARIANTS_BY_COUNT: Record<number, Variant[]> = {
  1: [{ template: { columns: "1fr", rows: ["a"] }, matches: () => true }],
  2: [
    {
      template: { columns: "1fr", rows: ["a", "b"] },
      matches: ([a, b]) => a === "landscape" && b === "landscape",
    },
    {
      template: {
        columns: "1fr",
        rows: ["a", "b"],
      },
      matches: ([first, second]) =>
        (first === "landscape" && second !== "landscape") ||
        (first !== "landscape" && second === "landscape"),
    },
    {
      template: { columns: "1fr 1fr", rows: ["a b"] },
      matches: () => true,
    },
  ],
  3: [
    {
      template: {
        columns: "repeat(6, 1fr)",
        rows: ["a a a a a a", "b b b c c c"],
      },
      matches: ([first, second, third]) =>
        first === "landscape" &&
        second !== "landscape" &&
        third !== "landscape",
    },
    {
      template: { columns: "1fr", rows: ["a", "b", "c"] },
      matches: (o) => o.every((x) => x === "landscape"),
    },
    {
      template: {
        columns: "repeat(6, 1fr)",
        rows: ["a a a b b b", "c c c c c c"],
      },
      matches: () => true,
    },
  ],
};
