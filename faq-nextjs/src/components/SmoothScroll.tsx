"use client";

import React from "react";
import { useLenis } from "@/hooks/useLenis";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  // Initialize Lenis from our custom architectural hook
  useLenis();

  return <>{children}</>;
}
