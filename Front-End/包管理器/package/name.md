# name

> 1. 项目的名称
> 2. 如果是第三方包的话，其他人可以通过该名称使用 `npm install [name]`进行安装

给name字段命名时，需要注意以下几点：

- 名称的长度必须小于或等于214个字符，不能以“.”和“_”开头，不能包含大写字母（这是因为当软件包在npm上发布时，会基于此属性获得自己的URL，所以不能包含非URL安全字符（non-url-safe））；
- 名称可以作为参数被传入`require("")`，用来导入模块，所以应当尽可能的简短、语义化；
- 名称不能和其他模块的名称重复，可以使用`npm view`命令查询模块明是否重复，如果不重复就会提示404：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a19278d60f5a4edbaab907273a7e3a90~tplv-k3u1fbpfcp-watermark.awebp)

如果npm包上有对应的包，则会显示包的详细信息：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/143f24d9f95c4c1e97b90fabe4171536~tplv-k3u1fbpfcp-watermark.awebp) 实际上，我们平时开发的很多项目并不会发布在npm上，所以这个名称是否标准可能就不是那么重要，它不会影响项目的正常运行。如果需要发布在npm上，name字段一定要符合要求。
