import { pushToGitHub } from './skills/push_to_github.mjs';
import { createPullRequest } from './skills/create_pull_request.mjs';

export async function runGitHubAgent(config) {
  const pushResult = await pushToGitHub(config);
  if (pushResult.success) {
    const prResult = await createPullRequest(config);
    return prResult;
  } else {
    return { error: 'Push failed', details: pushResult };
  }
}
