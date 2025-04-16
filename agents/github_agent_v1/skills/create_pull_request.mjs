import { Octokit } from '@octokit/rest';
import { loadGitHubConfig } from './load_github_config.mjs';

export async function createPullRequest({ pr_title, pr_body }) {
  const config = loadGitHubConfig();
  const octokit = new Octokit({ auth: config.token });

  const { data: pr } = await octokit.rest.pulls.create({
    owner: config.owner,
    repo: config.repo,
    title: pr_title,
    head: config.branch_name,
    base: config.default_branch,
    body: pr_body
  });

  return { success: true, url: pr.html_url };
}
