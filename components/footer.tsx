"use client"

export function Footer() {
  return (
    <footer className="bg-black/90 backdrop-blur-sm border-t border-green-500/30 mt-12">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="text-center space-y-1 sm:space-y-2">
          <p className="text-green-400 font-semibold text-sm sm:text-base animate-pulse">
            Designed & Developed by
            <span className="ml-1 text-emerald-400 font-bold">Aayam Regmi</span>
          </p>
          <p className="text-white text-xs sm:text-sm">
            <span className="text-emerald-300 font-semibold">Learn.</span>{" "}
            <span className="text-green-400 font-semibold">Code.</span>{" "}
            <span className="text-lime-300 font-semibold">Grow.</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
