import { Type } from './Type';

export const plus: Type[][] = [
    [Type.INT,    Type.DOUBLE, Type.DATE, Type.INT,     Type.NULL, Type.NULL],
    [Type.DOUBLE, Type.DOUBLE, Type.DATE, Type.DOUBLE,  Type.NULL, Type.NULL],
    [Type.DATE,   Type.DATE,   Type.NULL, Type.DATE,    Type.NULL, Type.NULL],
    [Type.INT,    Type.DOUBLE, Type.DATE, Type.VARCHAR, Type.NULL, Type.NULL],
    [Type.NULL,   Type.NULL,   Type.NULL, Type.NULL,    Type.NULL, Type.NULL],
    [Type.NULL,   Type.NULL,   Type.NULL, Type.NULL,    Type.NULL, Type.NULL]
]

export const minus: Type[][] = [
    [Type.INT,    Type.DOUBLE, Type.DATE, Type.INT,     Type.NULL, Type.NULL],
    [Type.DOUBLE, Type.DOUBLE, Type.DATE, Type.DOUBLE,  Type.NULL, Type.NULL],
    [Type.DATE,   Type.DATE,   Type.NULL, Type.DATE,    Type.NULL, Type.NULL],
    [Type.INT,    Type.DOUBLE, Type.DATE, Type.VARCHAR, Type.NULL, Type.NULL],
    [Type.NULL,   Type.NULL,   Type.NULL, Type.NULL,    Type.NULL, Type.NULL],
    [Type.NULL,   Type.NULL,   Type.NULL, Type.NULL,    Type.NULL, Type.NULL]
]

export const mult: Type[][] = [
    [Type.INT,    Type.DOUBLE, Type.NULL, Type.NULL,    Type.NULL, Type.NULL],
    [Type.DOUBLE, Type.DOUBLE, Type.NULL, Type.NULL,    Type.NULL, Type.NULL],
    [Type.NULL,   Type.NULL,   Type.NULL, Type.NULL,    Type.NULL, Type.NULL],
    [Type.NULL,   Type.NULL,   Type.NULL, Type.NULL,    Type.NULL, Type.NULL],
    [Type.NULL,   Type.NULL,   Type.NULL, Type.NULL,    Type.NULL, Type.NULL],
    [Type.NULL,   Type.NULL,   Type.NULL, Type.NULL,    Type.NULL, Type.NULL]
]

export const div: Type[][] = [
    [Type.INT,    Type.DOUBLE, Type.NULL, Type.NULL,    Type.NULL, Type.NULL],
    [Type.DOUBLE, Type.DOUBLE, Type.NULL, Type.NULL,    Type.NULL, Type.NULL],
    [Type.NULL,   Type.NULL,   Type.NULL, Type.NULL,    Type.NULL, Type.NULL],
    [Type.NULL,   Type.NULL,   Type.NULL, Type.NULL,    Type.NULL, Type.NULL],
    [Type.NULL,   Type.NULL,   Type.NULL, Type.NULL,    Type.NULL, Type.NULL],
    [Type.NULL,   Type.NULL,   Type.NULL, Type.NULL,    Type.NULL, Type.NULL]
]

export const mod: Type[][] = [
    [Type.INT,    Type.DOUBLE, Type.NULL, Type.NULL,    Type.NULL, Type.NULL],
    [Type.DOUBLE, Type.DOUBLE, Type.NULL, Type.NULL,    Type.NULL, Type.NULL],
    [Type.NULL,   Type.NULL,   Type.NULL, Type.NULL,    Type.NULL, Type.NULL],
    [Type.NULL,   Type.NULL,   Type.NULL, Type.NULL,    Type.NULL, Type.NULL],
    [Type.NULL,   Type.NULL,   Type.NULL, Type.NULL,    Type.NULL, Type.NULL],
    [Type.NULL,   Type.NULL,   Type.NULL, Type.NULL,    Type.NULL, Type.NULL]
]