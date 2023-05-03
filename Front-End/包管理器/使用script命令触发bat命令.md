# [`使用script命令触发bat命令`]()

> - 路径写法和node脚本不一致
> - 要正常可以通过路径可以触发的

```jsonc
{
 ...
 "script":{
  ...
  // 根目录下的bat
  "one": "one.bat",
  // 放在script 文件夹
  "two": ".\\script\\one.bat",
  ...
 }
 ...
}
```
