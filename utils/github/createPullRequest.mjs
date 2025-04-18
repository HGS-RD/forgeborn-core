import { Octokit } from '@octokit/rest';

import 'dotenv/config';

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export async function createPullRequest({ branch, title, body }) {
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;

  const { data: pr } = await octokit.rest.pulls.create({
    owner,
    repo,
    head: branch,
    base: 'main',
    title,
    body
  });

  return pr;
}
