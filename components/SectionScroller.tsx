"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function SectionScroller() {
  const pathname = usePathname();

  useEffect(() => {
    const section = pathname.replace("/", "");
    if (!section || section === "free-guide") return;

    // If the section is already in the DOM (same-page nav or router cache hit),
    // scroll immediately.
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
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
