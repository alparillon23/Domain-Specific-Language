import {
  Conditional,
  Execution,
  OP,
  Persistence,
  Program,
  Step,
} from '../types'
import { Animate } from './Animate'
import { Collision } from './Collision'
import { Create } from './Create'
import { Delete } from './Delete'
import { Wait } from './Wait'
import { Update } from './Update'

export class AST {
  private AST: Program
  private conditional: number = -1
  private conditionalStatements: Array<Step[]> = []

  constructor() {
    this.AST = { definitions: [], main: [] }
  }

  /* Getters */

  public getProgram(): Program {
    return this.AST
  }

  public getDefinitions(): Persistence[] {
    return this.AST.definitions
  }

  public getMain(): Execution {
    return this.AST.main
  }

  public getLastStatement() {
    return this.AST.main[this.AST.main.length - 1]
  }

  public isInConditionalBlock() {
    return this.conditional >= 0
  }

  /* Setters */

  public addDefinition(create: Create, block: 'definitions' | 'main'): boolean {
    const createObject = create.parse()
    if (this.isInConditionalBlock()) {
      this.addConditionalStatement(createObject)
    } else {
      this.AST[block].push(createObject)
    }
    return true
  }

  public updateDefinition(
    update: Update,
    block: 'definitions' | 'main'
  ): boolean {
    const updateObject = update.parse()
    if (this.isInConditionalBlock()) {
      this.addConditionalStatement(updateObject)
    } else {
      this.AST[block].push(updateObject)
    }
    return true
  }

  public deleteDefinition(del: Delete): boolean {
    const deleteObject = del.parse()
    if (this.isInConditionalBlock()) {
      this.addConditionalStatement(deleteObject)
    } else {
      this.AST.main.push(deleteObject)
    }
    return true
  }

  public addAnimation(animate: Animate): boolean {
    const animateObject = animate.parse()
    if (this.isInConditionalBlock()) {
      this.addConditionalStatement(animateObject)
    } else {
      this.AST.main.push(animateObject)
    }
    return true
  }

  public addWait(wait: Wait): boolean {
    const waitObject = wait.parse()
    if (this.isInConditionalBlock()) {
      this.addConditionalStatement(waitObject)
    } else {
      this.AST.main.push(waitObject)
    }
    return true
  }

  public addCollision(collision: Collision): boolean {
    const collisionObject = collision.parse()
    if (this.isInConditionalBlock()) {
      this.addConditionalStatement(collisionObject)
    } else {
      this.AST.main.push(collisionObject)
    }
    return true
  }

  public startIf(): void {
    this.conditional++
    this.conditionalStatements[this.conditional] = []
  }

  public startLoop(): void {
    this.conditional++
    this.conditionalStatements[this.conditional] = []
  }

  public endIf(X: string, OP: OP, Y: string): boolean {
    const currentConditionalNumber = this.conditional
    this.conditional--

    const conditionalStatements: Step[] = this.conditionalStatements[
      currentConditionalNumber
    ]
    const conditional: Conditional = {
      type: 'if',
      condition: { op: OP, lhs: X, rhs: Y },
      body: conditionalStatements,
    }
    if (this.conditional < 0) {
      // This returns to the main scope
      this.AST.main.push(conditional)
    } else {
      // This returns to the scope of the surrounding IF/LOOP block
      this.conditionalStatements[this.conditional].push(conditional)
    }

    // Removes conditional block that just ended
    this.conditionalStatements.splice(currentConditionalNumber, 1)
    return true
  }

  public endLoop(count: number, X: string, OP: OP, Y: string): boolean {
    const currentConditionalNumber = this.conditional
    this.conditional--

    const conditionalStatements: Step[] = this.conditionalStatements[
      currentConditionalNumber
    ]
    const conditional: Conditional = {
      type: 'loop',
      count,
      condition: { op: OP, lhs: X, rhs: Y },
      body: conditionalStatements,
    }

    if (this.conditional < 0) {
      // This returns to the main scope
      this.AST.main.push(conditional)
    } else {
      // This returns to the scope of the surrounding IF/LOOP block
      this.conditionalStatements[this.conditional].push(conditional)
    }

    // Removes conditional block that just ended
    this.conditionalStatements.splice(currentConditionalNumber, 1)
    return true
  }

  public addConditionalStatement(statement: any): void {
    this.conditionalStatements[this.conditional].push(statement)
  }
}
