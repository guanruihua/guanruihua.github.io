# [`slot`](https://juejin.cn/post/7275261996860866615#heading-3)

## vue3

```html
<template>
  <div class="my-input">
    <el-input
      v-model="childSelectedValue"
      v-bind="attrs"
      v-on="$listeners"
    >
      <template #[slotName]="slotProps" v-for="(slot, slotName) in $slots" >
          <slot :name="slotName" v-bind="slotProps"></slot>
      </template>
    </el-input>
  </div>
</template>
```

## vue2

```html
<template>
  <div class="my-input">
    <el-input
      v-model="childSelectedValue"
      v-bind="attrs"
      v-on="$listeners"
    >
     <!-- 遍历子组件非作用域插槽，并对父组件暴露 -->
     <template v-for="(index, name) in $slots" v-slot:[name]>
        <slot :name="name" />
      </template>
      <!-- 遍历子组件作用域插槽，并对父组件暴露 -->
      <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
        <slot :name="name" v-bind="data"></slot>
      </template>
    </el-input>
  </div>
</template>
```
