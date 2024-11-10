export default function AtomAtmCard() {
  return (
    <div className="w-full max-w-md mx-auto h-48 sm:h-56 md:h-64 bluring rounded-xl shadow-2xl overflow-hidden relative p-4 sm:p-6 md:p-8 text-white font-sans">
      <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
        <svg
          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 opacity-80"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22 10V8C22 5.79086 20.2091 4 18 4H6C3.79086 4 2 5.79086 2 8V16C2 18.2091 3.79086 20 6 20H18C20.2091 20 22 18.2091 22 16V14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M6 10H8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M6 14H10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className="absolute top-2 sm:top-4 right-2 sm:right-4 w-8 h-6 sm:w-10 sm:h-7 md:w-12 md:h-8 border border-white/30 rounded">
        <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-yellow-200 rounded-sm transform -rotate-12 translate-x-0.5 -translate-y-0.5 sm:translate-x-1 sm:-translate-y-1"></div>
      </div>
      <div className="mt-12 sm:mt-16 md:mt-20 mb-4 sm:mb-6 md:mb-8">
        <div className="text-lg sm:text-xl md:text-2xl tracking-wider sm:tracking-more-wider break-all">
          4000 1234 5678 9010
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <div className="text-base sm:text-lg md:text-xl">$ 12,0000</div>
        </div>
        <div>
          <div className="text-xs uppercase opacity-80">Cardholder</div>
          <div className="text-xs sm:text-sm">Dastine</div>
        </div>
      </div>
    </div>
  );
}
