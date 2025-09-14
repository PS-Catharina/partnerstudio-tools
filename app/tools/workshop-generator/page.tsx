// app/tools/workshop-generator/page.tsx
"use client";
import dynamic from "next/dynamic";

// Fra app/tools/workshop-generator opp tre nivåer til rot, så inn i components
const WorkshopGenerator = dynamic(
  () => import("../../../components/WorkshopGenerator"),
  { ssr: false }
);

export default function Page() {
  return <WorkshopGenerator />;
}
