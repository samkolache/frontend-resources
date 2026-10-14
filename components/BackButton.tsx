"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  function goBack() {
    // Opened directly in a new tab there is nothing to go back to, so go to the prep home.
    if (window.history.length > 1) router.back();
    else router.push("/");
  }

  return (
    <button type="button" className="button back-button" onClick={goBack}>
      &larr; Go back
    </button>
  );
}
