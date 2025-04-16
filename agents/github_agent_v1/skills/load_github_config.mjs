import 'dotenv/config';

export function loadGitHubConfig() {
  return {
    token: process.env.GITHUB_TOKEN,
    owner: process.env.GITHUB_OWNER || 'HGS-RD',
    repo: process.env.GITHUB_REPO || 'forgeborn-core',
    default_branch: process.env.GITHUB_DEFAULT_BRANCH || 'main',
    branch_name: process.env.GITHUB_BRANCH || 'feature/rc6-codegen-result'
  };
}