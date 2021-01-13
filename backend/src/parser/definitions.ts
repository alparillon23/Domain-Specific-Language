import { AST } from './AST'
import { Create } from './Create'
import { Parsable } from './IParsable'
import { Parser } from './Parser'
import { Tokenizer } from '../tokenizer'
import { Update } from './Update'
import { Persistence } from '../types'

export type Parameter = {
  parameter: string
  value: any
}

export class Definitions implements Parsable<Persistence[]> {
  private parser: Parser

  private tokenizer: Tokenizer
  private AST: AST

  public constructor(parser: Parser) {
    this.parser = parser

    this.tokenizer = parser.getTokenizer()
    this.AST = parser.getAST()
  }

  // "define:" Persistence+
  public parse(): Persistence[] {
    if (this.tokenizer.checkToken('define')) {
      this.parser.parseToken('define')
      this.parser.parseToken(':')

      while (1) {
        // continue to iterate through persistence statements until main token or invalid state reached.
        if (this.parsePersistence()) {
          continue
        }
        // if token == main -> return to parseMain
        if (this.tokenizer.checkToken('main')) {
          break
        }
        // TODO: create error type for invalid tokens, catch + differentiate with instanceof operator
        throw new Error('INVALID_TOKEN: ' + this.tokenizer.checkNext())
      }
    }
    return this.AST.getDefinitions()
  }

  // Persistence ::= ("create" | "update") EntityDescriptors
  private parsePersistence(): boolean {
    return this.parseCreation() || this.parseUpdate()
  }

  // Creation ::= "create" Entity Identifier ":" EntityParameter*
  private parseCreation(): boolean {
    if (this.tokenizer.checkToken('create')) {
      const create: Create = new Create(this.parser)
      return this.AST.addDefinition(create, 'definitions')
    }
    return false
  }

  // Update ::= "update" Entity Identifier ":" EntityParameter*
  private parseUpdate(): boolean {
    if (this.tokenizer.checkToken('update')) {
      const update: Update = new Update(this.parser)
      return this.AST.updateDefinition(update, 'definitions')
    }
    return false
  }
}
