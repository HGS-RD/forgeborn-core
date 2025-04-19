function runShell(cmd) {
  return new Promise((resolve, reject) => {
    console.log(`➡️ Executing: ${cmd}`);
    exec(cmd, { shell: '/bin/bash' }, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Command failed: ${cmd}`);
        console.error(stderr || error.message);
        return reject(new Error(stderr || error.message));
      }
      console.log(stdout);
      resolve(stdout);
    });
  });
}
