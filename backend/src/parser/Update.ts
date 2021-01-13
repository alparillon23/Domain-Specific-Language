import { Parser } from './Parser'
import { Persistence } from './Persistence'
import {
  EntityTypes,
  Identifier,
  Parameters,
  Update as UpdateType,
} from '../types'

export class Update extends Persistence {
  private entity: EntityTypes
  private identifier: Identifier
  private parameters: Parameters

  constructor(parser: Parser) {
    super(parser)
  }

  public parse(): UpdateType {
    this.parser.parseToken('update')

    this.entity = this.parser.parseToken(
      'object|layer|animation'
    ) as EntityTypes
    this.identifier = this.parser.parseToken('[a-zA-Z0-9]+')

    const parameters = this.parseParameters(this.entity)
    parameters.forEach((param) => {
      this.parameters = {
        ...this.parameters,
        [param.getName()]: param.getValue(),
      }
    })

    return {
      type: 'update',
      identifier: this.identifier,
      entity: this.entity,
      parameters: this.parameters,
    }
  }
}
