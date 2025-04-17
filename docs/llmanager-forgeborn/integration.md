# 🔗 External Tool Integration Guide

## Supabase

- Used for logging (memory, reflections, traces)
- Configured via `.env`

```env
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_KEY=
```

## LLM Adapter

Supports:
- OpenAI
- Claude
- Gemini
- Grok

## GitHub

Used via `simple-git` and `@octokit/rest`