"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function SectionScroller() {
  const pathname = usePathname();

  useEffect(() => {
    const section = pathname.replace("/", "");
    if (!section || section === "free-guide") return;

    const el = document.getElementById(section);
    if (el) {
      // If the section is already in the viewport, this pathname change was
      // triggered by the IntersectionObserver's replaceState during normal
      // scrolling — don't scroll again or it will hijack the user's position.
      const rect = el.getBoundingClientRect();
      const alreadyVisible = rect.top < window.innerHeight && rect.bottom > 0;
      if (!alreadyVisible) {
        el.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    // Section not yet in DOM — dynamically imported component still loading.
    // Use a MutationObserver to scroll the moment it appears.
    let timeout: ReturnType<typeof setTimeout>;
    const observer = new MutationObserver(() => {
      const target = document.getElementById(section);
      if (target) {
        observer.disconnect();
        clearTimeout(timeout);
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    timeout = setTimeout(() => observer.disconnect(), 3000);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, [pathname]);

  return null;
}
