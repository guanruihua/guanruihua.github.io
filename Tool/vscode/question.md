# VScode问题

## Problems loading reference 'https://json.schemastore.org/package': Unable to load schema from 'https://json.schemastore.org/package': connect ECONNREFUSED 127.0.0.1:8890

> 由于本机的同源策略安全设置，不允许跨域访问资源，所有会将该请求的响应数据拦截
setting.json 设置

```js
"http.proxyAuthorization": "false",
```

## CPU占用过高

> rg.exe占用过高

1. search.followSymlinks 取消该配置项的勾选
2. files.exclude 添加``node_modules`, 这样子就不会加载该文件夹, 可以减少加载该导致的资源的浪费

## vscode中Comments are not permitted in JSON的解决办法

> 1. 点击vscode 右下角的 ==JSON==
>
>    ![img](question.assets/20201226182440237.png)
>
> 2. 选择Configure File Association for '.json'
>
> ![img](question.assets/20201226182903753.png)
>
> 3. 输入json, 选择JSON with Comments
>
>    ![img](question.assets/20201226182923589.png)
