export function createSessionMemory() {
  const messages = [];

  return {
    add(message) {
      messages.push(message);
    },
    all() {
      return [...messages];
    },
    clear() {
      messages.length = 0;
    },
  };
}
