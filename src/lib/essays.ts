// reads essays from the markdown files in content/essays/
// to add a new essay: drop a .md file in that folder with title, date, slug frontmatter.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const essaysDir = path.join(process.cwd(), "content", "essays");

export type Essay = {
  slug: string;
  title: string;
  date: string; // stored as "YYYY-MM", e.g. "2026-04"
  content: string; // the markdown body
};

const months = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

// turns a "2026-04" frontmatter date into "April 2026" for display
export function formatDate(date: string): string {
  const [year, month] = date.split("-");
  const name = months[Number(month) - 1];
  return `${name[0].toUpperCase()}${name.slice(1)} ${year}`;
}

// reads and parses every essay file, sorted alphabetically by title (case-insensitive)
export function getAllEssays(): Essay[] {
  const files = fs.readdirSync(essaysDir).filter((file) => file.endsWith(".md"));

  const essays = files.map((file) => {
    const raw = fs.readFileSync(path.join(essaysDir, file), "utf8");
    const { data, content } = matter(raw);
    return {
      slug: data.slug as string,
      title: data.title as string,
      date: data.date as string,
      content,
    };
  });

  return essays.sort((a, b) =>
    a.title.localeCompare(b.title, undefined, { sensitivity: "base" })
  );
}

// finds a single essay by its slug
export function getEssay(slug: string): Essay | undefined {
  return getAllEssays().find((essay) => essay.slug === slug);
}
