"use client";

import { MotionConfig } from "framer-motion";

/**
 * Wraps the app with Framer Motion config.
 * reducedMotion="user" makes all animations respect the OS-level
 * "Reduce Motion" accessibility preference automatically.
 */
export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
