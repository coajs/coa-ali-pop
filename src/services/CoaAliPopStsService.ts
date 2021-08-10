import { CoaAliPopServiceBase } from '../libs/CoaAliPopServiceBase'

interface GetCallerIdentityResult {
  identityType: string
  accountId: string
  requestId: string
  principalId: string
  userId: string
  arn: string
}

interface AssumeRoleResult {
  requestId: string
  assumedRoleUser: {
    arn: string
    assumedRoleId: string
  }
  credentials: {
    securityToken: string
    accessKeyId: string
    accessKeySecret: string
    expiration: string
  }
}

// STS相关
// 接口文档 https://help.aliyun.com/document_detail/28756.html
export class CoaAliPopStsService extends CoaAliPopServiceBase {
  /**
   * 调用AssumeRole接口获取一个扮演该角色的临时身份，此处RAM用户扮演的是受信实体为阿里云账号类型的RAM角色
   * 详见: https://help.aliyun.com/document_detail/28763.html
   * @param RoleArn 指定角色的ARN。格式：acs:ram::$accountID:role/$roleName
   * @param RoleSessionName 用户自定义参数。此参数用来区分不同的令牌，可用于用户级别的访问审计。长度为2~32个字符，可包含英文字母、数字、英文句点（.）、at（@）、短划线（-）和下划线（_）
   * @param Policy 权限策略。生成STS Token时可以指定一个额外的权限策略，以进一步限制STS Token的权限。若不指定则返回的Token拥有指定角色的所有权限。长度为1~1024个字符
   * @param DurationSeconds 过期时间，单位为秒。过期时间最小值为900秒，最大值为MaxSessionDuration设置的时间。默认值为3600秒
   */
  async assumeRole(RoleArn: string, RoleSessionName: string, Policy = '', DurationSeconds = 3600): Promise<AssumeRoleResult> {
    const params = { Action: 'AssumeRole', RoleArn, RoleSessionName, Policy, DurationSeconds }
    return await this.bin.post(params, 'statusCode')
  }

  /**
   * 调用GetCallerIdentity接口获取当前调用者的身份信息。
   * 详见: https://help.aliyun.com/document_detail/43767.html
   */
  async getCallerIdentity(): Promise<GetCallerIdentityResult> {
    const params = { Action: 'GetCallerIdentity' }
    return await this.bin.post(params, 'statusCode')
  }
}
