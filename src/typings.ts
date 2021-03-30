const config = {
  accessKeyId: '',
  accessKeySecret: '',
  endpoint: '',
  apiVersion: '',
}

const plsAxnExtensionExample = {
  message: 'OK',
  requestId: '4ECD0CAC-0E93-45E0-A0C1-285DEFD6912E',
  code: 'OK',
  secretBindDto: {
    extension: '9',
    secretNo: '17197665719',
    subsId: '1000009497087157'
  }
}

export declare namespace CoaAliPop {
  type Config = typeof config
  type PlsAxnExtension = typeof plsAxnExtensionExample
}