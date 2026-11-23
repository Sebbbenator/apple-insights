"use client";

import ErrorState from "@/components/ErrorState";

export default function Error({ error, retry }) {
  return <ErrorState error={error} retry={retry} text="Vi kunne ikke hente din skærmtid." />;
}
