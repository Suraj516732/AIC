"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { FaqCard } from "./FaqCard";

const FAQS = [
  {
    question: "How does the remote sales training work?",
    answer:
      "Our training is a comprehensive 4-month program designed to take you from a complete beginner to a top 1% earning closer. You will receive 1-on-1 roleplay sessions, live coaching calls, and access to our proprietary closing scripts.",
  },
  {
    question: "Do I need prior sales experience?",
    answer:
      "Absolutely not. We have designed the AIC Blueprint specifically for action-takers across all experience levels. We strip away bad habits and build your sales foundation from the ground up using our proven methodology.",
  },
  {
    question: "What happens after I complete the program?",
    answer:
      "Upon successful completion, you become eligible for our placement network. We actively connect our top-performing graduates with high-ticket business owners who are actively looking for trained closers.",
  },
  {
    question: "How much time do I need to commit weekly?",
    answer:
      "We recommend dedicating at least 10-15 hours per week to studying the modules, attending live calls, and practicing your roleplay. The more time you invest, the faster you will see life-changing results.",
  },
  {
    question: "Is there a guarantee I will get a job?",
    answer:
      "While we provide all the tools, coaching, and introductions, your success depends entirely on your effort. We guarantee you will possess the exact skills required to close high-ticket deals, but we do not guarantee employment.",
  },
  {
    question: "Can I do this while working a 9-to-5?",
    answer:
      "Yes, many of our most successful students transitioned while working full-time. Remote closing offers flexible hours, allowing you to take sales calls during your available time blocks.",
  },
];

export function FaqStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initial setup to avoid FOUC
    gsap.set(cardsRef.current, {
      transformOrigin: "top center",
    });

    const totalCards = FAQS.length;

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=250%", // Pin for 2.5x the viewport height
      pin: true,
      scrub: true,
      anticipatePin: 1,
      fastScrollEnd: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const progress = self.progress;
        
        // We scroll through totalCards amount of progress
        // so that the very last card eventually reaches index 0
        const scrollIndex = progress * totalCards;

        cardsRef.current.forEach((card, i) => {
          if (!card) return;

          const virtualIndex = i - scrollIndex;

          if (virtualIndex < 0) {
            // Card has been scrolled past (moves UP and fades out)
            const y = virtualIndex * 120; // Shoots up
            const opacity = Math.max(0, 1 + virtualIndex * 2); // Fades quickly
            const scale = 1 - virtualIndex * 0.02; // Slightly grows

            gsap.set(card, {
              y: y,
              scale: scale,
              opacity: opacity,
              filter: `blur(0px) brightness(100%)`,
              zIndex: totalCards - i,
            });
          } else {
            // Card is currently in the stack (or waiting to come up)
            const scale = Math.max(0, 1 - virtualIndex * 0.03);
            const blur = virtualIndex * 1;
            const opacity = Math.max(0, 1 - virtualIndex * 0.08);
            const brightness = Math.max(0, 100 - virtualIndex * 4);
            const translateY = -(virtualIndex * virtualIndex + 7 * virtualIndex);

            gsap.set(card, {
              y: translateY,
              scale: scale,
              opacity: opacity,
              filter: `blur(${blur}px) brightness(${brightness}%)`,
              zIndex: totalCards - i,
            });
          }
        });
      },
    });

    // Force an initial update so cards assemble perfectly on load
    st.scroll(st.start);

    return () => {
      st.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black"
    >
      {/* Subtle radial vignette for depth */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(255,255,255,0.05)_0%,transparent_70%)]" />

      {/* Premium film grain texture */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-15"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 250 250\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'grain\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'1.5\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3CfeColorMatrix type=\'saturate\' values=\'0\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23grain)\'/%3E%3C/svg%3E")',
          backgroundSize: "150px 150px",
        }}
      />

      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-white/50">
            Everything you need to know about the AIC Blueprint.
          </p>
        </div>

        {/* 
          Container for absolute positioned cards. 
          Height is explicitly set to match a typical card so layout doesn't collapse. 
        */}
        <div
          ref={cardsContainerRef}
          className="relative w-full"
          style={{ height: "300px", perspective: "1000px" }}
        >
          {FAQS.map((faq, index) => (
            <FaqCard
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
