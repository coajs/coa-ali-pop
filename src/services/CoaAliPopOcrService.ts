import { CoaAliPopServiceBase } from '../libs/CoaAliPopServiceBase'

// 文字识别相关
// 接口文档 https://help.aliyun.com/document_detail/146692.html
export class CoaAliPopOcrService extends CoaAliPopServiceBase {
  // 二维码识别 https://help.aliyun.com/document_detail/155008.html
  async recognizeQrCode(url: string) {
    const params = { Action: 'RecognizeQrCode', 'Tasks.1.ImageURL': url }
    return await this.bin.post(params, 'statusCode')
  }

  // 身份证识别 https://help.aliyun.com/document_detail/151899.html
  async recognizeIdentityCard(url: string, side: 'back' | 'face') {
    const params = {
      Action: 'RecognizeIdentityCard',
      ImageURL: url,
      Side: side,
    }
    return await this.bin.post(params, 'statusCode')
  }

  // 营业执照识别 https://help.aliyun.com/document_detail/151895.html
  async recognizeBusinessLicense(url: string) {
    const params = { Action: 'RecognizeBusinessLicense', ImageURL: url }
    return await this.bin.post(params, 'statusCode')
  }

  // 银行卡识别 https://help.aliyun.com/document_detail/151893.html
  async recognizeBankCard(url: string) {
    const params = { Action: 'RecognizeBankCard', ImageURL: url }
    return await this.bin.post(params, 'statusCode')
  }
}
