# VScode Plugin

## 配置
>
> 在`package.json`

```js
{
  ...
  "contributes": {
    // 代码片段
    "snippets": [
      {
        "language": "vue",
        "path": "./src/snippets/vue.json"
      }
    ],
    // 活动页的 Tab
    "viewsContainers": {
      "activitybar": [
        {
          "id": "ruihuag-helper-icon",
          "title": "Helper",
          "icon": "./images/logo.png"
        }
      ]
    },
    // 活动页 菜单树
    "views": {
      "ruihuag-helper-icon": [
        {
          "id": "c1",
          "name": ""
        }
      ]
    },
    // 自定义命令
    "commands": [
      {
        "command": "ruihuag-helper.nav",
        "title": "导航栏(ruihuag)"
      },
      {
        "command": "ruihuag-helper.progress",
        "title": "显示进度条"
      }
    ],
    "menus": {
      // 文件内容 右击菜单
      "editor/context": [
        {
          "when": "editorFocus",
          "command": "ruihuag-helper.progress",
          "group": "navigation"
        },
        {
          "when": "editorFocus",
          "command": "ruihuag-helper.nav",
          "group": "navigation"
        }
      ],
      // 编辑 菜单
      "editor/title": [
        {
          "when": "editorFocus",
          "command": "ruihuag-helper.nav",
          "group": "navigation"
        },
        {
          "when": "editorFocus",
          "command": "ruihuag-helper.progress",
          "group": "navigation"
        }
      ]
    }
  },
  ...
}
```

## 注册相关事件等

### constant.ts

```ts
export const namespace = 'ruihuag-helper'
```

### hover.ts

> 鼠标悬浮 提示信息

```ts
import vscode from 'vscode'
import path from 'path'

export const hover = vscode.languages.registerHoverProvider('javascript', {
  provideHover(document: any, position: any, token: any) {
    const fileName = document.fileName
    const workDir = path.dirname(fileName)
    const word = document.getText(document.getWordRangeAtPosition(position))
    // console.log(1, document)
    // console.log(2, position)
    // console.log(3, token)
    console.log(4, '这个就是悬停的文字', word)
    // 支持markdown语法
    return new vscode.Hover(
      `### 我就是返回的信息!
      1. 第一项：
        - 第一个元素
        - 第二个元素
      2. 第二项：
        - 第一个元素
        - 第二个元素
  `)
  }
}
)
```

### tree.ts

```ts
import * as vscode from 'vscode'

const c1Tree = {
  'Snippets': {
    'vue': {
      'st': 'script-template',
      'stts': 'script-template-ts',
    }
  }
}

const aNodeWithIdTreeDataProvider = {
  getTreeItem: (el: any) => {
    let treeItem = {}
    if (typeof el === 'string') {
      treeItem = {
        label: el,
        collapsibleState: 0,
        tooltip: "hover: 单纯的字符串 ",
        // id: new Date().getTime()
      }
    } else {
      treeItem = {
        label: el._cc_key,
        collapsibleState: 1,
        tooltip: "hover: 可展开 ",
        // id: new Date().getTime()
      }
    }
    return treeItem
  },
  getChildren: (el: any) => {
    const arr = []
    const tree = el || c1Tree
    for (let item in tree) {
      const activeItem = tree[item]
      if (typeof activeItem !== 'object') {
        arr.push(`${item}：${activeItem}`)
      } else {
        Object.defineProperty(activeItem, "_cc_key", {
          get: function () { return item },
          enumerable: false
        })
        arr.push(activeItem)
      }
    }
    return arr
  },
}


export const tree = vscode.window.createTreeView('c1', {
  treeDataProvider: aNodeWithIdTreeDataProvider,
  showCollapseAll: true,
})
```

### progress.ts
>
> 带有状态的弹框

```ts
import * as vscode from 'vscode'
import { namespace } from './constant'
export const progress = vscode.commands.registerCommand(namespace + '.progress', function () {
  vscode.window.withProgress({
    location: vscode.ProgressLocation.Notification,
    title: "载入xxxx的进度...",
    cancellable: true
  }, (progress) => {
    // 初始化进度
    progress.report({ increment: 0 })

    setTimeout(() => {
      progress.report({ increment: 10, message: "在努力。。。." })
    }, 1000)

    setTimeout(() => {
      progress.report({ increment: 40, message: "马上了..." })
    }, 2000)

    setTimeout(() => {
      progress.report({ increment: 50, message: "这就结束..." })
    }, 3000)

    const p = new Promise(resolve => {
      setTimeout(() => {
        resolve({})
      }, 5000)
    })

    return p
  })
})
```

### navigation.ts
>
> 弹出信息框

```ts
import * as vscode from 'vscode'
import { namespace } from './constant'

export const nav = vscode.commands.registerCommand(namespace + '.nav', function () {
  let day = new Date()
  day.setTime(day.getTime() + 24 * 60 * 60 * 1000)
  let date = day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate()
  vscode.window.showInformationMessage(`明天是: ${date}`)
/**
  vscode.window.showInformationMessage('第一个demo弹出信息!')
  vscode.window.showWarningMessage('第一个警告信息')
  vscode.window.showErrorMessage('第一个错误信息!')
 */
})
```

### extension.ts
>
> 事件挂载处

```js
import * as vscode from 'vscode'
import { nav } from './navigation'
import { progress } from './progress'
import { hover } from './hover'
import { tree } from './tree'

export function activate(context: vscode.ExtensionContext) {
 context.subscriptions.push(nav)
 context.subscriptions.push(tree)
 context.subscriptions.push(hover)
 context.subscriptions.push(progress)
}

export function deactivate() { }
```
