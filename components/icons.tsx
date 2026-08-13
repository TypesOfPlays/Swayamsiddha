/**
 * Hairline icon set — 1.25 stroke on a 24 grid, round caps and joins.
 * Deliberately lighter than stock icon libraries so the icons read as
 * drawn detail rather than UI furniture. All inherit currentColor.
 */

type IconProps = React.SVGProps<SVGSVGElement>;

function Svg({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function IconPhone(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a1.5 1.5 0 0 1-1.7 1.5A16.5 16.5 0 0 1 5 5.2 1.5 1.5 0 0 1 6.5 3.5Z" />
    </Svg>
  );
}

export function IconWhatsApp(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3.8 20.2 5 16.4A7.9 7.9 0 1 1 7.9 19.2l-4.1 1Z" />
      <path d="M9 8.4c.3-.1.6 0 .8.4l.6 1.2c.1.3 0 .5-.2.7l-.5.5a5.6 5.6 0 0 0 2.8 2.8l.5-.5c.2-.2.4-.3.7-.2l1.2.6c.4.2.5.5.4.8-.2.8-1 1.4-1.9 1.3a7.4 7.4 0 0 1-5.6-5.6c-.1-.9.4-1.7 1.2-2Z" />
    </Svg>
  );
}

export function IconXray(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
      <path d="M12 6v12M8.5 8.5h7M7.5 12h9M8.5 15.5h7" />
    </Svg>
  );
}

export function IconPulse(props: IconProps) {
  return (
    <Svg {...props}>
      {/* pathLength lets the dash animation in globals.css retrace this on
          hover without knowing the real geometry */}
      <path d="M2.5 12h4l2-5 3.5 10 2.5-5h7" pathLength={100} />
    </Svg>
  );
}

export function IconDroplet(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 3.2c3 3.6 5.5 6.4 5.5 9.3a5.5 5.5 0 0 1-11 0c0-2.9 2.5-5.7 5.5-9.3Z" />
      <path d="M9.6 13.2a2.6 2.6 0 0 0 2.2 3" />
    </Svg>
  );
}

export function IconClock(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.2V12l3 1.8" />
    </Svg>
  );
}

export function IconHomeVisit(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3.5 10.5 12 4l8.5 6.5" />
      <path d="M5.5 9.6V19a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V9.6" />
      <path d="M10 20v-4.5h4V20" />
    </Svg>
  );
}

export function IconPin(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 21c4-4.4 6-7.6 6-10a6 6 0 1 0-12 0c0 2.4 2 5.6 6 10Z" />
      <circle cx="12" cy="11" r="2.4" />
    </Svg>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4.5 12.5 9 17l10.5-10.5" />
    </Svg>
  );
}

export function IconArrowUpRight(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M7.5 16.5 16.5 7.5M9 7.5h7.5V15" />
    </Svg>
  );
}

export function IconSearch(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M15.8 15.8 20.5 20.5" />
    </Svg>
  );
}

export function IconMicroscope(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M9.5 4.5h3l1 6h-5l1-6Z" />
      <path d="M8 10.5h6.5a4.5 4.5 0 0 1 0 9H6" />
      <path d="M4.5 20.5h15" />
      <path d="M7 4.5h8" />
    </Svg>
  );
}

export function IconReport(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M6.5 3.5h7L18.5 8v12a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z" />
      <path d="M13 3.6V8.5h4.9" />
      <path d="M9 13h6M9 16.5h4" />
    </Svg>
  );
}

export function IconDoor(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M13.5 3.5h4a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1h-4" />
      <path d="M10.5 12h-6M7.5 9l-3 3 3 3" />
    </Svg>
  );
}

export function IconTube(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M9.2 3.5h5.6v2.4H9.2z" />
      <path d="M10 5.9v11.6a2 2 0 0 0 4 0V5.9" />
      <path d="M10 13.4h4" />
    </Svg>
  );
}

export function IconAnalyzer(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
      <rect x="6.2" y="7.6" width="7" height="5" rx="1" />
      <path d="M15.8 9h2.6M15.8 11.6h2.6M7 16.4h10" />
    </Svg>
  );
}

export function IconBuilding(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5 20.5V6.4a1 1 0 0 1 .7-.95l6.6-2.05a1 1 0 0 1 1.2.95V20.5" />
      <path d="M13.5 10.5h4.8a1 1 0 0 1 1 1v9" />
      <path d="M8 8.6h2M8 12.1h2M8 15.6h2M15.5 14h1.6M15.5 17.2h1.6" />
      <path d="M3.5 20.5h17" />
    </Svg>
  );
}

export function IconChevronDown(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M6 9.5 12 15.5l6-6" />
    </Svg>
  );
}
