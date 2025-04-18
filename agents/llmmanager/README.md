# LLManager

> [!TIP]
> 🎥 Watch [this video](https://youtu.be/uqRK_aJBR2w) for a deep dive into LLManager's architecture, use cases, and more!

LLManager is a LangGraph workflow for managing approval requests. It uses reflection to improve and learn over time, along with dynamic prompt composition to handle a wide variety of approval requests.

![Architecture Diagram](/static/architecture-diagram.png)

## Usage

LLManager is configurable by setting two custom fields:

- `approvalCriteria`: The criteria for a request to be approved.
- `rejectionCriteria`: The criteria for a request to be rejected.

These fields are set in the graph's configuration object, and can be tied to specific assistants. These are used in the approval flow to determine whether or not a request should be approved or rejected.

You do not need to set these fields, as LLManager will learn from past experiences and update its prompt accordingly. However, setting them will help the model make more informed decisions, and lessen the "onboarding" period.

After creating a new assistant and (optionally) setting these fields, you can start using LLManager for approval requests. The recommended method of doing this is through the [Agent Inbox](https://github.com/langchain-ai/agent-inbox). Read [this section](#agent-inbox) to learn more.

### Configuration

The following fields can be set in the graph's configuration object:

#### `approvalCriteria`

A string that defines the criteria for a request to be approved.

#### `rejectionCriteria`

A string that defines the criteria for a request to be rejected.

#### `modelId`

A string that defines the model to use for the graph. Should be in the format `provider/model_name`. This must be a provider that is supported by the `initChatModel` method. The model also must support tool calling. To use non OpenAI models, you must install their LangChain integration package. (OpenAI support is already included.)

✅ Default: `openai/gpt-4o`

## Development

To use LLManager locally, follow these steps:

```bash
git clone https://github.com/langchain-ai/llmanager.git
cd llmanager
yarn install
cp .env.example .env
