# [`CDN服务`]()

> 可以让npm上的文件都开启CDN服务

## unpkg

> 访问 unpkg.com/vue 会重定向到 `unpkg.com/vue@3.2.37/… 3.2.27` 是 Vue 的最新版本

```json
{
 "unpkg": "dist/vue.global.js",
}
```

## jsdelivr

> [jsDelivr - A free, fast, and reliable CDN for open source](https://www.jsdelivr.com/)
> 访问 `cdn.jsdelivr.net/npm/vue` 实际上获取到的是 jsdelivr 字段里配置的文件地址

```json
{
 "jsdelivr": "dist/vue.global.js",
}
```
