# [`overrides`]()

> overrides 可以重写项目依赖的依赖，及其依赖树下某个依赖的版本号，进行包的替换。

比如某个依赖 A，由于一些原因它依赖的包 foo@1.0.0 需要替换，我们可以使用 overrides 修改 foo 的版本号：

```json
{
 "overrides": {
   "foo": "1.1.0-patch"
 }
}
```

当然这样会更改整个依赖树里的 foo，我们可以只对 A 下的 foo 进行版本号重写：

```json
{
 "overrides": {
  "A": {
    "foo": "1.1.0-patch",
  }
}
}
```

> `overrides` 支持任意深度的嵌套。
>
> 如果在 yarn 里也想复写依赖版本号，需要使用 resolution 字段，而在 pnpm 里复写版本号需要使用 pnpm.`overrides` 字段。
