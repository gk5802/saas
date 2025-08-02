"use client";

import { useSimpleMode } from "@/components/SimpleModeProvider";


export default function SimpleToggle() {
  const { simple, setSimple } = useSimpleMode();

  return (
    <button
      className="px-4 py-2 border rounded"
      onClick={() => setSimple(!simple)}
      aria-pressed={simple}
    >
      {simple ? "Disable Simple Mode" : "Enable Simple Mode"}
    </button>
  );
}
