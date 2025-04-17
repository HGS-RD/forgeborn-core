# 🧠 Skills Module Reference

## Purpose

Skills are modular functions used by agents.

## Structure

Each agent contains `skills/` with individual `.mjs` files.

## Creating New Skills

1. Add `.mjs` in the agent's `skills/` folder.
2. Export a named function.
3. Import inside the agent's core logic.

## Example

```js
export async function generateLLMCall(inputs) {
  // logic here
}
```