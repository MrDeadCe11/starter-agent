import test from "node:test";
import assert from "node:assert/strict";
import { timeTool } from "../../src/tools/time.js";

test("time tool returns ISO-like timestamp", async () => {
  const value = await timeTool.run();
  assert.match(value, /^\d{4}-\d{2}-\d{2}T/);
});
