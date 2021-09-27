import { CoaError } from 'coa-error'
import { $, Axios, axios, _ } from 'coa-helper'

const baseURL = 'https://signin.aliyun.com'

export class CoaAliSigninBin {
  // 统一get请求
  async federation(params: { [key: string]: string }) {
    const response = await axios('/federation', { params, baseURL })

    return this.responseResult(response)
  }

  // 获取链接
  getFederationUrl(params: { [key: string]: string }) {
    const url = new URL('/federation', baseURL)
    _.forEach(params, (v, k) => {
      url.searchParams.append(k, v)
    })
    return url.toString()
  }

  // 处理结果
  protected responseResult({ status, statusText, data }: Axios.AxiosResponse) {
    if (status !== 200)
      CoaError.throw(
        'AliPop.Error.' + status,
        '阿里云服务提示: ' + (data?.Message || statusText || '请求错误')
      )
    if (data.ErrorCode)
      CoaError.throw(
        'AliPop.Error.' + data.ErrorCode,
        '阿里云服务提示: ' + (data.ErrorMessage || '返回异常错误')
      )
    return $.camelCaseKeys(data)
  }
}
