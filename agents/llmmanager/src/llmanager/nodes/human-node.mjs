// File: /Users/rogerhill/Documents/GitHub/forgeborn-core/agents/llmmanager/src/llmanager/nodes/human-node.mjs

import {
  BaseStore,
  Command,
  END,
  Send
} from "@langchain/langgraph";
import { putFewShotExamples } from "../../stores/few-shot.mjs";

/**
 * @param {object} inputs
 * @returns {string}
 */
function constructDescription(inputs) {
  return `# Approval Request

The following request was made by an employee:
\`\`\`
${inputs.request}
\`\`\`

**LLManager** is suggesting the following action be taken: **${inputs.status}**

The following explanation was provided behind the action:

${inputs.explanation}

## Actions

- To accept the action, please click 'Accept' without making changes to the inputs.
- If you agree with the action, but the explanation is incorrect, please modify the 'Explanation' input, and submit.
- If you disagree with both the action and explanation, please modify the 'Status' and 'Explanation' inputs, and submit.
- If the 'request' is not relevant, or the request is invalid, please click 'Ignore' to reject the request.

## Fields

- 'Status': The status of the request. This is either 'approved' or 'rejected'.
- 'Explanation': The explanation for your final decision. This is the final reasoning behind LLManager's decision.
`;
}

/**
 * @param {object} response
 * @param {object} state
 * @param {object} inputs
 * @returns {Promise<Command>}
 */
async function handleHumanResponse(response, state, inputs) {
  const responseType = response.type;

  if (responseType === "ignore") {
    return new Command({ goto: END });
  }

  const args = response.args;
  if (
    !args ||
    typeof args !== "object" ||
    !args.args.status ||
    !args.args.explanation
  ) {
    throw new Error(
      `Invalid response received. Expected an object containing 'status' and 'explanation'. Received:\n${JSON.stringify(args, null, 2)}`
    );
  }

  const updatedAnswer = {
    status: args.args.status,
    explanation: args.args.explanation,
  };

  await putFewShotExamples(inputs.store, inputs.assistantId, {
    input: state.query,
    answer: updatedAnswer.status,
    explanation: updatedAnswer.explanation,
  });

  if (responseType === "accept") {
    return new Command({ goto: END });
  }

  const reflectionInput = {
    query: state.query,
    generatedReasoning: state.generatedReasoning,
    originalAnswer: state.answer,
    editedAnswer: updatedAnswer,
    changeType:
      args.args.status === state.answer.status
        ? "explanationChanged"
        : "allChanged",
    reflectionsSummary: "",
  };

  return new Command({
    goto: new Send("reflection", reflectionInput),
  });
}

/**
 * @param {object} state
 * @param {object} config
 * @returns {Promise<Command>}
 */
export async function humanNode(state, config) {
  const description = constructDescription({
    request: state.query,
    explanation: state.answer.explanation,
    status: state.answer.status,
  });

  // Simulated response for CLI
  const response = {
    type: "accept",
    args: {
      args: {
        status: state.answer.status,
        explanation: state.answer.explanation,
      },
    },
  };

  return await handleHumanResponse(response, state, {
    store: config.store,
    assistantId: config.configurable?.assistant_id,
  });
}
