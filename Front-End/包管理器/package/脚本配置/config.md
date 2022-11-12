# config

> config 用于设置 scripts 里的脚本在运行时的参数。比如设置 port 为 3001：

```json
{
 "config": {
  "port": "3001"
 }
}
```

> 在执行脚本时，我们可以通过 npm_package_config_port 这个变量访问到 3001。

```js
console.log(process.env.npm_package_config_port); // 3001
```
