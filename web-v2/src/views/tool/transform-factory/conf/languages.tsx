import TMP_JSON from './default/json'
import TMP_XML from './default/xml'
import TMP_HTML from './default/html'
import TMP_CSS from './default/css'
import TMP_JS from './default/js'
// import TMP_SQL from './default/sql'
import TMP_TS from './default/ts'
import TMP_MD from './default/md'

export const Languages = [
  {
    label: 'Text / Markdown',
    value: 'markdown',
    conf: {
      default: TMP_MD,
      buttons: [
        // ['TextComparison', '文本比对'],
        ['CharacterDeduplication', '字符去重'],
        ['UpperCase', '字母大写'],
        ['LowerCase', '字母小写'],
        ['HalfWidth', '半角'],
        ['FullWidth', '全角'],
        [
          'TextLengthStatistics',
          '文字长度统计',
          {
            selectHighlight: true,
          },
        ],
        [
          'MarkdownReview',
          'Markdown 预览',
          {
            selectHighlight: true,
          },
        ],
      ],
    },
  },
  {
    label: 'JSON',
    value: 'json',
    conf: {
      default: TMP_JSON,
      buttons: [
        // ['EScape', '转义'],
        // ['CancelEscape', '取消转义'],
        // ['UnicodeEncoding', 'Unicode编码'],
        // ['UnicodeDecoding', 'Unicode解码'],
        // ['JSONSchema_Verify', 'JSON Schema校验'],
        // ['JSONPath_Find', 'JSONPath 查询'],
        // ['TreeCompare', '树形比对'],
        ['json2XML', '转 XML', { selectHighlight: true }],
        // ['ToYAML', '转 YAML'],
        // ['ToCSV', '转 CSV'],
      ],
    },
  },
  {
    label: 'HTML',
    value: 'html',
    conf: {
      default: TMP_HTML,
      buttons: [
        ['RemoveAttribute', '去除标签属性'],
        ['RemoveComment', '去除备注'],
        ['RemoveEmptyTagsDOM', '去除空节点'],
        ['RemoveTag', '去除 Tag'],
        ['OnlyBody', '只保留 body'],
        [
          'ReviewHTML',
          '预览',
          {
            selectHighlight: true,
          },
        ],
        ['html2react', 'HTML to React', { selectHighlight: true }],
      ],
    },
  },
  {
    label: 'JavaScript',
    value: 'javascript',
    conf: {
      default: TMP_JS,
      buttons: [],
    },
  },
  {
    label: 'TypeScript',
    value: 'typescript',
    conf: {
      default: TMP_TS,
      buttons: [],
    },
  },
  {
    label: 'CSS',
    value: 'css',
    conf: {
      default: TMP_CSS,
      buttons: [],
    },
  },
  {
    label: '加密 · encrypt',
    value: 'encrypt',
    conf: {
      lang: 'markdown',
      buttons: [
        ['TokenGenerator', 'Token生成 / 随机密码 / 随机字符串'],
        // Hashed Text
        // Hash 文本

        // Encryption
        // 加密

        // ['UUIDGenerator', 'UUIDs 生成器'],
        // ['ULIDGenerator', 'ULID 生成器'],

        // Encryption/Decryption Text
        // 加密/解密文本

        // BIP39 Password Generator
        // BIP39密码生成器

        // Hmac Generator
        // Hmac 生成器

        // RSA Key Pair Generator
        // RSA密钥对生成器

        // Password Strength Analyzer
        // 密码强度分析仪

        // PDF Signature Checker
        // PDF签名检查器

        // MD5 Encryption
        // MD5加密

        // AES Encryption/Decryption
        // AES加密解密

        // Base64 Encoding
        // Base64编码

        // JWT Decoding
        // JWT解码

        // URL Encoding Decoding
        // URL编码解码

        // Unicode Encoding Decoding
        // Unicode编码解码

        // DES Encryption/Decryption PHP Serialize Serialization and Deserialization
        // DES加密解密 PHP Serialize 序列化与反序列化
      ],
    },
  },
  {
    label: '时间 · Date · Time',
    value: 'time',
    conf: {
      lang: 'markdown',
      buttons: [],
    },
  },
  {
    label: 'XML',
    value: 'xml',
    conf: {
      default: TMP_XML,
      buttons: [
        ['xml2json', '转 json', { selectHighlight: true }],
        // ['ToYAML', '转 YAML'],
      ],
    },
  },
  // {
  //   label: 'yaml',
  //   value: 'yaml',
  //   conf: {
  //     // default: TMP_YAML,
  //     buttons: [
  //   // ['ToJSON', '转 json'],
  //   // ['ToXML', '转 XML'],
  //     ],
  //   },
  // },
  // {
  //   label: 'SQL',
  //   value: 'sql',
  //   conf: {
  //     default: TMP_SQL,
  //     buttons: [

  //     ],
  //   },
  // },
]
