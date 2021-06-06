// @ts-nocheck
import { CoaAliOssBin, CoaAliPopSmsService } from '..'

// 短信配置
const smsConfig = {
  accessKeyId: 'LTAI4FkrGXXXXXXXXLZpgGmbT',
  accessKeySecret: 'T7PSOeuWIVgXXXXX3FyyqNCAPlv1',
  endpoint: 'https://dysmsapi.aliyuncs.com',
  apiVersion: '2017-05-25',
}

// 创建一个Bin配置实例
const smsBin = new CoaAliOssBin(smsConfig)

// 创建一个服务实例
const smsService = new CoaAliPopSmsService(smsBin)

// 通过一个模版给某个手机号发送短信消息
await smsService.send('15010001001', { signName: 'XXX科技', templateCode: 'XXXXXX', param: { name: '张三' } })
