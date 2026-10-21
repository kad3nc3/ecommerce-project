"use client";

import { useState } from "react";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const next = () => setActive((current) => (current + 1) % images.length);

  return <div className="relative overflow-hidden rounded-[28px] bg-[#d9d8d2]">
    <img key={images[active]} src={images[active]} alt={`${name}${active === 1 ? " worn" : " product photo"}`} className="photo-switch aspect-[4/5] w-full object-cover" />
    {images.length > 1 && <><div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-white/80 px-3 py-2 text-[10px] text-[#171b2e] backdrop-blur"><span>{String(active + 1).padStart(2, "0")}</span><span className="text-[#9da1af]">/ {String(images.length).padStart(2, "0")}</span></div><button type="button" onClick={next} className="absolute bottom-4 right-4 rounded-[13px] bg-[#171b2e] px-4 py-3 text-xs font-semibold text-white shadow-lg transition hover:bg-[#303653]">Next <span className="ml-2 text-[#cbd2ff]">→</span></button></>}
  </div>;
}
