import { FAQSection } from "@/components/FAQSection";
import { SmoothScroll } from "@/components/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-black w-full overflow-hidden">
        {/* Spacer to allow scrolling before reaching the FAQ */}
        <div className="h-[100vh] w-full flex items-center justify-center bg-black border-b border-white/5">
          <h1 className="text-4xl md:text-6xl font-bold text-white/90">
            Scroll Down to View Animation
          </h1>
        </div>

        {/* The Premium 3D FAQ Stack */}
        <FAQSection />

        {/* Spacer to allow scrolling past the FAQ */}
        <div className="h-[100vh] w-full flex flex-col items-center justify-center gap-6 bg-black border-t border-white/5">
          <h2 className="text-4xl font-bold text-white/50">
            End of Animation
          </h2>
          <p className="text-white/30">Scroll back up to see perfect reverse scrubbing.</p>
        </div>
      </main>
    </SmoothScroll>
  );
}
