import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { formatDate, getAllEssays, getEssay } from "@/lib/essays";

// only build pages for essays that actually exist; unknown slugs 404
export const dynamicParams = false;

// tells Next.js which essay pages to generate, one per markdown file
export function generateStaticParams() {
  return getAllEssays().map((essay) => ({ slug: essay.slug }));
}

// sets the browser tab title to the essay title
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const essay = getEssay(slug);
  return { title: essay ? essay.title : "rahil" };
}

export default async function EssayPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const essay = getEssay(slug);
  if (!essay) notFound();

  return (
    <main className="essay-page mx-auto max-w-[640px] px-6 py-24">
      <Link href="/" className="back-link">
        ← back
      </Link>

      {/* title and date share a row: title left, date right-aligned */}
      <div className="essay-meta mt-8 flex items-baseline justify-between">
        <h1>{essay.title}</h1>
        <p className="shrink-0 pl-6 text-[#999999]">
          {formatDate(essay.date)}
        </p>
      </div>

      {/* the essay body, rendered from markdown */}
      <article className="essay mt-10">
        <ReactMarkdown>{essay.content}</ReactMarkdown>
      </article>
    </main>
  );
}
