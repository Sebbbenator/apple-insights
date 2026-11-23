import Link from "next/link";
import StatusScreen from "@/components/StatusScreen";

export default function NotFound() {
  return (
    <StatusScreen title="Siden findes ikke" text="Vi kunne ikke finde det, du ledte efter.">
      <Link href="/">Til hjemmeskærmen</Link>
    </StatusScreen>
  );
}
