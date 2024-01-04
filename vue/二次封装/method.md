# [`method`](https://juejin.cn/post/7275261996860866615#heading-3)

### vue3

```html
<template>
  <div class="my-table">
    <el-table ref="table"></el-table>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { ElTable } from 'element-plus'

const table = ref();

onMounted(() => { 
    const entries = Object.entries(table.value); 
    for (const [method, fn] of entries) { 
        expose[method] = fn; 
    } 
}); 
defineExpose(expose);
```

## vue2

```html
<template>
  <div class="my-table">
    <el-table ref="el-table"></el-table>
  </div>
</template>

<Script>
export default {
  mounted() {
    this.extendMethod()
  },
  methods: {
    extendMethod() {
      const refMethod = Object.entries(this.$refs['el-table'])
      for (const [key, value] of refMethod) {
        if (!(key.includes('$') || key.includes('_'))) {
          this[key] = value
      }
    }
  },
};
</Script>
```
