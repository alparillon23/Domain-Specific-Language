import { Parsable } from './IParsable'
import { Parser } from './Parser'
import { Parameter } from './Parameter'
import { Tokenizer } from '../tokenizer'
import {
  AnimationParametersEnum,
  EntityTypes,
  LayerParametersEnum,
  ObjectShapeParametersEnum,
  Persistence as PersistenceType,
} from '../types'

export abstract class Persistence implements Parsable<PersistenceType> {
  protected parser: Parser
  protected tokenizer: Tokenizer

  // To be implemented in concrete classes
  public abstract parse(): PersistenceType

  constructor(parser: Parser) {
    this.parser = parser
    this.tokenizer = parser.getTokenizer()
  }

  public parseParameters(entity: EntityTypes): Parameter[] {
    const parameters: Parameter[] = []

    const parametersList: string[] = this.getParameterList(entity)

    // check ":" separator between Identifier and Params
    if (this.tokenizer.checkToken(':')) {
      this.parser.parseToken(':')

      while (1) {
        const next: string = this.tokenizer.checkNext()

        // check available parameters per Entity type
        if (parametersList.includes(next)) {
          const parameter = new Parameter(this.parser, next)
          parameter.parse()
          parameters.push(parameter)
          continue
        }

        // break if no valid parameters remain
        break
      }
    }
    return parameters
  }

  private getParameterList(entity: EntityTypes): string[] {
    switch (entity) {
      case EntityTypes.animation:
        return Object.values(AnimationParametersEnum)
      case EntityTypes.layer:
        return Object.values(LayerParametersEnum)
      case EntityTypes.object:
        return Object.values(ObjectShapeParametersEnum)
    }
  }
}
