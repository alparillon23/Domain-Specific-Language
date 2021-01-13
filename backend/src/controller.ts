import { Request, Response } from 'express'
import { Tokenizer } from './tokenizer'
import { Parser } from './parser/Parser'
import { Evaluator } from './evaluator'
import * as AST from './types'

const testInput: string =
  'define:\n' +
  '\tcreate object test1 : \n' +
  '\t\tshape: circle \n' +
  '\t\tradius : 5  \n' +
  '\t\ty : 64  \n' +
  '\t\tx : 64  \n' +
  '\n' +
  '\tcreate object test2 : \n' +
  '\t\tshape: rectangle \n' +
  '\t\twidth : 3                            height : 4 \n' +
  '\t\tfill: red \n' +
  '\n' +
  '\tupdate object test1:\n' +
  '\t\tfill: blue\n' +
  '\n' +
  '\n' +
  'main:\n' +
  '  delete object test2\n' +
  '  collisions off\n' +
  '\n' +
  '  create animation expand : \n' +
  '    scaleFactor: 3 \n' +
  '    duration : 30 \t\t' +
  '\n' +
  '  loop count 5 \t\t(\t\t\n' +
  '     start expand object test1\n' +
  '     wait 1\n' +
  '     if test1.radius <= 10 (wait 2 )    \n' +
  '     stop expand object test1\n' +
  '  )'

export class Controller {
  private input: string = ''
  private parsedResult: AST.Program

  constructor(request: Request, response: Response) {
    // TODO: remove default assignment of test input
    this.input = request.body?.input || testInput
    this.parsedResult = { definitions: [], main: [] }

    this.Controller(this.input)

    response.status(201).send(this.parsedResult)
  }

  Controller(input: string): void {
    let tokenizer: Tokenizer = new Tokenizer(input)
    tokenizer.tokenizeInput()

    let parser: Parser = new Parser(tokenizer)
    if (parser.parse()) {
      console.log(JSON.stringify(parser.getProgram()))
      /*
        let parsedResult = parser.getParsed()

        let evaluator = new Evaluator()
        evaluator.evaluate()
        }
      */
    }
  }
}
