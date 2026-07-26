import { Orientation } from "@/types/photo-types";

export type Template = { columns: string; rows: string[] };

type LeafVariant = {
  rows: string[];
  matches: (orientations: Orientation[]) => boolean;
};

const LEAF_VARIANTS: Record<number, LeafVariant[]> = {
  1: [{ rows: ["a a a a a a"], matches: () => true }],
  2: [
    {
      rows: ["a a a a a a", "b b b b b b"],
      matches: ([a, b]) => a === "landscape" && b === "landscape",
    },
    { rows: ["a a a b b b"], matches: () => true },
  ],
  3: [
    {
      rows: ["a a a a a a", "b b b b b b", "c c c c c c"],
      matches: (o) => o.every((x) => x === "landscape"),
    },
    {
      rows: ["a a a a a a", "b b b c c c"],
      matches: ([f, s, t]) =>
        f === "landscape" && s !== "landscape" && t !== "landscape",
    },
    {
      rows: ["a a a b b b", "c c c c c c"],
      matches: ([f, s, t]) =>
        t === "landscape" && f !== "landscape" && s !== "landscape",
    },
    { rows: ["a a b b c c"], matches: () => true },
  ],
};

type Partition = {
  sizes: number[]; 
  matches: (orientations: Orientation[]) => boolean;
};

const PARTITIONS: Record<number, Partition[]> = {
  4: [{ sizes: [2, 2], matches: () => true }],
  5: [{ sizes: [3, 2], matches: () => true }],
  6: [{ sizes: [3, 3], matches: () => true }],
  7: [{ sizes: [4, 3], matches: () => true }],
  8: [
    {
      sizes: [1, 3, 3, 1],
      matches: (o) => o[0] === "landscape" && o[7] === "landscape",
    },
    { sizes: [4, 4], matches: () => true },
  ],
  9: [
    { sizes: [8, 1], matches: (o) => o[8] === "landscape" }, 
    { sizes: [3, 3, 3], matches: () => true },
  ],
  10: [
    { sizes: [9, 1], matches: (o) => o[9] === "landscape" },
    { sizes: [5, 5], matches: () => true },
  ],
};

const AREA_LETTERS = "abcdefghij".split("");

function resolveRows(
  orientations: Orientation[],
  letterOffset: number,
): { rows: string[]; usedLetters: number } {
  const n = orientations.length;

  if (LEAF_VARIANTS[n]) {
    const variant =
      LEAF_VARIANTS[n].find((v) => v.matches(orientations)) ??
      LEAF_VARIANTS[n][LEAF_VARIANTS[n].length - 1];

    const rows = variant.rows.map((row) =>
      row
        .split(" ")
        .map(
          (letter) => AREA_LETTERS[letterOffset + (letter.charCodeAt(0) - 97)],
        )
        .join(" "),
    );
    return { rows, usedLetters: n };
  }

  const partitions = PARTITIONS[n];
  const chosen =
    (partitions ?? []).find((p) => p.matches(orientations)) ??
    partitions?.[partitions.length - 1];

  if (!chosen) return greedyFallback(orientations, letterOffset);

  const rows: string[] = [];
  let offset = 0;
  let letters = letterOffset;

  for (const size of chosen.sizes) {
    const slice = orientations.slice(offset, offset + size);
    const resolved = resolveRows(slice, letters);
    rows.push(...resolved.rows);
    letters += resolved.usedLetters;
    offset += size;
  }

  return { rows, usedLetters: letters - letterOffset };
}

function greedyFallback(orientations: Orientation[], letterOffset: number) {
  const rows: string[] = [];
  let offset = 0;
  let letters = letterOffset;

  while (offset < orientations.length) {
    const size = Math.min(3, orientations.length - offset);
    const resolved = resolveRows(
      orientations.slice(offset, offset + size),
      letters,
    );
    rows.push(...resolved.rows);
    letters += resolved.usedLetters;
    offset += size;
  }

  return { rows, usedLetters: letters - letterOffset };
}

export function buildDynamicTemplate(orientations: Orientation[]): Template {
  const { rows } = resolveRows(orientations, 0);
  return { columns: "repeat(6, 1fr)", rows };
}
