import { timeTool } from "./time.js";

export function createToolsRegistry() {
  const tools = new Map([[timeTool.name, timeTool]]);

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
