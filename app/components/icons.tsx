import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;
export function ArrowUpRight(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
      {...props}
    >
      <path d="M6 18 18 6M6 6h12v12" />
    </svg>
  );
}
export function ArrowRight(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
      {...props}
    >
      <path d="M4 12h15m-6-6 6 6-6 6" />
    </svg>
  );
}
export function Mark(props: IconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
      {...props}
    >
      <path d="M11 4H5v8m16-8h6v8M5 20v8h6m16-8v8h-6M12 12l-4 4 4 4m8-8 4 4-4 4m-3-11-2 14" />
    </svg>
  );
}
export function Shield(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden="true"
      {...props}
    >
      <path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z" />
      <path d="m8 12 3 3 5-6" />
    </svg>
  );
}
export function Terminal(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
      {...props}
    >
      <rect x="2" y="3" width="20" height="18" rx="3" />
      <path d="m6 8 4 4-4 4m7 0h5" />
    </svg>
  );
}
export function Fingerprint(props: IconProps) {
  return (
    <svg
      viewBox="0 0 72 80"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M9 32C9 16 21 5 36 5s27 11 27 27v12M4 39v-5C4 15 18 0 36 0s32 15 32 34v9M14 43V32c0-13 10-22 22-22s22 9 22 22v13c0 13-3 22-8 29M19 45V32c0-10 7-17 17-17s17 7 17 17v14c0 14-4 23-10 30M24 46V32c0-7 5-12 12-12s12 5 12 12v14c0 12-4 21-12 29M29 47V32c0-4 3-7 7-7s7 3 7 7v14c0 12-5 21-13 27M34 33v15c0 10-4 16-10 20M38 34v14c0 12-5 20-11 25M29 53c-1 5-4 9-8 12M24 52c-1 4-3 7-6 10M19 51c-1 3-2 5-4 7M14 49l-3 5M58 53c-1 9-3 16-7 23M63 51c-1 11-3 18-6 25M68 51c-1 10-2 18-5 25M9 40v6M4 42v7" />
    </svg>
  );
}
