# vue 获取和 react的 children

```html
<script setup>
import { getCurrentInstance } from 'vue'
const inst = getCurrentInstance()
const children = inst.slots.default()
</script>
```
