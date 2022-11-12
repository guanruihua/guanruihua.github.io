# type

- 在 node 支持 ES 模块后，要求 ES 模块采用 .mjs 后缀文件名
- 只要遇到 .mjs 文件，就认为它是 ES 模块
- 如果不想修改文件后缀，就可以在 `package.json`文件中，指定 `type` 字段为 `module`

```js
"type": "module"
```

复制代码
这样所有 .js 后缀的文件，node 都会用 ES 模块解释。

```js
 // 使用 ES 模块规范
 node index.js
```

如果还要使用 CommonJS 模块规范，那么需要将 CommonJS 脚本的后缀名都改成.cjs，不过两种模块规范最好不要混用，会产生异常报错。
