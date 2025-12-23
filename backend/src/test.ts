import { sendMail } from './script/sendQQEmail'
import dotenv from 'dotenv'
dotenv.config()
// 加载 .env 文件中的所有变量到 process.env
// require('dotenv').config() 


const mailOption = {
  from: process.env.Mail_Form, //发件人
  to: process.env.Mail_Default_To, //收件人
  subject: 'xxx注册验证', //标题
  html: '<b>欢迎注册 xxx 系统</b>', //正文，可使用 HTML 格式进行渲染
}

sendMail(mailOption)