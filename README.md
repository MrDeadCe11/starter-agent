# starter-agent

Bootstrap repo for building AI agent against local Ollama using TypeScript and `ollama` client.

## Requirements

- Node.js 20+
- Ollama installed and running locally

## Install

```bash
npm install
```

## Environment

Copy env template:

```bash
cp .env.example .env
```

Defaults:

- `OLLAMA_HOST=http://127.0.0.1:11434`
- `OLLAMA_MODEL=llama3.2:3b`
- `MAX_TOOL_ROUNDS=3`

## Pull model (example)

```bash
ollama pull llama3.2:3b
```

## Run

```bash
npm start -- "Write haiku about local LLMs"
```

Tool smoke test:

```bash
npm start -- "/time"
```

Run tests:

```bash
npm test
```

Build:

```bash
npm run build
```

## Project layout

```text
src/
  agent/      # agent loop + Ollama call
  config/     # env-based config loader
  lib/        # shared helpers (logger)
  memory/     # in-memory session storage
  prompts/    # system prompts/templates
  tools/      # tool registry + tool modules
tests/        # node:test tests
```
