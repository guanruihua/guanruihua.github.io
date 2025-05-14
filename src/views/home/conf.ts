import { Conf } from './type'

export const conf: Conf = {
  items: [
    {
      name: 'note',
      label: 'Note',
      url: 'https://ruihuag-note.github.io/',
      style: {
        background:
          'radial-gradient(ellipse at right top, #5756CD 0%, #151419 47%, #151419 100%)',
      },
    },
    {
      name: 'pkg',
      label: 'Package',
      style: {
        background:
          'radial-gradient(ellipse at right top, #107667ed 0%, #151419 47%, #151419 100%)',
      },
    },
    {
      name: 'tool',
      label: 'Tool',
      style: {
        background:
          'radial-gradient(ellipse at right top, #a63d2a82 0%, #151419 47%, #151419 100%)',
      },
    },
    // {
    //   name: 'dev',
    //   label: 'Dev',
    //   style: {
    //     background:
    //       'radial-gradient(ellipse at right top, #00458f8f 0%, #151419 45%, #151419 100%)',
    //   },
    // },
    {
      name: 'study',
      label: 'Study',
      style: {
        background:
          'radial-gradient(ellipse at right top, #00458f8f 0%, #151419 45%, #151419 100%)',
        // 'radial-gradient(ellipse at right top, #FF3171 0%, #151419 45%, #151419 100%)',
      },
    },
  ],

  guide: [
    {
      name: '翻译',
      next: [
        ['百度翻译', 'fanyi.baidu.com', 'translate baidu fanyi'],
        ['Google翻译', 'translate.google.com', 'translate google fanyi'],
        [
          '微软翻译',
          'www.bing.com/translator',
          'translate bing microsoft fanyi',
        ],
        ['DeepL', 'www.deepl.com/zh/translator', 'translate deepl fanyi'],
      ],
    },
    {
      name: 'Web',
      next: [['Can I use', 'https://caniuse.com/', 'css caniuse']],
    },
    {
      name: 'UI 组件库',
      next: [
        [
          'Antd',
          'https://ant-design.antgroup.com/components/overview-cn',
          'React UI Component ',
        ],
        [
          'Element Plus',
          'https://element-plus.org/zh-CN/component/overview.html',
        ],
        [
          'Remix Icon',
          'https://remixicon.com/'
        ]
      ],
    },
    {
      name: '技术社区',
      next: [['掘金', 'https://juejin.cn/']],
    },
    {
      name: '综合社区',
      next: [['知乎', 'https://www.zhihu.com/hot']],
    },
    {
      name: '编码工具',
      next: [
        [
          'Regulex',
          'jex.im/regulex/#!flags=&re=%5E(0-9)(a%7Cb%7Cc)*%3F%24',
          'regulex regular',
        ],
        [
          'transform(结构转换)',
          'transform.tools/json-to-typescript',
          'transform type model',
        ],
        [
          'Autoprefixer CSS online',
          'autoprefixer.github.io',
          'css autoprefixer',
        ],
        ['JSON可视化', 'jsoncrack.com/editor', 'JSON, json-preview'],
      ],
    },
    {
      name: '工具集',
      next: [
        ['压缩/格式化工具', 'coding.tools/cn', 'inline-tool tools'],
        ['UU在线工具', 'uutool.cn/type/new/', 'inline-tool tools'],
        ['30TOOL', 'www.30aitool.com/', 'inline-tool tools'],
        ['壁纸', 'alphacoders.com/', 'wallpaper'],
      ],
    },
  ],
}
