import { Parsable } from './IParsable'
import { Parser } from './Parser'
import {
  Action,
  Animate as AnimateType,
  EntityTypes,
  Identifier,
} from '../types'

export class Animate implements Parsable<AnimateType> {
  private parser: Parser

  private action: Action
  private animationIdentifier: Identifier
  private entity: EntityTypes.object | EntityTypes.layer
  private entityIdentifier: Identifier

  public constructor(parser: Parser) {
    this.parser = parser
  }

  public parse(): AnimateType {
    this.action = this.parser.parseToken(
      'start|stop|speedup|slowdown|reset'
    ) as Action
    this.animationIdentifier = this.parser.parseToken('[a-zA-Z0-9]+')

    // TODO: parse Entity <- can get rid of Entity if Identifiers are unique across entity types
    this.entity = this.parser.parseToken('object|layer') as
      | EntityTypes.object
      | EntityTypes.layer

    this.entityIdentifier = this.parser.parseToken('[a-zA-Z0-9]+')

    return {
      type: 'animate',
      action: this.action,
      animationIdentifier: this.animationIdentifier,
      entity: this.entity,
      entityIdentifier: this.entityIdentifier,
    }
  }
}
