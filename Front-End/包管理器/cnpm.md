# cnpm

## 问题

### cnpm : 无法加载文件 C:\Users\AppData\Roaming\npm\cnpm.ps1，因为在此系统上禁止运行脚本

> 提示信息：系统禁止运行脚本。这时我们需要更改系统的执行策略，使得脚本能够在我们的系统上执行。
过程如下：
>
> 1. 以`管理员身份`运行 `Windows PowerShell`
> 2. 输入命令 `set-ExecutionPolicy RemoteSigned` 更改执行策略。
> 3. 输入`Y`, 执行更改策略。
> 4. 部分电脑要`重启电脑`才可以生效
