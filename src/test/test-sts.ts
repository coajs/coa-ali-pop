import { $ } from 'coa-helper'
import { CoaAliPopBin, CoaAliPopStsService } from '..'
import { CoaAliSigninService } from '../services/CoaAliSigninService'

$.run(async () => {
  // 配置
  const config = {
    accessKeyId: 'LTAI4Fr1XXXXXXXXKkqTgH',
    accessKeySecret: 'Eg02rdV23XXXXXXXSa7wgw8Pk',
    endpoint: 'https://sts.aliyuncs.com',
    apiVersion: '2015-04-01',
  }

  // 创建一个Bin配置实例
  const bin = new CoaAliPopBin(config)

  // 创建一个服务实例
  const stsService = new CoaAliPopStsService(bin)

  // 床架一个登陆实例
  const loginService = new CoaAliSigninService()

  // 获取STS
  const res = await stsService.assumeRole(
    'acs:ram::1575463359279889:role/aliyunlogaccessrole',
    'sls'
  )

  // 登陆
  const token = await loginService.GetSigninToken(
    res.credentials.accessKeyId,
    res.credentials.accessKeySecret,
    res.credentials.securityToken
  )

  // 获取地址
  const logUrl =
    'https://sls4service.console.aliyun.com/lognext/project/xxx-project-xxx/logsearch/xxx-logstore-xxx?isShare=true'
  const url = loginService.getSigninUrl(
    'https://isus.vip',
    logUrl,
    token.signinToken
  )

  console.log(url)
})
