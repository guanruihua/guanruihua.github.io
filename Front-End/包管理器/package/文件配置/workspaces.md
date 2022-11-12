# workspaces

> 项目的工作区配置，用于在本地的根目录下管理多个子项目
> 可以自动地在 `npm install` 时将 `workspaces` 下面的包，软链到根目录的 `node_modules` 中，不用手动执行 `npm link` 操作
>
workspaces 字段接收一个数组，数组里可以是文件夹名称或者通配符。比如：

```json
{
 "workspaces": [
   "workspace-a"
 ]
}
```

表示在 workspace-a 目录下还有一个项目，它也有自己的 package.json。
`package.json`

workspace-a
  └── package.json

> 通常子项目都会平铺管理在 packages 目录下，所以根目录下 workspaces 通常配置为：

```json
{
 "workspaces": [
   "packages/*"
 ]
}
```
