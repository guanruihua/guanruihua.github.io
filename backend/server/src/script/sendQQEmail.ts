console.log('se')
// import nodemailer from 'nodemailer'
// import dotenv from 'dotenv'
// dotenv.config()
// 加载 .env 文件中的所有变量到 process.env
// require('dotenv').config()

// const nodemailer = require('nodemailer')

//开启一个 SMTP 连接池
// const transport = nodemailer.createTransport({
//   // host: 'smtp.qq.com', //QQ邮箱的 smtp 服务器地址
//   host: 'smtp.qq.com', //QQ邮箱的 smtp 服务器地址
//   secure: true, //使用 SSL 协议
//   secureConnection: false, //是否使用对 https 协议的安全连接
//   port: 465, //QQ邮件服务所占用的端口
//   auth: {
//     user: process.env.Email_Auth_User, //开启 smtp 服务的发件人邮箱，用于发送邮件给其他人
//     pass: process.env.Email_Auth_PASS, //SMTP 服务授权码
//   },
// })

// const mailOption = {
//   from: process.env.Email_Form, //发件人
//   to: process.env.Email_Default_To, //收件人
//   subject: 'xxx注册验证', //标题
//   html: '<b>欢迎注册 xxx 系统</b>', //正文，可使用 HTML 格式进行渲染
// }

// transport.sendMail(mailOption, function (err: any, res: any) {
//   if (err) {
//     //执行错误
//     console.log(err)
//   } else {
//     console.log(res) //执行成功， 会返回响应体内容。
//   }
//   transport.close() // 如果没用，则关闭连接池
// })
