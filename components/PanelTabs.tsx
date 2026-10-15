"use client";

import { useId, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";

type Panel = { label: string; content: ReactNode };

// Both panels are rendered on the server; inactive ones are only hidden.
export default function PanelTabs({ panels }: { panels: Panel[] }) {
  const [selected, setSelected] = useState(0);
  const id = useId();

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const step =
      event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (step === 0) return;
    event.preventDefault();
    const next = (selected + step + panels.length) % panels.length;
    setSelected(next);
    document.getElementById(`${id}-tab-${next}`)?.focus();
  }

  return (
    <div className="panel-tabs">
      <div role="tablist" onKeyDown={handleKeyDown}>
        {panels.map((panel, index) => (
          <button
            key={panel.label}
            id={`${id}-tab-${index}`}
            type="button"
            role="tab"
            aria-selected={index === selected}
            aria-controls={`${id}-panel-${index}`}
            tabIndex={index === selected ? 0 : -1}
            onClick={() => setSelected(index)}
          >
            {panel.label}
          </button>
        ))}
      </div>
      {panels.map((panel, index) => (
        <div
          key={panel.label}
          id={`${id}-panel-${index}`}
          role="tabpanel"
          aria-labelledby={`${id}-tab-${index}`}
          hidden={index !== selected}
        >
          {panel.content}
        </div>
      ))}
    </div>
  );
}
