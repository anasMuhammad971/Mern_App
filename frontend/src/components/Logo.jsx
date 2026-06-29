function Logo({ showText = true, compact = false }) {
  const markSize = compact ? "h-10 w-10" : "h-12 w-12";

  return (
    <div className="flex min-w-0 items-center gap-3">
      <span
        className={`flex ${markSize} shrink-0 items-center justify-center rounded-lg bg-campus text-white shadow-soft`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 48 48"
          className={compact ? "h-7 w-7" : "h-8 w-8"}
          role="img"
          aria-label="UniClub Hub logo"
        >
          <path
            d="M24 5L40 13V24C40 33.5 33.4 40.8 24 43C14.6 40.8 8 33.5 8 24V13L24 5Z"
            fill="currentColor"
            opacity="0.22"
          />
          <path
            d="M15 18.5C15 16.6 16.6 15 18.5 15H33V19H19.5C19.2 19 19 19.2 19 19.5V28.5C19 31.5 21.4 34 24.5 34C27.6 34 30 31.5 30 28.5V23H34V28.5C34 33.8 29.8 38 24.5 38C19.2 38 15 33.8 15 28.5V18.5Z"
            fill="currentColor"
          />
          <path d="M21 23H27V27H21V23Z" fill="currentColor" />
        </svg>
      </span>

      {showText && (
        <div className="min-w-0">
          <p className={`${compact ? "text-lg" : "text-2xl"} truncate font-bold text-ink`}>
            UniClub Hub
          </p>
          <p className="truncate text-xs font-semibold uppercase tracking-normal text-slate-500">
            Campus Community Platform
          </p>
        </div>
      )}
    </div>
  );
}

export default Logo;
