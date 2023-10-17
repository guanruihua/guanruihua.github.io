# [`nextTick`](https://cn.vuejs.org/api/general.html#nexttick)
>
> - 等待下一次 DOM 更新刷新

## type

```ts
 function nextTick(callback?: () => void): Promise<void>
```

# eg

```html
 <script setup>
import { ref, nextTick } from 'vue'

const count = ref(0)

async function increment() {
  count.value++

  // DOM 还未更新
  console.log(document.getElementById('counter').textContent) // 0

  await nextTick()
  // DOM 此时已经更新
  console.log(document.getElementById('counter').textContent) // 1
}
</script>

<template>
  <button id="counter" @click="increment">{{ count }}</button>
</template>
```
