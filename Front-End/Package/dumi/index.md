# [dumi](https://d.umijs.org)

> 资源路径问题, 目前不打算使用

## 初始化

环境准备
确保正确安装 Node.js 且版本为 14+ 即可。

```shell
$ node -v
v14.19.1
```

## 脚手架

```shell

# 先找个地方建个空目录

$ mkdir myapp && cd myapp

# 通过官方工具创建项目，选择你需要的模板

$ npx create-dumi

# 安装依赖后启动项目

$ npm start
```

## 目录结构

一个普通的、使用 dumi 做研发的组件库目录结构大致如下：

```
.
├── docs               # 组件库文档目录
│   ├── index.md       # 组件库文档首页
│   ├── guide          # 组件库其他文档路由表（示意）
│   │   ├── index.md
│   │   └── help.md
├── src                # 组件库源码目录
│   ├── Button         # 单个组件
│   │   ├── `index.tsx`  # 组件源码
│   │   ├── `index.less` # 组件样式
│   │   └── index.md   # 组件文档
│   └── index.ts       # 组件库入口文件
├── `.dumirc.ts`         # dumi 配置文件
└── `.fatherrc.ts`       # father-build 的配置文件，用于组件库打包
```

如果是单纯的文档站点、不包含组件源码，忽略上面的 src 目录结构即可。

> 注意，此处仅对目录结构做说明，如果要初始化一个 dumi 项目，建议直接使用 create-dumi 的脚手架进行创建。

### 约定式路由

为了使得路由生成更容易理解、更易于控制，dumi 对 `Markdown` 文档的目录解析做了『文档路由』及『资产路由』的概念拆分。

默认情况下，docs 目录下的 `Markdown` 文档及`.dumi/pages` 下的 `React` 组件会根据目录结构解析为文档路由，src 目录下第一层级的 `Markdown` 文档会被解析为 `/components` 下的资产路由，我们可以通过配置项 `resolve.atomDirs` 对资产路由前缀及解析目录进行更改。

举几个例子方便理解：

| 磁盘路径| 解析结果 |
|:----|:----|
| `/path/to/.dumi/pages/hello.tsx`  | - 导航：Hello <br/> - 页面路由：/hello |
| `/path/to/docs/hello.md` | - 导航：Hello<br/> - 页面路由：/hello|
| `/path/to/docs/hello/index.md` | - 导航：Hello <br/> - 页面路由：/hello |
| `/path/to/docs/hello/world/dumi.md` | - 导航：Hello <br/> - 页面路由：`/hello/world/dumi` |
| `/path/to/src/hello.md` | - 导航：`Components` <br/> - 页面路由：`/components/hello` |
| `/path/to/src/hello/index.md` | - 导航：`Components` <br/> - 页面路由：`/components/hello` |
| `/path/to/src/hello/world.md` | 不识别 |
| `/path/to/src/hello/another/world.md` | 不识别 |

除此之外，以下内容也不会被识别：

- 以 . 开头的目录及文档
- 以 _ 开头的目录及文档

### 自定义导航、分组和标题

> 如果希望控制导航/分组/页面标题的生成，可以通过在 Markdown 文件顶部编写 `FrontMatter`

实现：

```md
---
title: 自定义页面名称
nav:
  title: 自定义导航名称
  order: 控制导航顺序，数字越小越靠前，默认以路径长度和字典序排序
group:
  title: 自定义分组名称
  order: 控制分组顺序，数字越小越靠前，默认以路径长度和字典序排序
---

<!-- 其他 Markdown 内容 -->
```
