import { Octokit } from '@octokit/rest';
import 'dotenv/config';

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

/**
 * Create a new branch from main if it doesn't already exist.
 * @param {string} branchName - The name of the new branch
 * @returns {Promise<Object>} - The reference data or existing ref info
 */
export async function createBranch(branchName) {
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;

  // Get base SHA from main branch
  const { data: mainRef } = await octokit.rest.git.getRef({
    owner,
    repo,
    ref: 'heads/main'
  });

  // Check if the branch already exists
  try {
    const { data: existingRef } = await octokit.rest.git.getRef({
      owner,
      repo,
      ref: `heads/${branchName}`
    });
    console.log(`ℹ️ Branch '${branchName}' already exists. Skipping creation.`);
    return existingRef;
  } catch (err) {
    if (err.status === 404) {
      // Branch doesn't exist, so create it
      const { data: newRef } = await octokit.rest.git.createRef({
        owner,
        repo,
        ref: `refs/heads/${branchName}`,
        sha: mainRef.object.sha
      });
      console.log(`✅ Branch '${branchName}' created.`);
      return newRef;
    } else {
      throw err;
    }
  }
}
