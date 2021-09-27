import { CoaAliSigninBin } from '../libs/CoaAliSigninBin'

interface GetSigninTokenResponse {
  requestId: string
  signinToken: string
}

export class CoaAliSigninService {
  // bin配置
  private readonly bin: CoaAliSigninBin

  constructor() {
    this.bin = new CoaAliSigninBin()
  }

  /**
   * 通过TSS获取登录的TOKEN
   * 详见: https://help.aliyun.com/document_detail/74971.html
   * @param AccessKeyId STS返回的临时AK
   * @param AccessKeySecret STS返回的临时Secret
   * @param SecurityToken STS返回的安全Token
   */
  async GetSigninToken(
    AccessKeyId: string,
    AccessKeySecret: string,
    SecurityToken: string
  ): Promise<GetSigninTokenResponse> {
    const params = {
      Action: 'GetSigninToken',
      AccessKeyId,
      AccessKeySecret,
      SecurityToken,
      TicketType: 'mini',
    }
    return await this.bin.federation(params)
  }

  /**
   * 获取免登录链接
   * 详见: https://help.aliyun.com/document_detail/43767.html
   * @param LoginUrl 登录失效跳转的地址，一般配置为自建Web配置302跳转的URL
   * @param Destination 实际访问的服务页面
   * @param SigninToken 获取的登录Token
   */
  getSigninUrl(LoginUrl: string, Destination: string, SigninToken: string) {
    const params = { Action: 'Login', LoginUrl, Destination, SigninToken }
    return this.bin.getFederationUrl(params)
  }
}
