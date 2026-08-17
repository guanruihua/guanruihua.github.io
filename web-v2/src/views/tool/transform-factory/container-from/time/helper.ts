// /**
//  * 将输入的时间转换为多种常用格式
//  * @param {Date|number|string} dateInput - Date 对象、毫秒时间戳或可解析的日期字符串
//  * @returns {Object} 包含所有格式的转换结果
//  * @throws {Error} 当输入无法解析为有效日期时抛出
//  */
// function convertTime(dateInput) {
//   const date = new Date(dateInput)
//   if (isNaN(date.getTime())) {
//     throw new Error('Invalid date input')
//   }

//   // 辅助函数：补零
//   const pad = (n) => String(n).padStart(2, '0')
//   const pad3 = (n) => String(n).padStart(3, '0')

//   // ----- 1. JS Locale Date String（基于运行环境的本地化字符串）-----
//   const localeDateString = date.toLocaleString()

//   // ----- 2. ISO 8601 (UTC) -----
//   const iso8601UTC = date.toISOString() // 例: "2026-08-14T12:34:56.789Z"

//   // ----- 3. ISO 8601 (Local with timezone offset) -----
//   const offset = date.getTimezoneOffset()
//   const offsetHours = Math.abs(Math.floor(offset / 60))
//   const offsetMinutes = Math.abs(offset % 60)
//   const offsetSign = offset > 0 ? '-' : '+'
//   const tzOffset = `${offsetSign}${pad(offsetHours)}:${pad(offsetMinutes)}`
//   const iso8601Local =
//     `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T` +
//     `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}` +
//     `.${pad3(date.getMilliseconds())}${tzOffset}`

//   // ----- 4. ISO 9075（SQL 标准格式，UTC，无毫秒）-----
//   const iso9075UTC = date.toISOString().replace('T', ' ').slice(0, 19) // "2026-08-14 12:34:56"

//   // ----- 5. ISO 9075（Local，无毫秒）-----
//   const iso9075Local =
//     `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ` +
//     `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`

//   // ----- 6. RFC 3339（与 ISO 8601 UTC 一致，使用 'Z' 表示 UTC）-----
//   const rfc3339 = date.toISOString() // 即符合 RFC 3339

//   // ----- 7. RFC 7231（HTTP 日期格式）-----
//   const rfc7231 = date.toUTCString() // 例: "Fri, 14 Aug 2026 12:34:56 GMT"

//   // ----- 8. Unix Timestamp（秒）-----
//   const unixTimestamp = Math.floor(date.getTime() / 1000)

//   // ----- 9. Timestamp（毫秒）-----
//   const timestamp = date.getTime()

//   // ----- 10. UTC Format（自定义可读格式）-----
//   const utcFormat =
//     `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())} ` +
//     `${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}:${pad(date.getUTCSeconds())} UTC`

//   // ----- 11. MongoDB ObjectID（根据时间生成伪 ObjectID）-----
//   // ObjectID 前 4 字节为 Unix 时间戳（秒），后 12 字节（16 个十六进制字符）随机生成
//   const hexTimestamp = unixTimestamp.toString(16).padStart(8, '0')
//   const randomHex = Math.random().toString(16).slice(2, 18).padEnd(16, '0')
//   const mongoObjectId = hexTimestamp + randomHex

//   // ----- 12. Excel Date/Time Serial Number（1900 日期系统）-----
//   // 基于本地时间计算 Excel 序列号（自 1899-12-31 起的天数，包含小数时间）
//   const excelEpoch = new Date(1899, 11, 31) // 1899-12-31 00:00:00 本地时间
//   const excelSerialNumber = (date.getTime() - excelEpoch.getTime()) / 86400000

//   // 返回所有结果
//   return {
//     localeDateString,
//     iso8601UTC,
//     iso8601Local,
//     iso9075UTC,
//     iso9075Local,
//     rfc3339,
//     rfc7231,
//     unixTimestamp,
//     timestamp,
//     utcFormat,
//     mongoObjectId,
//     excelSerialNumber,
//   }
// }
