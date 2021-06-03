// @ts-nocheck
import { CoaAliOssBin, CoaAliPopPlsService } from '..'

// 虚拟号配置
const plsConfig = {
  accessKeyId: 'LTAI4FkXXXXXXXLZpgGmbT',
  accessKeySecret: 'T7PSOeuWIVgXXXXXXXFyyqNCAPlv1',
  endpoint: 'https://dyplsapi.aliyuncs.com',
  apiVersion: '2017-05-25',
}

// 创建一个Bin配置实例
const plsBin = new CoaAliOssBin(plsConfig)

// 创建一个服务实例
const plsService = new CoaAliPopPlsService(plsBin)

// 绑定Axn分机号，详见 https://help.aliyun.com/document_detail/110259.html
await plsService.bindAxnExtension('15010001001', Date.now() + 10 * 60 * 100)
