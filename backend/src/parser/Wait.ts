import { Parsable } from './IParsable'
import { Parser } from './Parser'
import { Wait as WaitType } from '../types'

export class Wait implements Parsable<WaitType> {
  private parser: Parser

  private duration: number

  public constructor(parser: Parser) {
    this.parser = parser
  }

  public parse(): WaitType {
    this.parser.parseToken('wait')

    const time: string = this.parser.parseToken('[0-9]+')
    this.duration = parseInt(time)

    return {
      type: 'wait',
      duration: this.duration,
    }
  }
}
