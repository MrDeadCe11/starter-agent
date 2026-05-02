export type AgentTool = {
  name: string;
  description: string;
  run: () => Promise<string>;
};

export const timeTool: AgentTool = {
  name: "time",
  description: "Get current ISO timestamp",
  async run() {
    return new Date().toISOString();
  },
};
