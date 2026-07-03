import React, { forwardRef, useState, useRef } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Plus } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface FAQCardProps {
  question: string;
  answer: string;
  className?: string;
  style?: React.CSSProperties;
}

export const FAQCard = forwardRef<HTMLDivElement, FAQCardProps>(
  ({ question, answer, className, style }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const iconRef = useRef<SVGSVGElement>(null);

    // Accordion Animation (Independent of Scroll)
    useGSAP(() => {
      if (!contentRef.current || !iconRef.current) return;

      if (isOpen) {
        gsap.to(contentRef.current, {
          height: "auto",
          opacity: 1,
          marginTop: 24,
          duration: 0.4,
          ease: "power3.out",
        });
        gsap.to(iconRef.current, {
          rotate: 45,
          duration: 0.4,
          ease: "power3.out",
        });
      } else {
        gsap.to(contentRef.current, {
          height: 0,
          opacity: 0,
          marginTop: 0,
          duration: 0.3,
          ease: "power2.inOut",
        });
        gsap.to(iconRef.current, {
          rotate: 0,
          duration: 0.3,
          ease: "power2.inOut",
        });
      }
    }, [isOpen]);

    return (
      <div
        ref={ref}
        className={cn(
          "w-full rounded-[32px] border border-white/[0.06]",
          "bg-[#0a0a0a]/80 backdrop-blur-md", // Very dark charcoal, subtle glass
          "p-8 md:p-10 text-left cursor-pointer",
          "shadow-[0_10px_40px_rgba(0,0,0,0.5)]", // Very soft shadow
          "will-change-[transform,filter,opacity]",
          "transition-colors duration-300 hover:bg-[#111111]/90",
          className
        )}
        style={style}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex w-full items-start justify-between gap-6">
          <h3 className="text-xl md:text-2xl font-medium tracking-tight text-white/95 leading-snug">
            {question}
          </h3>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/[0.04] text-white/70">
            <Plus ref={iconRef} className="h-5 w-5" />
          </div>
        </div>
        <div
          ref={contentRef}
          className="overflow-hidden h-0 opacity-0"
        >
          <p className="pr-12 text-base md:text-lg font-normal tracking-wide text-white/50 leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
    );
  }
);

FAQCard.displayName = "FAQCard";
