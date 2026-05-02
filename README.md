# starter-agent

Bootstrap repo for building AI agent against local Ollama using JavaScript `ollama` client.

## Requirements

- Node.js 20+
- Ollama installed and running locally

## Install

```bash
npm install
```

## Pull model (example)

```bash
ollama pull llama3.2:3b
```

## Run

```bash
npm start -- "Write haiku about local LLMs"
```

Optional model override:

```bash
OLLAMA_MODEL=llama3.2:3b npm start -- "Explain retrieval-augmented generation"
```

## Notes

- Default Ollama host is `http://127.0.0.1:11434`.
- Change host with `OLLAMA_HOST` if needed.
