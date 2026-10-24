"use client";

import { useEffect, useRef } from "react";

export function BrandCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const root = document.documentElement;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const hide = () => { cursor.style.opacity = "0"; };
    const syncPointer = () => {
      root.classList.toggle("archives-cursor-active", finePointer.matches);
      hide();
    };
    const move = (event: PointerEvent) => {
      if (!finePointer.matches || event.pointerType === "touch") { hide(); return; }
      const target = event.target;
      if (target instanceof Element && target.closest("input, textarea, select, [contenteditable], :disabled")) { hide(); return; }
      cursor.style.transform = `translate3d(${event.clientX - 4}px, ${event.clientY - 4}px, 0)`;
      cursor.style.opacity = "1";
    };
    const leave = (event: PointerEvent) => { if (!event.relatedTarget) hide(); };

    syncPointer();
    finePointer.addEventListener("change", syncPointer);
    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerout", leave);
    window.addEventListener("blur", hide);
    window.addEventListener("keydown", hide);

    return () => {
      root.classList.remove("archives-cursor-active");
      finePointer.removeEventListener("change", syncPointer);
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerout", leave);
      window.removeEventListener("blur", hide);
      window.removeEventListener("keydown", hide);
    };
  }, []);

  return <div ref={cursorRef} className="archives-cursor" aria-hidden="true"><span>a</span></div>;
}
