import { timeTool, type AgentTool } from "./time.js";

type ToolMeta = {
  name: string;
  description: string;
};

type ToolsRegistry = {
  list: () => ToolMeta[];
  run: (name: string) => Promise<string>;
};

export function createToolsRegistry(): ToolsRegistry {
  const tools = new Map<string, AgentTool>([[timeTool.name, timeTool]]);

  return {
    list() {
      return [...tools.values()].map(({ name, description }) => ({
        name,
        description,
      }));
    },
    async run(name) {
      const tool = tools.get(name);
      if (!tool) {
        throw new Error(`Unknown tool: ${name}`);
      }
      return tool.run();
    },
  };
}
