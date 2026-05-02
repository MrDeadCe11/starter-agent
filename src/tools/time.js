export const timeTool = {
  name: "time",
  description: "Get current ISO timestamp",
  async run() {
    return new Date().toISOString();
  },
};
