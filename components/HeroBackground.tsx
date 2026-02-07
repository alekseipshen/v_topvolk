'use client';

import { useEffect, useState } from 'react';

/** Renders hero background img with full URL on client so the request always goes (fixes Vercel no-request issue). */
export default function HeroBackground({ path }: { path: string }) {
  const [src, setSrc] = useState(path);

  useEffect(() => {
    setSrc(`${window.location.origin}${path.startsWith('/') ? path : `/${path}`}`);
  }, [path]);

  return (
    <img
      src={src}
      alt=""
      className="absolute inset-0 w-full h-full object-cover object-center"
      fetchPriority="high"
      decoding="async"
    />
  );
}
