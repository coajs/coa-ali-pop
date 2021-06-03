import { CoaError } from 'coa-error'
import { $, Axios, axios, _ } from 'coa-helper'
import { secure } from 'coa-secure'
import { CoaAliPop } from '../typings'

export class CoaAliPopBin {
  readonly config: CoaAliPop.Config

  constructor(config: CoaAliPop.Config) {
    this.config = config
  }

  // POST请求
  public async post(body: any, errorCodeType: 'statusCode' | 'bodyCode') {
    const requestString = this.signRequestString(body, 'POST')

    const response = await axios.post(this.config.endpoint, requestString).catch((e) => e.response || e)

    return this.responseResult(response, errorCodeType)
  }

  // 生成请求字符串
  signRequestString(params: any, method: string) {
    _.defaults(params, {
      Format: 'JSON',
      SignatureMethod: 'HMAC-SHA1',
      SignatureVersion: '1.0',
      SignatureNonce: this.createNonceString(),
      Timestamp: new Date().toISOString(),
      AccessKeyId: this.config.accessKeyId,
      Version: this.config.apiVersion,
    })

    const sortQueryString = this.getSortQueryString(params)
    const stringToSign = `${method}&${this.encode('/')}&${this.encode(sortQueryString)}`
    const signature = secure.sha1_hmac(stringToSign, this.config.accessKeySecret + '&', 'base64')

    return `Signature=${this.encode(signature)}&${sortQueryString}`
  }

  // 生成随机字符串
  protected createNonceString() {
    return Math.random().toString(36).substr(2, 15)
  }

  // Signature encode
  protected encode(str: string) {
    return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A')
  }

  // 获取排序过的querystring
  protected getSortQueryString(object: any) {
    const paramList = [] as string[]
    _.forEach(object, (v, k) => {
      if (v) paramList.push(this.encode(k) + '=' + this.encode(v))
    })
    paramList.sort()
    return paramList.join('&')
  }

  // 处理结果
  protected responseResult({ status, statusText, data }: Axios.AxiosResponse, errorCodeType: string) {
    if (status !== 200) CoaError.throw('AliPop.Error.' + status, _.toString(data.Message) || _.toString(statusText) || '阿里云:服务请求错误')
    if (errorCodeType === 'bodyCode' && data.Code !== 'OK') CoaError.throw('AliPop.Error.' + data.Code, _.toString(data.Message) || '阿里云:服务返回错误')
    return $.camelCaseKeys(data)
  }
}
