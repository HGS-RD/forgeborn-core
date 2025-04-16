import { runGitHubAgent } from './github_agent_core.mjs';

runGitHubAgent({
  branch_name: "feature/rc6-codegen-result",
  commit_message: "Add generated code from builder_agent_v1",
  pr_title: "🔧 RC6 Generated Skill Addition",
  pr_body: "This PR includes auto-generated code from the builder agent during RC6 planning.",
  files_to_commit: ["agents/generated/validate_supabase_key.mjs"]
});
