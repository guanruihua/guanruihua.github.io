# [`event`](https://juejin.cn/post/7275261996860866615#heading-3)

* 继承第三方组件Event事件
* `$listeners`: 在vue3已经被移除, 合并到`$attrs`中

```html
<!-- vue2 -->
<el-input v-bind="$attrs" v-on="$listeners"></el-input>
<!-- vue3 -->
<el-input v-bind="$attrs"></el-input>
```
