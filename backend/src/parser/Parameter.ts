import { Parsable } from './IParsable'
import { Parser } from './Parser'
import { Parameter as ParameterType } from '../types'
import {
  FLOATING_POINT_REGEX,
  NUMBER_REGEX,
  OBJECTS_REGEX,
  OPACITY_REGEX,
  SCALE_REGEX,
  PARAMETER_REGEX,
  COORDINATE_REGEX,
} from '../util/regex'

export class Parameter implements Parsable<ParameterType> {
  private parser: Parser

  private name: string
  private value: any

  public constructor(parser: Parser, name: string) {
    this.parser = parser
    this.name = name
  }

  public getName(): string {
    return this.name
  }

  public getValue(): any {
    return this.value
  }

  public parse(): ParameterType {
    this.parser.parseToken(this.name)
    this.parser.parseToken(':')

    // There's an issue with our current parser/tokenizer if users input spaces within parameter lists "[" "]" and
    // handling "," within Coordinate where parameter values would be split across multiple tokens.

    // I've update the tokenizer to parse those separators separately in tokenizer. Its easier to handle here than
    // trying to add special cases to the tokenizer..

    // I think we'll handle this similar to conditional/loops and search for the separator tokens "[" and "]" as a
    // start and end point while appending the tokens between when we validate parameters here.

    // This currently captures any valid parameter value.
    const value = this.parser.parseToken(PARAMETER_REGEX)

    // Default case: value is just a string
    this.value = value

    if (
      new RegExp(NUMBER_REGEX).test(value) ||
      new RegExp(FLOATING_POINT_REGEX).test(value) ||
      new RegExp(OPACITY_REGEX).test(value) ||
      new RegExp(SCALE_REGEX).test(value)
    ) {
      // parameter is a regular number
      this.value = Number(value)
    } else if (new RegExp(OBJECTS_REGEX).test(value)) {
      // parameter is list of object identifiers for a layer
      const valueMinusBrackets = value.substring(1, value.length - 1)
      const objectIdentifiers = valueMinusBrackets.split(' ')
      this.value = objectIdentifiers
    } else if (new RegExp(COORDINATE_REGEX).test(value)) {
      // parameter is coordinate
      const valueMinusBrackets = value.substring(1, value.length - 1)
      const numbers = valueMinusBrackets
        .split(',')
        .map((number) => Number(number.trim()))
      this.value = numbers
    }

    return {
      parameter: this.name,
      value: this.value,
    }
  }
}
