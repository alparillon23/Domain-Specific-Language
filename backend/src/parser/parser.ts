import { Tokenizer } from '../tokenizer'
import { Definitions } from './Definitions'
import { AST } from './AST'
import { Persistence, Program, Step } from '../types'
import { Execution } from './Execution'

export interface IParser {
  getAST(): void

  parse(): void
}

export class Parser implements IParser {
  private ast: AST
  private definitions: Definitions
  private execution: Execution
  private tokenizer: Tokenizer

  public constructor(tokenizer: Tokenizer) {
    this.ast = new AST()
    this.tokenizer = tokenizer
    this.definitions = new Definitions(this)
    this.execution = new Execution(this)
  }

  /* Getters */

  public getAST(): AST {
    return this.ast
  }

  public getProgram(): Program {
    return this.ast.getProgram()
  }

  public getTokenizer(): Tokenizer {
    return this.tokenizer
  }

  /* Other methods */

  public parse(): boolean {
    try {
      const definitions: Persistence[] = this.definitions.parse()
      const execution: Step[] = this.execution.parse()

      // Program should run if it has either definitions or execution block
      return definitions.length > 0 || execution.length > 0
    } catch (error) {
      // caught either END_TOKEN or INVALID_TOKEN
      console.error(error.message)
    }
    return false
  }

  public parseToken(regexp: string): string {
    let token: string
    token = this.tokenizer.getAndCheckNext(regexp)

    if (token == 'END_TOKEN') {
      // return case, reached end of tokens
      throw new Error(token)
    }
    if (token.startsWith('INVALID_TOKEN')) {
      // unexpected/invalid token case
      throw new Error(token)
    }

    return token
  }
}
