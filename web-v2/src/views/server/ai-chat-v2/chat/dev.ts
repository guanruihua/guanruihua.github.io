import { req } from '@/util'
// import { text2json } from '../helper'
// import { columns } from '../data'
const columns = []

const chat = async (messages) => {
  try {
    const res = await req({
      method: 'post',
      url: 'http://localhost:2400/lms/chat/completions',
      params: {
        temperature: 0.7,
        messages,
      },
    })

    const { content } = res.data.data.choices[0].message
    return content
    // const value = text2json(content)
    // return value
  } catch (error) {
    console.error(error)
  }
}

export const send_completions = async () => {
  const allColumns: string[] = columns.map((_) => _.title)
  console.log('[All Columns Prop] ' + allColumns)

  allColumns.map(async (title) => {
    // 1. 判断是否有字段
    const HasFiledTitle = await chat([
      {
        role: 'system',
        content: `Can only answer "yes" or "no"`,
      },
      {
        role: 'user',
        content: `"." Does it have the "${title}" field?`,
      },
    ])

    console.log(`[拥有${title}字段]`, HasFiledTitle)
  })

  // await chat([
  //   {
  //     role: 'system',
  //     content:
  //       'You are a JSON-only assistant. Your entire response must be a single valid JSON object. Do not include any other text. The digital fields include ' +
  //       allColumns.join(', '),
  //   },
  //   {
  //     role: 'user',
  //     content:
  //       // 'The "violationCount" parameter as 4. give me a JSON response.',
  //       'The creation date is within the last month.',
  //   },
  // ]).then(console.log)
}
