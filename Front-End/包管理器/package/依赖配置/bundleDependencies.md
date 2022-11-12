# [`bundleDependencies`]()

> 打包依赖。它的值是一个数组，在发布包时，bundleDependencies 里面的依赖都会被一起打包
比如指定 react 和 react-dom 为打包依赖：

```json
{
 "bundleDependencies": [
  "react",
  "react-dom"
]
}
```

> 在执行 npm pack 打包生成 tgz 压缩包中，将出现 `node_modules` 并包含 react 和 react-dom。
>
> 需要注意的是，这个字段数组中的值必须是在 `dependencies`，`devDependencies` 两个里面声明过的依赖才行。
>
> 普通依赖通常从 npm registry 安装，但当你想用一个不在 npm registry 里的包，或者一个被修改过的第三方包时，打包依赖会比普通依赖更好用
