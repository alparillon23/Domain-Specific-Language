// See Documentation and Examples in notion for examples of input (bottom of page)

export type Program = {
  // TODO: We can make identifiers unique across all entity types and refactor to clean up grammar (wont have to include Entity other than in "create" statements ex. right now Entity is in update/delete/conditionals/etc.)
  definitions: Persistence[]
  main: Execution
}

// -- Definitions --

export type Identifier = string

export type Entity = eObject | eAnimation | eLayer

export type eObject = {
  type: EntityTypes.object
  parameters: ObjectParameters & Shape
}

// Note: If objects are in multiple layers, most recently applied animation → layer should take precedence
export type eLayer = {
  type: EntityTypes.layer
  members: Identifier[]
  parameters: LayerParameters
}

export enum LayerParametersEnum {
  priority = 'priority',
  fill = 'fill',
  x = 'x',
  y = 'y',
  opacity = 'opacity',
  radius = 'radius',
  width = 'width',
  height = 'height',
  points = 'points',
  length = 'length',
}

// include all parameters except Shape so layers can set default values.
type LayerParameters = {
  priority?: number
  fill?: string
  x?: number
  y?: number
  opacity?: number
  radius?: number
  width?: number
  height?: number
  points?: Array<[number, number]>
  length?: number
}

export enum ObjectShapeParametersEnum {
  priority = 'priority',
  fill = 'fill',
  x = 'x',
  y = 'y',
  opacity = 'opacity',
  shape = 'shape',
  radius = 'radius',
  width = 'width',
  height = 'height',
  points = 'points',
  length = 'length',
}

type ObjectParameters = {
  priority?: number
  style?: Partial<Style>
}

type Style = {
  fill?: string
  x?: number
  y?: number
  opacity?: number
}

type Shape = Circle | Rectangle | Triangle | Pentagon | Hexagon | Octagon | Polygon

type Circle = {
  shape: 'circle'
  radius?: number
}

type Rectangle = {
  shape: 'square'
  width?: number
  height?: number
}

type Polygon = {
  shape: 'polygon'
  points?: Array<[number, number]>
}

type Triangle = {
  shape: 'triangle'
  length?: number
}

type Pentagon = {
  shape: 'pentagon'
  length?: number
}

type Hexagon = {
  shape: 'hexagon'
  length?: number
}

type Octagon = {
  shape: 'octagon'
  length?: number
}

// --

export enum AnimationParametersEnum {
  duration = 'duration',
  velocity = 'velocity',
  direction = 'direction',
  angularVelocity = 'angularVelocity',
  scaleFactor = 'scaleFactor',
  start = 'start',
  end = 'end',
}

export type eAnimation = {
  type: EntityTypes.animation
  parameters: {
    duration?: number
    start?: number
    end?: number
  } & AnimationVariant
}

// Note: Certain ObjectParameters like fill, opacity could be extended as AnimationVariants for additional dynamic elements
type AnimationVariant = Translation | Rotation | Scaling

type Translation = {
  type: 'translation'
  velocity: number
  direction: Direction | Vector2D
}

type Rotation = {
  type: 'rotation'
  angularVelocity: number
}

type Scaling = {
  type: 'scale'
  scaleFactor: number
}

type Vector2D = [number, number]

export enum Direction {
  Up,
  Down,
  Left,
  Right,
}

// -- Execution --

export enum EntityTypes {
  object = 'object',
  layer = 'layer',
  animation = 'animation',
}

export type Execution = Step[]

export type Step = Persistence | Delete | Animate | Global | Conditional

// --

export type Persistence = Create | Update

export type Parameter = { parameter: string; value: any }

export type Parameters =
  | Partial<eObject['parameters']>
  | Partial<eAnimation['parameters']>
  | Partial<eLayer['parameters']>

export type Create = {
  type: 'create'
  identifier: string
  entity: EntityTypes
  parameters: Parameters
}

export type Update = {
  type: 'update'
  identifier: string
  entity: EntityTypes
  parameters: Parameters
}

export type Delete = {
  type: 'delete'
  identifier: string
  entity: EntityTypes
}

// --

export type Animate = {
  type: 'animate'
  animationIdentifier: Identifier
  entity: EntityTypes.layer | EntityTypes.object
  entityIdentifier: Identifier
  action: Action
}

export enum Action {
  start = 'start',
  stop = 'stop',
  speedUp = 'speedUp',
  slowDown = 'slowDown',
  reset = 'reset', // TODO: what does this look like for animations? Origin (return-after-loop) from Milestone 1 - Al
}

// --

type Global = Collision | Wait

export type Collision = {
  type: 'collision'
  value: boolean
}

export type Wait = {
  type: 'wait'
  duration: number
}

// --

export type Conditional = {
  type: 'if' | 'loop'
  condition: Condition
  count?: number
  body: Step[]
}

export type OP = '<' | '>' | '<=' | '>=' | '==' | '!='

type Condition = {
  op: OP
  lhs: string
  rhs: string
}
