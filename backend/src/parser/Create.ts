import { Parser } from './Parser'
import { Persistence } from './Persistence'
import {
  Create as CreateType,
  EntityTypes,
  Identifier,
  Parameters,
} from '../types'

export class Create extends Persistence {
  private entity: EntityTypes
  private identifier: Identifier
  private parameters: Parameters

  constructor(parser: Parser) {
    super(parser)
  }

  public parse(): CreateType {
    this.parser.parseToken('create')

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
      type: 'create',
      identifier: this.identifier,
      entity: this.entity,
      parameters: this.parameters,
    }
  }
}
