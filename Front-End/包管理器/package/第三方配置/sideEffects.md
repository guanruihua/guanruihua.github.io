# [`sideEffects`]()

- 显示设置某些模块具有副作用，用于 webpack 的 tree-shaking 优化
- 比如在项目中整体引入 Ant Design 组件库的 css 文件

`import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'`

- 如果 Ant Design 的 package.json 里不设置 sideEffects，那么 webpack 构建打包时会认为这段代码只是引入了但并没有使用，可以 tree-shaking 剔除掉，最终导致产物缺少样式
- 所以 Ant Design 在 package.json 里设置了如下的 sideEffects，来告知 webpack，这些文件具有副作用，引入后不能被删除

```json
{
 "sideEffects": [
  "dist/*",
  "es/**/style/*",
  "lib/**/style/*",
  "*.less"
 ]
}
```
