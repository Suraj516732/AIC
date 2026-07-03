"use client";

import React from "react";
import { FAQCard } from "./FAQCard";
import { useFAQScrollAnimation } from "@/hooks/useFAQScrollAnimation";

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

export function FAQSection() {
  const { sectionRef, cardsWrapperRef, cardsRef } = useFAQScrollAnimation();

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-black"
    >
      {/* Subtle radial vignette for depth */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_100%_100%_at_50%_50%,rgba(255,255,255,0.03)_0%,transparent_70%)]" />

      {/* Premium film grain texture */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-20 mix-blend-overlay"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 250 250\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'grain\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'1.5\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3CfeColorMatrix type=\'saturate\' values=\'0\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23grain)\'/%3E%3C/svg%3E")',
          backgroundSize: "150px 150px",
        }}
      />

      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center px-4">
        {/* Heading remains visually stable, separate from card animation */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-white/50 font-light">
            Everything you need to know about the AIC Blueprint.
          </p>
        </div>

        {/* 
          Cards Wrapper:
          Uses a standard vertical flex layout with a gap. 
          The GSAP hook dynamically compresses this by animating translateY on the children.
        */}
        <div
          ref={cardsWrapperRef}
          className="relative flex w-full flex-col"
          style={{ gap: "24px", perspective: "1200px" }}
        >
          {FAQS.map((faq, index) => (
            <FAQCard
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              question={faq.question}
              answer={faq.answer}
              // Position relative so translateY moves it naturally from its flow position
              className="relative"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
