export function debounce(func: (...args: any[]) => void, timeout = 300) {
  let state: NodeJS.Timeout;
  return function (...args: any[]) {
    if (state) clearTimeout(state);
    state = setTimeout(() => func(...args), timeout);
  };
}

export function throttling(func: (...args: any[]) => void, timeout = 300) {
  let state: NodeJS.Timeout;
  return function (...args: any[]) {
    if (state) return;
    func(...args);
    state = setTimeout(() => clearTimeout(state), timeout);
  };
}
