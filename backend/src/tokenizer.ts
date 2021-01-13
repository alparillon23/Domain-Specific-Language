export interface ITokenizer {
  getNext(): String

  checkToken(regexp: String): boolean

  getAndCheckNext(regexp: String): String

  moreTokens(): boolean
}

// Tokenizer based on naive tokenizer implementation presented in class
export class Tokenizer implements ITokenizer {
  input: string = ''

  separators: string[] = [' ', ':', ','] // includes "(", ")", "[", "]" - all special regex cases.
  tokens: string[] = []
  currentToken: number = 0
  reserved: string = '@@@'

  constructor(input: string) {
    this.currentToken = 0
    this.input = input
  }

  tokenizeInput(): void {
    let tokenizedProgram: string = this.input

    //1. Replace the newlines and tabs with separators
    tokenizedProgram = tokenizedProgram.replace(new RegExp('\n', 'g'), ' ')
    tokenizedProgram = tokenizedProgram.replace(new RegExp('\t', 'g'), ' ')

    //2 Surround all separators with reserved word
    for (const sep of this.separators) {
      tokenizedProgram = tokenizedProgram.replace(
        new RegExp(sep, 'g'),
        this.reserved + sep + this.reserved
      )
    }
    // special regex case for separators "(", ")", "[", "]"
    tokenizedProgram = tokenizedProgram.replace(
      new RegExp('\\(', 'g'),
      this.reserved + '(' + this.reserved
    )
    tokenizedProgram = tokenizedProgram.replace(
      new RegExp('\\)', 'g'),
      this.reserved + ')' + this.reserved
    )
    tokenizedProgram = tokenizedProgram.replace(
      new RegExp('\\[', 'g'),
      this.reserved + '[' + this.reserved
    )
    tokenizedProgram = tokenizedProgram.replace(
      new RegExp(']', 'g'),
      this.reserved + ']' + this.reserved
    )

    //3. Remove all doubled reserved words
    tokenizedProgram = tokenizedProgram.replace(
      new RegExp(this.reserved + this.reserved, 'g'),
      this.reserved
    )

    //4. Remove leading reserved word
    if (
      tokenizedProgram.length > 0 &&
      tokenizedProgram.startsWith(this.reserved)
    ) {
      tokenizedProgram = tokenizedProgram.substring(this.reserved.length)
    }

    //5. Split on reserved word
    this.tokens = tokenizedProgram.split(this.reserved)

    //6. Filter whitespace and empty tokens.
    this.tokens = this.tokens.filter((e) => e !== ' ')
    this.tokens = this.tokens.filter((e) => e !== '')
  }

  getTokens(): string[] {
    return this.tokens
  }

  checkToken(regexp: string): boolean {
    let token: string = this.checkNext()
    let re: RegExp = new RegExp(regexp, 'i')
    return token.match(re) != null
  }

  checkNext(): string {
    let token: string
    if (this.currentToken < this.tokens.length) {
      token = this.tokens[this.currentToken]
    } else {
      token = 'END_TOKEN'
    }
    return token
  }

  getNext(): string {
    let token: string
    if (this.currentToken < this.tokens.length) {
      token = this.tokens[this.currentToken]
      this.currentToken++
    } else {
      token = 'END_TOKEN'
    }
    return token
  }

  getAndCheckNext(regexp: string): string {
    let token: string = this.checkNext()
    let re: RegExp = new RegExp(regexp, 'i')
    if (token == 'END_TOKEN') return token
    if (token.match(re) == null) {
      token = 'INVALID_TOKEN: Found ' + token
    } else {
      token = this.getNext()
    }
    return token
  }

  moreTokens(): boolean {
    return this.currentToken < this.tokens.length
  }
}
