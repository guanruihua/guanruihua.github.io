# [`v-model`](https://juejin.cn/post/7275261996860866615#heading-3)

## vue3

```html
<!-- 父组件 -->
<template>
  <my-input v-model="msg"></my-input>
  <!-- 等同于 -->
  <my-input :modelValue="msg" @update:modelValue="msg = $event"></my-input>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const msg = ref('hello')
</script>

<!-- 子组件 -->
<template>
  <el-input :modelValue="modelValue" @update:modelValue="handleValueChange"></el-input>
</template>
<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  }
});

const emit = defineEmits(['update:modelValue']);

const handleValueChange = (value) => {
    emit('update:modelValue', value)
}
</script>
```

## vue2

```html
<!-- 子组件 -->
<template>
  <div>
    <input type="text" :value="value" @input="$emit('input', $event.target.value)">
  </div>
</template>

<script>
export default {
  props: {
    value: String,  // 默认接收一个名为 value 的 prop
  }
}
</script>
```

* 使用

```html
<!-- 父组件 -->
<my-input v-model="msg"></my-input>
// 等同于
<my-input :value="msg" @input="msg = $event">
```
