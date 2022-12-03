# 描述

- 虚拟数据生成

## 使用

```shell
npm install rh-mock
```

```js
import { Mock } from 'rh-mock'

Mock("@name")
=> 'Ruihuag'
```

## 说明

```js
Mock({
  'name|rule|key1,key2,key3...|[DictionaryKey]':'@name'
})
```

- `name`: 表示当前属性真正name
- `rule` : 指定生成数量等规则
- `key1,key2,key3...`: 表示当前属性为对象, 并且指定多个key, 且值为 `@name`
- `@name`: 数据规则

## 规则使用

```js
Mock("@name")
=> 'Ruihuag'
```

## `name|number`

```js
 Mock({ 'name': '@name' })
 Mock({ 'name|1': 1 })
 Mock({ 'name|1': '@name' })
 Mock({ 'name|3': '@name' })
 Mock({ 'name|3': 1 })
 =>
  { name: 'Ruihuag' }
  { name: 1 }
  { name: 'Jose' }
  { name: 'FrankGaryDavid' }
  { name: 4 }

```

## 范围 `name|2-222`

```js
Mock({"name|3-5":"@name"})
=> { name: [ 'Jeffrey', 'Jose', 'Gary', 'William' ] }
```

## 指定数量 `name|12`

```js
Mock({"name|3":"@name"})
=>  { name: [ 'Christopher', 'Daniel', 'Richard' ] }
```

## 多用一

### 基础使用 `{'name||key1,key2,key3':'@name'}`

```js
{name: { key1: 'Mark', key2: 'Jason', key3: 'Thomas' }`}
```

### 指定数量 `{'name|2|key1,key2,key3': "@name"}`

```js
{
  name: [
    { key1: 'Mark', key2: 'Donald', key3: 'Michael' },
    { key1: 'George', key2: 'Jose', key3: 'Edward' },
  ]
}
```

### 数量范围组 `{'name|2-5|key1,key2,key3': "@name"}`

```js
{
  name: [
    { key1: 'Jason', key2: 'Kenneth', key3: 'Scott' },
    { key1: 'Mark', key2: 'Donald', key3: 'Michael' },
    { key1: 'George', key2: 'Jose', key3: 'Edward' },
  ]
}
```

## 多用一 并转子串

### 基础 `{'name||key1,key2,key3|JsonString':'@name'}`

```js
{
  name: '{"key1":"Joseph","key2":"Michael","key3":"Jose"}'
}
```

### 指定数量 `{'name|2|key1,key2,key3|JsonString': "@name"}`

```js
{
  name: '[{"key1":"Anthony","key2":"Eric","key3":"Edward"},{"key1":"Thomas","key2":"Eric","key3":"Edward"}]'
}
```

### 数量范围 `{'name|2-5|key1,key2,key3|JsonString': "@name"}`

```js
{ name: '{"key1":"James","key2":"Jeffrey","key3":"William"}' }
```

## 自定义规则

- 优先级最高, 会覆盖包原本规则

```js
import { Mock, initDictionary, dictionary } from '../src'

// 可以查看已经设置的规则字典
dictionary

initDictionary({
  'aaa': 'ababab',
  'bbb': function (a = '1', b = '2') {
    return a + '---' + b
  }
})

Mock('@bbb(123,456)') // 123---456
Mock('@aaa') // ababab

```

## 操作符

### 基础数据类型

|     操作符     |        描述        |     结果     |
| :------------: | :----------------: | :----------: |
|    `@char`     |        字符        |     `A`      |
|   `@boolean`   |       布尔值       |    `true`    |
|   `@string`    |       字符串       | `wg0DGEE1s[` |
| `@string(3,5)` | 指定范围长度字符串 |    `wg0D`    |
|     `@num`     |        数字        |     520      |
|  `@num(5,10)`  |    指定范围数字    |      5       |
|    `@float`    |       浮点型       |    13.14     |

### 名称

|  操作符   |     描述     |      结果 |
| :-------: | :----------: | --------: |
|  `@name`  |    英文名    | `Ruihuag` |
| `@cname`  |    中文名    |  `关瑞毕` |
| `@first`  | 英文名称的名 |  `Sandra` |
|  `@last`  | 英文名称的姓 |    `Jose` |
| `@cfirst` |    中文姓    |      `关` |
| `@clast`  |    中文名    |    `瑞毕` |

### 文本

|     操作符      |  描述  |                                                                                                                                                                                                                                                                                                                                                                                                                               结果                                                                                                                                                                                                                                                                                                                                                                                                                               |
| :-------------: | :----: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|    `@title`     |  标题  |                                                                                                                                                                                                                                                                                                                                                                                                                            `土好保观`                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `@title(3,30)`  |  标题  |                                                                                                                                                                                                                                                                                                                                                                                                    `传年圆美石所技道只式器知老引明说外海专性油复队运构科文重`                                                                                                                                                                                                                                                                                                                                                                                                    |
|    `@cword`     | 中文字 |                                                                                                                                                                                                                                                                                                                                                                                                                               `厂`                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `@sentence(2)`  |  句子  |                                                                                                                                                                                                                                                                                                                                                                                  `Enim ad aute eiusmod enim occaecat. Aliqua anim dolore eiusmod officia commodo amet nostrud.`                                                                                                                                                                                                                                                                                                                                                                                  |
|   `@sent(2)`    |  句子  |                                                                                                                                                                                                                                                                                                                                                                                  `Enim ad aute eiusmod enim occaecat. Aliqua anim dolore eiusmod officia commodo amet nostrud.`                                                                                                                                                                                                                                                                                                                                                                                  |
| `@paragraph(2)` | 自然段 | <div style="text-align:left;">&nbsp;&nbsp;&nbsp;&nbsp;Laboris ex ad duis reprehenderit deserunt enim. In laboris Lorem est pariatur eu officia incididunt ipsum sint adipisicing nisi ullamco ut do. Quis ullamco tempor exercitation duis elit duis duis adipisicing. Occaecat pariatur reprehenderit consectetur amet non cillum velit eu cupidatat ad. Reprehenderit excepteur sint commodo officia adipisicing id labore veniam amet irure. Cillum nisi voluptate exercitation minim in ut aliquip laborum duis. Lorem veniam amet magna labore reprehenderit culpa adipisicing eiusmod ipsum exercitation.</br>&nbsp;&nbsp;&nbsp;&nbsp;Eiusmod minim aliqua dolor nostrud et. Mollit ad ex laborum ea deserunt incididunt pariatur. Ipsum exercitation Lorem consectetur dolor incididunt excepteur labore proident cupidatat dolore consequat dolor.</div> |
|   `@para(2)`    | 自然段 | <div style="text-align:left;">&nbsp;&nbsp;&nbsp;&nbsp;Laboris ex ad duis reprehenderit deserunt enim. In laboris Lorem est pariatur eu officia incididunt ipsum sint adipisicing nisi ullamco ut do. Quis ullamco tempor exercitation duis elit duis duis adipisicing. Occaecat pariatur reprehenderit consectetur amet non cillum velit eu cupidatat ad. Reprehenderit excepteur sint commodo officia adipisicing id labore veniam amet irure. Cillum nisi voluptate exercitation minim in ut aliquip laborum duis. Lorem veniam amet magna labore reprehenderit culpa adipisicing eiusmod ipsum exercitation.</br>&nbsp;&nbsp;&nbsp;&nbsp;Eiusmod minim aliqua dolor nostrud et. Mollit ad ex laborum ea deserunt incididunt pariatur. Ipsum exercitation Lorem consectetur dolor incididunt excepteur labore proident cupidatat dolore consequat dolor.</div> |

### 居住地址

| 操作                   | 描述           | 结果                                            |
| :--------------------- | :------------- | :---------------------------------------------- |
| `region`               | 地区           | 西北                                            |
| `province`             | 省             | 广东省                                          |
| `city`                 | 城市           | 韶关市                                          |
| `district`             | 区域           | 洮北区                                          |
| `address`              | 地址           | 安徽省宣城市宣州区1d8街道6e路69号99栋36单元78号 |
| `address(RR PP CC DD)` | 地址(指定格式) | 东北 山西省 吕梁市 汾阳市                       |

 补充:

- `RR`: 地区  
- `PP`: 省
- `CC`: 城市
- `DD`: 地区

### 其他地址

| 操作      | 描述    | 结果                                    |
| :-------- | :------ | :-------------------------------------- |
| `@ip`     | ip      | 242.86.47.174                           |
| `@ip6()`  | ipv6    | e60b:3d50:be5c:ea37:3005:8a35:846e:1aeb |
| `@domain` | web地址 | opubztw.xxq                             |
| `@email`  | 邮箱    | cxydhhsfxqzki@nipik.ftnyl               |

### 颜色

- 待开发
- color, hex, rgb, rgba, hsl

### 图片

#### `@image([text[,size[,background[,foreground[,format]]]]])`

- 图片链接
- `text = ''`: 文字
- `size = '200x200'` :图片大小
- `background = '000'`: 背景图片
- `foreground = 'fff'`: 文字颜色
- `format: '' | 'png' | 'gif' | 'jpg' = ''` : 图片格式

#### 时间

| 操作符                       | 描述           | 结果                  |
| :--------------------------- | :------------- | :-------------------- |
| `@now`                       | 现在           | `2022-06-08 16:58:16` |
| `@now(YYYY-MM-DD HH:mm:ss)`  | 现在           | `2022-06-08 16:58:16` |
| `@date`                      | 随机日期       | `2021-09-27`          |
| `@date(YYYY-MM-DD)`          | 随机日期       | `2022-03-28`          |
| `@date(YYYY-MM-DD HH:mm:ss)` | 随机日期       | `2020-03-24 22:58:16` |
| `@time`                      | 随机时间       | `22:58:16`            |
| `@time(HH:mm:ss)`            | 随机时间       | `04:58:16`            |
| `@time(YYYY-MM-DD HH:mm:ss)` | 随机时间       | `2020-06-27 22:58:16` |
| `@timeStamp`                 | 随机时间戳     | `1604703768135`       |
| `@nowTimeStamp`              | 当前时间时间戳 | `1604703768135`       |

### 特殊

|                    操作符                     | 描述  |                  结果                  |
| :-------------------------------------------: | :---: | :------------------------------------: |
|                     `@id`                     |  id   |           `3191230364936506`           |
|                    `@uuid`                    | uuid  | `326be748-57bd-c2d0-84f4-99bb488a4292` |
| `@uuid(xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx)` | uuid  | `326be748-57bd-c2d0-84f4-99bb488a4292` |
