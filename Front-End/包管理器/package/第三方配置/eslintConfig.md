# eslintConfig

> eslint的配置可以写在单独的配置文件`.eslintrc.json` 中，也可以写在package.json文件的eslintConfig配置项中

```json
{
"eslintConfig": {
 "root": true,
 "env": {
  "node": true
 },
 "extends": [
  "plugin:vue/essential",
  "eslint:recommended"
 ],
 "rules": {},
 "parserOptions": {
  "parser": "babel-eslint"
 },
}
}
```
