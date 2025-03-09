import dynamic from "next/dynamic";
import LoadingFallback from "./loading-fallback"; // Ensure this path is correct

// Dynamically import the LoadingContent component with SSR disabled
const LoadingContent = dynamic(() => import("@/components/LoadingContent"),{
  ssr: false, // Disable server-side rendering
  loading: () => <LoadingFallback />,
});

export default function Loading() {
  return <LoadingContent />;
}