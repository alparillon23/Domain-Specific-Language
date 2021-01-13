// use regex parseToken("[a-zA-Z]+" or "[0-9]+") for string or numeric parameter values.
// layerParameters case: "objects: [" ObjectIdentifier+ "]"                                 \\[{1}[a-zA-Z ]+\\]{1}
// animationParameters case: Velocity/AngularVelocity ::= FloatingPoint                     [-|+]?[0-9]+\\.?[0-9]*
// objectParameters case: Opacity: 1.0 - 0.0                                                1(\\.0)?|0\\.?[0-9]*
// Coordinate: "[" Integer "," Integer "]"                                                  \\[{1}[0-9]+,{1}[0-9]+\\]{1}
// Polygon points: "[" Coordinate+ "]"
export const COORDINATE_REGEX = '\\[{1}[0-9]+,{1}[0-9]+\\]{1}'
export const FLOATING_POINT_REGEX = '[-|+]?[0-9]+\\.?[0-9]*'
export const OBJECTS_REGEX = '\\[{1}[a-zA-Z ]+\\]{1}'
export const OPACITY_REGEX = '1(\\.0)?|0\\.?[0-9]*'
export const NUMBER_REGEX = '[0-9]+'
export const STRING_REGEX = '[a-zA-Z]+'
export const SCALE_REGEX = '[0-9]+[\\.{1}[0-9]{1}]?'

export const PARAMETER_REGEX = `${STRING_REGEX}|${NUMBER_REGEX}|${OBJECTS_REGEX}|
  ${FLOATING_POINT_REGEX}|${OPACITY_REGEX}|${SCALE_REGEX}|${COORDINATE_REGEX}`
