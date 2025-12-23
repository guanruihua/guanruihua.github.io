import nodemailer, { SendMailOptions } from 'nodemailer'

// 开启一个 SMTP 连接池
const getTransporter = () =>
  nodemailer.createTransport({
    host: 'smtp.qq.com', //QQ邮箱的 smtp 服务器地址
    secure: true, //使用 SSL 协议
    secureConnection: false, //是否使用对 https 协议的安全连接
    port: 465, //QQ邮件服务所占用的端口
    auth: {
      user: process.env.Mail_Auth_User, //开启 smtp 服务的发件人邮箱，用于发送邮件给其他人
      pass: process.env.Mail_Auth_PASS, //SMTP 服务授权码
    },
  } as any)

export const sendMail = async (mailOption: SendMailOptions) => {
  const transport = getTransporter()
  if (!transport) return
  return new Promise<boolean>((rs) => {
    transport.sendMail(mailOption, function (err: any, res: any) {
      if (err) {
        //执行错误
        console.log(err)
        rs(false)
      } else {
        console.log(res) //执行成功， 会返回响应体内容。
        rs(true)
      }
      transport.close() // 如果没用，则关闭连接池
    })
  })
}
