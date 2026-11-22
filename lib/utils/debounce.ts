
export function debounce<A extends unknown[]>(fn: (...args: A) => void, ms: number): ((...args: A) => void) & { cancel(): void } {
  let timerId: ReturnType<typeof setTimeout> | undefined;

  function debounced(...args: A) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      timerId = undefined;
      fn(...args);
    }, ms);
  };

  debounced.cancel = () => {
    clearTimeout(timerId);
    timerId = undefined;
  };

  return debounced;
}
