import { Parsable } from './IParsable'
import { Parser } from './Parser'
import {
  Delete as DeleteType,
  EntityTypes,
  Identifier,
  Parameters,
} from '../types'

export class Delete implements Parsable<DeleteType> {
  private parser: Parser

  private entity: EntityTypes
  private identifier: Identifier

  constructor(parser: Parser) {
    this.parser = parser
  }

  public parse(): DeleteType {
    this.parser.parseToken('delete')

    this.entity = this.parser.parseToken(
      'object|layer|animation'
    ) as EntityTypes
    this.identifier = this.parser.parseToken('[a-zA-Z0-9]+')

    return {
      type: 'delete',
      identifier: this.identifier,
      entity: this.entity,
    }
  }
}
