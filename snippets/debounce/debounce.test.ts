import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { debounce } from "./debounce";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

test("runs once with the last arguments after calls stop", () => {
  const fn = vi.fn();
  const debounced = debounce(fn, 100);

  debounced("a");
  vi.advanceTimersByTime(50);
  debounced("b");
  vi.advanceTimersByTime(99);
  expect(fn).not.toHaveBeenCalled();

  vi.advanceTimersByTime(1);
  expect(fn).toHaveBeenCalledTimes(1);
  expect(fn).toHaveBeenCalledWith("b");
});

test("cancel drops the pending call", () => {
  const fn = vi.fn();
  const debounced = debounce(fn, 100);

  debounced();
  debounced.cancel();
  vi.advanceTimersByTime(100);

  expect(fn).not.toHaveBeenCalled();
});
