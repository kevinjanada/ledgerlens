import { describe, vi, it, expect, beforeEach, afterEach } from 'vitest';
import { debounce } from './debounce';

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("calls fn once after ms, not before", () => {
    // Arrange
    const fn = vi.fn();
    const debounced = debounce(fn, 300);

    // Act
    debounced("a");

    // Assert
    vi.advanceTimersByTime(299);
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(fn).toHaveBeenCalledOnce();
    expect(fn).toHaveBeenCalledWith("a");
  });

  it("only calls fn once for rapid calls, with the last args", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 300);

    // Act
    debounced("a");
    debounced("b");
    debounced("c");

    vi.advanceTimersByTime(300);
    expect(fn).toHaveBeenCalledOnce();
    expect(fn).toHaveBeenCalledWith("c");
  });

  it("does not call after cancel", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 300);

    debounced("a");

    vi.advanceTimersByTime(299);
    debounced.cancel();

    vi.advanceTimersByTime(1);
    expect(fn).not.toHaveBeenCalled();
  });

  it("restarts the wait after each call", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 300);

    debounced("a");
    vi.advanceTimersByTime(299);
    debounced("b");
    vi.advanceTimersByTime(299);

    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(fn).toHaveBeenCalledOnce();
    expect(fn).toHaveBeenCalledWith("b");
  });

  it("it still works after cancel", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 300);

    debounced("a");
    debounced.cancel();

    vi.advanceTimersByTime(300);
    expect(fn).not.toHaveBeenCalled();

    debounced("b");
    vi.advanceTimersByTime(300);
    expect(fn).toHaveBeenCalledOnce();
    expect(fn).toHaveBeenCalledWith("b");
  })
})

