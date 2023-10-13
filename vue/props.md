# props

## 子组件绑定 props

### 通过对象挂载属性

```html
<template>
  <div>
    <button v-bind="rest">
     btn
    </button>
  </div>
</template>

<script setup>
import { useAttrs } from 'vue'
/**
 * 若没有 <div> , 就不需要这样子操作, vue会 属性透传
 */
// eslint-disable-next-line
const { cname, change, ...rest } = useAttrs()

</script>
```

### $attrs

```html
<template>
  <div v-model="$attrs" >
</template>
```

## useAttrs

```html
<template>
 <div v-model="attrs" />
</template>

<script setup>
import { useAttrs } from 'vue'
const attrs = useAttrs
</script>
```
