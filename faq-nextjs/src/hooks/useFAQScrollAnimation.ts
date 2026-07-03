import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

export function useFAQScrollAnimation() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsWrapperRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Create the foundational pinned scroll structure
    // No animations applied to the cards in this phase
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "+=250%", // Pin for approx 250vh
      pin: true,
      scrub: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      fastScrollEnd: true,
    });

    return () => {
      st.kill();
    };
  }, { scope: sectionRef });

  return { sectionRef, cardsWrapperRef, cardsRef };
}
