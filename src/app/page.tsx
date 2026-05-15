import Link from "next/link";
import CityRotator from "@/components/CityRotator";
import { getAllEssays } from "@/lib/essays";

export default function Home() {
  const essays = getAllEssays();

  return (
    // min-h-screen + flex column lets the footer be pushed to the viewport bottom
    <main className="mx-auto flex min-h-screen max-w-[640px] flex-col px-6 py-24">
      {/* name and about line */}
      <header>
        <h1 className="text-[22px]">rahil</h1>
        <p className="mt-2">
          manager by trade. artist at heart. critical like theory.
        </p>
      </header>

      {/* essays — a labelled list of titles, each linking to its own page */}
      <section className="mt-8">
        <p>essays:</p>
        <div className="mt-3 flex flex-col gap-4">
          {essays.map((essay) => (
            <Link key={essay.slug} href={`/essays/${essay.slug}`}>
              {essay.title}
            </Link>
          ))}
        </div>
      </section>

      {/* contact — mirrors the essays section structure */}
      <section className="mt-8">
        <p>contact:</p>
        <div className="mt-3">
          <a href="mailto:r@rahilchaudhary.xyz">r@rahilchaudhary.xyz</a>
        </div>
      </section>

      {/* footer — mt-auto pins it near the bottom of the viewport on short pages */}
      <footer className="mt-auto pt-24 pb-6 text-center text-[12px]">
        made with ❤️ in <CityRotator />
      </footer>
    </main>
  );
}
