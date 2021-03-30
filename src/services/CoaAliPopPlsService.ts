import { $, _ } from 'coa-helper'
import { CoaAliPopServiceBase } from '../libs/CoaAliPopServiceBase'

// 虚拟号相关
// 在线调试 https://api.aliyun.com/#/?product=Dyplsapi&api=BindAxnExtension
// 接口文档 https://help.aliyun.com/document_detail/109424.html
export class CoaAliPopPlsService extends CoaAliPopServiceBase {

  // 绑定Axn分机号，详见 https://help.aliyun.com/document_detail/110259.html
  async bindAxnExtension (mobile: string, expireAt: number, record = false, outId = '') {
    const params = {
      PhoneNoA: mobile,
      Expiration: $.datetime('YYYY-MM-DD HH:mm:ss', expireAt),
      PoolKey: 'FC100000069112386',
      IsRecordingEnabled: _.toString(record),
      OutId: outId,
      Action: 'BindAxnExtension',
    }
    return await this.bin.post(params, 'bodyCode')
  }

}