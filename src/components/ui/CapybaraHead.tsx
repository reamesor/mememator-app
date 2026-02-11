"use client";

/**
 * Capybara head - profile view, minimalist white line art.
 * Matches the Commander MATE mascot style. Use "all over the website".
 */
export default function CapybaraHead({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="#ffffff"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      {/* Round head outline */}
      <ellipse cx="50" cy="52" rx="38" ry="35" />
      {/* Snout */}
      <path d="M 75 45 Q 88 48 90 55 Q 88 60 82 58" />
      {/* Ear */}
      <ellipse cx="28" cy="30" rx="8" ry="12" />
      {/* Eye - oval with pupil */}
      <ellipse cx="62" cy="42" rx="10" ry="8" />
      <circle cx="64" cy="42" r="3" fill="#ffffff" stroke="none" />
      {/* Mouth/whisker lines */}
      <path d="M 78 52 L 88 52 M 80 56 L 88 55" strokeWidth={2} />
    </svg>
  );
}
