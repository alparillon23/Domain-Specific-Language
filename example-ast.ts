import { Action, Direction, Program } from './backend/src/types'

/**
 * Example program:
 * ```yaml
 * define:
 *  create object obj:
 *    shape: "circle"
 *    radius: 10
 *    fill: "blue"
 *
 *  create animation left:
 *    velocity: 10
 *    duration: 20
 *    direction: "left"
 *
 * main:
 *  start left obj
 * ```
 *
 * Example tree:
 */
const myProgram: Program = {
  definitions: {
    obj: {
      type: 'object',
      parameters: {
        shape: 'circle',
        radius: 10,
        style: {
          fill: 'blue',
        },
      },
    },
    left: {
      type: 'animation',
      parameters: {
        type: 'translation',
        velocity: 10,
        duration: 20,
        direction: Direction.Left,
      },
    },
  },
  main: [
    {
      type: 'animate',
      action: Action.Start,
      animation: 'left',
      entity: 'obj',
    },
  ],
}
