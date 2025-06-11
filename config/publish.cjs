const { exec } = require('child_process')

function runCommand(command) {
  return new Promise((resolve, reject) => {
    console.log(`开始执行: ${command}`)
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error)
        return
      }
      console.log(stdout)
      resolve()
    })
  })
}

async function runCommands() {
  try {
    await runCommand('npm run build')
    await runCommand('git add .')
    await runCommand(`git commit -m "feat: dev"`)
    await runCommand(`git push `)
    console.log('所有命令执行完成')
  } catch (error) {
    console.error('执行出错:', error)
  }
}

runCommands()
