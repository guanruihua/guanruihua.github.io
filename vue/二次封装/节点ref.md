# [`节点ref`](https://juejin.cn/post/7275261996860866615#heading-3)

* 问题: 封装后无法获取被封装组件的事例
* 解决: 通过二次封装时候, 使用`defineExpose`暴露被封装组件属性

```html
<template>
  <el-input ref="childRef" v-bind="$attrs"></el-input>
</template>

<script setup>
  import { onMounted, reactive, ref } from 'vue';
  /* 
    defineOptions参考插件 https://vue-macros.sxzz.moe/macros/define-options.html
    或者参考官网对setup中设置name的解释 https://cn.vuejs.org/api/options-misc.html#name
  */
  defineOptions({
    name: 'myInput'
  });
  const childRef = ref();
  const options = reactive<{[K: string]: any}>({});
  onMounted(() => {
    const entries = Object.entries(childRef.value);
    for(let [key, value] of entries){
      if(!value || typeof value !== 'function'){
        continue;
      }
      options[key] = value;
    }
  });
  // 暴露全部方法
  defineExpose(options);
</script>
```
