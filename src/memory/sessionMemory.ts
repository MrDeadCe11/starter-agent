export type ChatMessage = {
  role: string;
  content: string;
};

export type SessionMemory = {
  add: (message: ChatMessage) => void;
  all: () => ChatMessage[];
  clear: () => void;
};

export function createSessionMemory(): SessionMemory {
  const messages: ChatMessage[] = [];

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
