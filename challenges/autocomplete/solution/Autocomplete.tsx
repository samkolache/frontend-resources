"use client";

import { useEffect, useId, useState } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";
import { searchFruits } from "./api";
import styles from "./Autocomplete.module.css";

const DEBOUNCE_MS = 200;

export default function Autocomplete() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const listId = useId();

  useEffect(() => {
    if (!query.trim()) return;

    let stale = false;
    const timer = setTimeout(async () => {
      const next = await searchFruits(query);
      // A newer query has started; this response is out of date.
      if (stale) return;
      setResults(next);
      setActive(-1);
    }, DEBOUNCE_MS);

    return () => {
      stale = true;
      clearTimeout(timer);
    };
  }, [query]);

  const showList = open && results.length > 0;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setQuery(value);
    setOpen(true);
    if (!value.trim()) setResults([]);
  }

  function select(value: string) {
    setQuery(value);
    setOpen(false);
    setActive(-1);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      setOpen(false);
      return;
    }
    if (results.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      setActive((index) => (index + 1) % results.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setOpen(true);
      setActive((index) => (index <= 0 ? results.length - 1 : index - 1));
    } else if (event.key === "Enter" && showList && active >= 0) {
      event.preventDefault();
      select(results[active]);
    }
  }

  return (
    <div className={styles.root}>
      <input
        className={styles.input}
        role="combobox"
        aria-label="Search fruit"
        aria-expanded={showList}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={
          showList && active >= 0 ? `${listId}-${active}` : undefined
        }
        placeholder="Search fruit…"
        autoComplete="off"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      />
      <ul
        id={listId}
        role="listbox"
        aria-label="Suggestions"
        className={styles.list}
        hidden={!showList}
      >
        {results.map((result, index) => (
          <li
            key={result}
            id={`${listId}-${index}`}
            role="option"
            aria-selected={index === active}
            className={index === active ? styles.active : undefined}
            // Keep focus on the input so blur doesn't close the list first.
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => select(result)}
          >
            {result}
          </li>
        ))}
      </ul>
    </div>
  );
}
