const { exec, execSync, spawn } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

listening
established

// 方法1: 使用 exec（异步）
// async function getGitDiff() {
//   try {
//     const { stdout, stderr } = await execAsync('git diff');
//     if (stderr) {
//       console.error('Git error:', stderr);
//       return null;
//     }
//     return stdout;
//   } catch (error) {
//     console.error('Error:', error);
//     return null;
//   }
// }
// getGitDiff().then(res=>{
//   console.log("🚀 ~ getGitDiff:", res)
// })

// 方法3: 使用 spawn（适合大数据量）
function getGitDiffStream() {
  return new Promise((resolve, reject) => {
    const git = spawn('git', ['diff']);
    let output = '';
    let error = '';
    
    let timeoutId = null
 // 设置超时
    timeoutId = setTimeout(() => {
      git.kill();  // 终止进程
      reject(new Error(`Git diff 超时 (${timeout}ms)`));
    }, 30000);

    git.stdout.on('data', (data) => {
      output += data.toString();
    });
    
    git.stderr.on('data', (data) => {
      error += data.toString();
    });
    
    git.on('close', (code) => {
      timeoutId && clearTimeout(timeoutId)
      if (code === 0) {
        resolve(output);
      } else {
        reject(new Error(`Git exited with code ${code}: ${error}`));
      }
    });
  });
}

getGitDiffStream().then(res=>{
  console.log("🚀 ~ getGitDiffStream:")
  console.log(res)
})