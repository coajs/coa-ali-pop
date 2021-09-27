import { CoaAliPopServiceBase } from '../libs/CoaAliPopServiceBase'

export class CoaAliPopSmsService extends CoaAliPopServiceBase {
  // 发送短信
  async send(
    mobile: string,
    data: {
      signName: string
      templateCode: string
      param: { [index: string]: any }
    }
  ) {
    const params = {
      PhoneNumbers: mobile,
      SignName: data.signName,
      TemplateCode: data.templateCode,
      TemplateParam: JSON.stringify(data.param),
      Action: 'SendSms',
    }
    return await this.bin.post(params, 'bodyCode')
  }
}
