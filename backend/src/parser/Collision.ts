import { Parsable } from './IParsable'
import { Parser } from './Parser'
import { Collision as CollisionType } from '../types'

export class Collision implements Parsable<CollisionType> {
  private parser: Parser

  private value: boolean

  public constructor(parser: Parser) {
    this.parser = parser
  }

  public parse(): CollisionType {
    this.parser.parseToken('collisions')
    const flag: string = this.parser.parseToken('on|off')

    this.value = flag == 'on'

    return {
      type: 'collision',
      value: this.value,
    }
  }
}
