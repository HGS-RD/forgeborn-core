import { Octokit } from '@octokit/rest';

import 'dotenv/config';

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export async function createBranch(branchName) {
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;

  const { data: mainRef } = await octokit.rest.git.getRef({
    owner,
    repo,
    ref: 'heads/main'
  });

  const { data: newRef } = await octokit.rest.git.createRef({
    owner,
    repo,
    ref: `refs/heads/${branchName}`,
    sha: mainRef.object.sha
  });

  return newRef;
}
