import simpleGit from 'simple-git';
import { loadGitHubConfig } from './load_github_config.mjs';

export async function pushToGitHub({ branch_name, commit_message, files_to_commit }) {
  const git = simpleGit();
  const config = loadGitHubConfig();

  try {
    await git.checkoutLocalBranch(branch_name);
    await git.add(files_to_commit);
    await git.commit(commit_message);
    await git.push('origin', branch_name);
    return { success: true, branch: branch_name };
  } catch (err) {
    return { success: false, error: err.message };
  }
}
