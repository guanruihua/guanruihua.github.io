# dva-extend

## dva+antd

> `npm install antd babel-plugin-import --save`

`.webpackrc`添加配置

```json
{
+  "extraBabelPlugins": [
+    ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
+  ]
}
```

## 使用less

`.webpackrc`添加配置

```js
disableCSSModules: true,
  
//1.
{
  disableCSSModules: true,
}

// 2.
{
+  "extraBabelPlugins": [
+    ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css", "disableCSSModules": true,}]
+  ]
}
```
