import { Conf } from './type'

export const conf: Conf = {
  items: [
    {
      name: 'note',
      label: 'Note',
      url: 'ruihuag-note.github.io/',
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
      next: [['Can I use', 'caniuse.com/', 'css caniuse']],
    },
    {
      name: 'UI 组件库',
      next: [
        [
          'Antd',
          'ant-design.antgroup.com/components/overview-cn',
          'React UI Component ',
        ],
        ['Element Plus', 'element-plus.org/zh-CN/component/overview.html'],
        ['EChart', 'echarts.apache.org/examples/zh/index.html'],
        ['iconify', 'icon-sets.iconify.design'],
        ['Remix Icon', 'remixicon.com/'],
      ],
    },
    {
      name: '技术社区',
      next: [
        ['掘金', 'juejin.cn/'],
        ['Code Pen', 'codepen.io'],
      ],
    },
    {
      name: '综合',
      next: [
        ['B站', 'https://t.bilibili.com/?tab=video'],
        ['知乎', 'www.zhihu.com/hot'],
        ['音乐 ZZ123', 'https://zz123.com/'],
      ],
    },
    {
      name: 'AI',
      next: [
        ['deepseek', 'chat.deepseek.com'],
        ['元宝', 'yuanbao.tencent.com'],
        ['ChatGPT', 'chatgpt.com'],
        ['Poe', 'poe.com'],
      ],
    },
    {
      name: '邮箱',
      next: [
        [
          'QQ邮箱',
          'https://mail.qq.com/?cancel_login=true&from=session_timeout',
        ],
        ['Outlook', 'https://partner.outlook.cn/mail/'],
      ],
    },
    {
      name: '工具(集)',
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
        ['压缩/格式化工具', 'coding.tools/cn', 'inline-tool tools'],
        ['UU在线工具', 'uutool.cn/type/new/', 'inline-tool tools'],
        ['30TOOL', 'www.30aitool.com/', 'inline-tool tools'],
        ['json.cn', 'www.json.cn/'],
        ['开发者武器库', 'devtool.tech/'],
        ['图片压缩zippic', 'https://www.zippic.cn/'],
        ['壁纸', 'alphacoders.com/', 'wallpaper'],
      ],
    },
    {
      name: 'ACG',
      next: [
        ['原神', 'www.miyoushe.com/ys'],
        [
          '原神地图',
          'act.mihoyo.com/ys/app/interactive-map/index.html?bbs_presentation_style=no_header&lang=zh-cn&utm_source=bbs&utm_medium=mys&utm_campaign=pcicon&_markerFps=24#/map/2?shown_types=2,3,154,517,658,659,626,356,17,44,45,269,70,64,77,69,597,600,667,668,680,596,410',
        ],
        ['玉衡杯数据库', 'homdgcat.wiki'],
        ['Honey Impact', 'gensh.honeyhunterworld.com/?lang=CHS'],
        ['崩坏: 星穹铁道', 'www.miyoushe.com/sr'],
        ['绝区零', 'www.miyoushe.com/zzz/'],
        ['萌娘百科', 'mzh.moegirl.org.cn'],
        ['次元小镇', 'dimtown.com/'],
        ['TouchGal', 'www.touchgal.io/'],
      ],
    },
    {
      name: 'Platform',
      next: [
        ['npmjs', 'www.npmjs.com'],
        ['deepseek', 'platform.deepseek.com/usage'],
      ],
    },
  ],
}
