"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export type AnimatedLogoProps = {
  size?: number;
  className?: string;
};

const PAUSE_MS = 1200;
const ROTATE_MS = 400;
const ROTATE_EASE: [number, number, number, number] = [0.65, 0, 0.35, 1];

export default function AnimatedLogo({ size = 40, className }: AnimatedLogoProps) {
  const shouldReduce = useReducedMotion();
  const rotation = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const pausedRef = useRef(false);

  useEffect(() => {
    pausedRef.current = isHovered;
  }, [isHovered]);

  useEffect(() => {
    if (shouldReduce) {
      rotation.set(0);
      return;
    }
    let cancelled = false;
    let activeControls: ReturnType<typeof animate> | null = null;
    // Canonical rest poses — each step animates toward `animateTo`, then snaps
    // rotation to `restAt` so we never drift off {0, 90, 180, 270}.
    const steps: { animateTo: number; restAt: number }[] = [
      { animateTo: 90,  restAt: 90  },
      { animateTo: 180, restAt: 180 },
      { animateTo: 270, restAt: 270 },
      { animateTo: 360, restAt: 0   },
    ];
    let stepIndex = 0;

    rotation.set(0);

    async function loop() {
      while (!cancelled) {
        await waitWhileActive(PAUSE_MS, pausedRef, () => cancelled);
        if (cancelled) return;

        const { animateTo, restAt } = steps[stepIndex];
        activeControls = animate(rotation, animateTo, {
          duration: ROTATE_MS / 1000,
          ease: ROTATE_EASE,
        });
        await activeControls;
        activeControls = null;
        if (cancelled) return;

        // Snap to exact canonical angle — prevents sub-degree drift from
        // cubic-bezier settle and keeps rest poses perfectly aligned.
        rotation.set(restAt);
        stepIndex = (stepIndex + 1) % steps.length;
      }
    }

    loop();
    return () => {
      cancelled = true;
      activeControls?.stop();
    };
  }, [shouldReduce, rotation]);

  const commonProps = {
    src: "/images/logo-nz.png",
    alt: "Neo Zino logo",
    width: size,
    height: size,
    draggable: false,
  };

  if (shouldReduce) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        {...commonProps}
        className={cn("block select-none", className)}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <motion.img
      {...commonProps}
      className={cn("block select-none", className)}
      style={{
        rotate: rotation,
        width: size,
        height: size,
        willChange: "transform",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    />
  );
}

function waitWhileActive(
  totalMs: number,
  pausedRef: React.MutableRefObject<boolean>,
  isCancelled: () => boolean,
) {
  return new Promise<void>((resolve) => {
    let waited = 0;
    const tick = 50;
    const id = setInterval(() => {
      if (isCancelled()) {
        clearInterval(id);
        resolve();
        return;
      }
      if (!pausedRef.current) waited += tick;
      if (waited >= totalMs) {
        clearInterval(id);
        resolve();
      }
    }, tick);
  });
}
