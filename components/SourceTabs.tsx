"use client";

import { useId, useState } from "react";
import type { KeyboardEvent } from "react";

type HighlightedFile = { name: string; html: string };

export default function SourceTabs({ files }: { files: HighlightedFile[] }) {
  const [selected, setSelected] = useState(0);
  const id = useId();

  if (files.length === 0) return null;

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const step =
      event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (step === 0) return;
    event.preventDefault();
    const next = (selected + step + files.length) % files.length;
    setSelected(next);
    document.getElementById(`${id}-tab-${next}`)?.focus();
  }

  return (
    <div className="source">
      <div
        role="tablist"
        aria-label="Source files"
        className="tabs"
        onKeyDown={handleKeyDown}
      >
        {files.map((file, index) => (
          <button
            key={file.name}
            id={`${id}-tab-${index}`}
            type="button"
            role="tab"
            aria-selected={index === selected}
            aria-controls={`${id}-panel`}
            // Only the selected tab is in the tab order; arrows move between tabs.
            tabIndex={index === selected ? 0 : -1}
            onClick={() => setSelected(index)}
          >
            {file.name}
          </button>
        ))}
      </div>
      <div
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${selected}`}
        // Highlighted on the server from files in this repo.
        dangerouslySetInnerHTML={{ __html: files[selected].html }}
      />
    </div>
  );
}
