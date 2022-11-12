# [`peerDependencies`]()

> - 同伴依赖，一种特殊的依赖，不会被自动安装，通常用于表示与另一个包的依赖与兼容性关系来警示使用者
> - 比如我们安装 A，A 的正常使用依赖 B@2.x 版本，那么 B@2.x 就应该被列在 A 的 peerDependencies 下，表示“如果你使用我，那么你也需要安装 B，并且至少是 2.x 版本”

比如 React 组件库 Ant Design，它的 package.json 里 peerDependencies 为

```json
{
 "peerDependencies": {
  "react": ">=16.9.0",
  "react-dom": ">=16.9.0"
 }
}
```

表示如果你使用 Ant Design，那么你的项目也应该安装 react 和 react-dom，并且版本需要大于等于 16.9.0。
