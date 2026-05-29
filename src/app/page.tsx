import Link from "next/link";
import AudioPlayer from "@/components/AudioPlayer";
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
          manager by trade. artist at heart. philosopher in theory.
        </p>
      </header>

      {/* read — a labelled list of essay titles, each linking to its own page */}
      <section className="mt-8">
        <p>read:</p>
        <div className="mt-3 flex flex-col gap-4">
          {essays.map((essay) => (
            <Link key={essay.slug} href={`/essays/${essay.slug}`}>
              {essay.title}
            </Link>
          ))}
        </div>
      </section>

      {/* write — mirrors the read section structure */}
      <section className="mt-8">
        <p>write:</p>
        <div className="mt-3">
          <a href="mailto:r@rahilchaudhary.xyz">r@rahilchaudhary.xyz</a>
        </div>
      </section>

      {/* listen — mirrors the section structure above, wrapping the player */}
      <section className="mt-8">
        <p>listen:</p>
        <div className="mt-3">
          <AudioPlayer />
        </div>
      </section>

      {/* footer — mt-auto pins it near the bottom of the viewport on short pages */}
      <footer className="mt-auto pt-24 pb-6 text-center text-[12px]">
        made with ❤️ in <CityRotator />
      </footer>
    </main>
  );
}
