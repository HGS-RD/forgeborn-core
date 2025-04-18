import { createBranch } from '../../../utils/github/createBranch.mjs';
import { createPullRequest } from '../../../utils/github/createPullRequest.mjs';

export async function executeGitHubAgent({ branch, title, body }) {
  console.log('🚀 [github_agent_v1] Starting GitHub agent...');

  try {
    const createdBranch = await createBranch(branch);
    if (!createdBranch) throw new Error('Branch creation failed');

    const pr = await createPullRequest({ branch, title, body });
    if (pr?.html_url) {
      console.log(`✅ Pull request created: ${pr.html_url}`);
    } else {
      throw new Error('PR creation failed');
    }
  } catch (err) {
    console.error(`❌ GitHub Agent Error: ${err.message}`);
  }
}
