# coa-ali-pop

[![GitHub license](https://img.shields.io/badge/license-MIT-green.svg?style=flat-square)](LICENSE)
[![npm version](https://img.shields.io/npm/v/coa-ali-pop.svg?style=flat-square)](https://www.npmjs.org/package/coa-ali-pop)
[![npm downloads](https://img.shields.io/npm/dm/coa-ali-pop.svg?style=flat-square)](http://npm-stat.com/charts.html?package=coa-ali-pop)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/coajs/coa-ali-pop/pulls)

极简的阿里云 POP SDK for Node.js

来源于一个实际生产项目，将用到的 API 和业务解耦后封装成此库。

后续会根据实际使用情况优化和扩充新的服务。如果急需用到其他接口，可以直接使用阿里云官方 POP SDK [@alicloud/pop-core](https://github.com/aliyun/openapi-core-nodejs-sdk)

## 特征

- **轻量** 相对于官方的 SDK，无任何第三方依赖，更轻量简洁
- **COA 友好** 配合 COA 使用，效率更高，报错信息更友好
- **TypeScript** 使用 TypeScript 编写，类型约束，无需查看文档，IDE 友好

## 用法

### 安装

```shell
yarn add coa-ali-pop
```

### 使用

#### 短信

```typescript
import { CoaAliOssBin, CoaAliPopSmsService } from 'coa-ali-pop'

// 短信配置
const smsConfig = {
  accessKeyId: 'LTAI4FkXXXXXXXXZpgGmbT',
  accessKeySecret: 'T7PSOeuWIVXXXXXXXXyyqNCAPlv1',
  endpoint: 'https://dysmsapi.aliyuncs.com',
  apiVersion: '2017-05-25',
}

// 创建一个Bin配置实例
const smsBin = new CoaAliOssBin(smsConfig)

// 创建一个服务实例
const smsService = new CoaAliPopSmsService(smsBin)

// 通过一个模版给某个手机号发送短信消息
smsService.send('15010001001', { signName: 'XXX科技', templateCode: 'XXXXXX', param: { name: '张三' } })
```

#### 隐私号

```typescript
// @ts-nocheck
import { CoaAliOssBin, CoaAliPopPlsService } from 'coa-ali-pop'

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
```

#### 文字识别

```typescript
// @ts-nocheck
import { CoaAliOssBin, CoaAliPopOcrService } from 'coa-ali-pop'

// 文字识别配置
const ocrConfig = {
  accessKeyId: 'LTAI4FkrXXXXXXLZpgGmbT',
  accessKeySecret: 'T7PSOeuWIVgpXXXXXXyyqNCAPlv1',
  endpoint: 'https://dyplsapi.aliyuncs.com',
  apiVersion: '2017-05-25',
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
```
