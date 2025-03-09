// app/page.tsx
"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

// Dynamically import the main component with SSR disabled
const MainContent = dynamic(() => import("@/components/Maincontent"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MainContent />
    </Suspense>
  );
}