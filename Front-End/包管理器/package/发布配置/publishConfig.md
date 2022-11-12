# [`publishConfig`]()

> publishConfig 就是 npm 包发布时使用的配置。

比如在安装依赖时指定了 registry 为 taobao 镜像源，但发布时希望在公网发布，就可以指定 publishConfig.registry。

```json
{
 "publishConfig": {
   "registry": "https://registry.npmjs.org/"
 }
}
```
