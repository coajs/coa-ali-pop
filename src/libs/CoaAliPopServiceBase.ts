import { CoaAliPopBin } from './CoaAliPopBin'

export class CoaAliPopServiceBase {

  readonly bin: CoaAliPopBin

  constructor (bin: CoaAliPopBin) {
    this.bin = bin
  }
}