"use client"
export default function LoadingFallback() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-teal-950">
      <div className="flex flex-col items-center gap-6">
        {/* Spinner with a subtle glow */}
        <div className="w-16 h-16 border-4 border-t-4 border-white/20 border-t-teal-400 rounded-full animate-spin shadow-lg shadow-teal-400/30" />

        {/* Title with glitch effect */}
        <h1 className="text-4xl font-mono text-teal-400 animate-pulse relative">
          <span className="relative inline-block">
            Loading...
            <span className="absolute top-0 left-0 text-teal-300 opacity-50 animate-glitch-1">Loading...</span>
            <span className="absolute top-0 left-0 text-teal-500 opacity-50 animate-glitch-2">Loading...</span>
          </span>
        </h1>

        {/* Subtitle with bounce and fade */}
        <p className="text-sm text-white/70 font-mono animate-bounce-fade">
          Initializing Matrix...
        </p>
      </div>

      {/* Tailwind CSS custom animations */}
      <style jsx>{`
        @keyframes glitch-1 {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(2px, -2px); }
          60% { transform: translate(-2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
        @keyframes glitch-2 {
          0% { transform: translate(0); }
          25% { transform: translate(2px, -1px); }
          50% { transform: translate(-1px, 2px); }
          75% { transform: translate(1px, -2px); }
          100% { transform: translate(0); }
        }
        @keyframes bounce-fade {
          0%, 100% { transform: translateY(0); opacity: 0.7; }
          50% { transform: translateY(-8px); opacity: 1; }
        }
        .animate-glitch-1 {
          animation: glitch-1 1s infinite;
        }
        .animate-glitch-2 {
          animation: glitch-2 1s infinite;
        }
        .animate-bounce-fade {
          animation: bounce-fade 2s infinite;
        }
      `}</style>
    </div>
  );
}