# [`optionalDependencies`]()

> - 可选依赖，顾名思义，表示依赖是可选的，它不会阻塞主功能的使用，安装或者引入失败也无妨
> - 这类依赖如果安装失败，那么 npm 的整个安装过程也是成功的
> - 比如我们使用 `colors` 这个包来对 `console.log` 打印的信息进行着色来增强和区分提示，但它并不是必需的, 所以可以将其加入到 `optionalDependencies`，并且在运行时处理引入失败的逻辑

使用 `npm install xxx -O` 或者 `npm install xxx --save-optional` 时，依赖会被自动插入到该字段中

```json
{
 "optionalDependencies": {
  "colors": "^1.4.0"
 }
}
```
