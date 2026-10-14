import type { ComponentType } from "react";
import Autocomplete from "./autocomplete/solution/Autocomplete";
import BlogCard from "./blog-card/solution/BlogCard";
import Counter from "./counter/solution/Counter";

// Live demo shown on /challenges/<slug>. Add one line per challenge.
export const demos: Record<string, ComponentType> = {
  autocomplete: Autocomplete,
  "blog-card": BlogCard,
  counter: Counter,
};
