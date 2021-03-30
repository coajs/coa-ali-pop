// @ts-nocheck
import { CoaAliOssBin, CoaAliPopOcrService } from '..'

// 文字识别配置
const ocrConfig = {
  accessKeyId: 'LTAI4FkrXXXXXXLZpgGmbT',
  accessKeySecret: 'T7PSOeuWIVgpXXXXXXyyqNCAPlv1',
  endpoint: 'https://dyplsapi.aliyuncs.com',
  apiVersion: '2017-05-25'
}

// 创建一个Bin配置实例
const ocrBin = new CoaAliOssBin(ocrConfig)

// 创建一个服务实例
const ocrService = new CoaAliPopOcrService(ocrBin)

// 二维码识别 详见 https://help.aliyun.com/document_detail/155008.html
await ocrService.recognizeQrCode('path/qr-code.png')

// 身份证识别 https://help.aliyun.com/document_detail/151899.html
await ocrService.recognizeIdentityCard('path/identity-card-face.png', 'face')
await ocrService.recognizeIdentityCard('path/identity-card-back.png', 'back')

// 银行卡识别 https://help.aliyun.com/document_detail/151893.html
await ocrService.recognizeBankCard('path/bank-card.png')

// 营业执照识别 https://help.aliyun.com/document_detail/151895.html
await ocrService.recognizeBusinessLicense('path/business-license.png')