import type { SVGProps } from "react";

export function AppLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 8V4H8" />
      <rect width="8" height="8" x="4" y="12" rx="2" />
      <path d="M12 12v4h4" />
      <rect width="8" height="8" x="12" y="4" rx="2" />
    </svg>
  );
}
