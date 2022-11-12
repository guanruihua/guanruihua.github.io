# [`lint-staged`]()

> `lint-staged` 是用于对 git 的暂存区的文件进行操作的工具，比如可以在代码提交前执行 lint 校验，类型检查，图片优化等操作

```json
{
 "lint-staged": {
  "src/**/*.{js,jsx,ts,tsx}": [
    "eslint --fix",
    "git add -A"
  ]
}
}
```

> `lint-staged` 通常配合 `husky` 这样的 `git-hooks` 工具一起使用
> `git-hooks` 用来定义一个钩子，这些钩子方法会在 git 工作流程中比如 `pre-commit`，`commit-msg` 时触发，可以把 `lint-staged` 放到这些钩子方法中
