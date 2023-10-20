import { Expression } from "../Abstracts/Expression";
import { Env } from "../Env/Env";
import { ReturnType, Type } from "../Utils/Type";
import { TypeExp } from "../Utils/TypeExp";

export class Cast extends Expression {
    constructor (line: number, column: number, private value: Expression, private destinyType: Type) {
        super(line, column, TypeExp.CAST);
    }
    public execute (env: Env): ReturnType {
        let value: ReturnType = this.value.execute(env);
        if (value.type === Type.INT)  {
            if (this.destinyType === Type.DOUBLE) {
                return {value: value.value, type: Type.DOUBLE}
            }
            if (this.destinyType === Type.VARCHAR) {
                return {value: value.value, type: Type.VARCHAR}
            }
            env.setError(`No hay casteo de "${this.getType(value.type)}" a "${this.getType(this.destinyType)}"`, this.value.line, this.value.column)
            return {value: 'NULL', type: Type.NULL}
        }
        if (value.type === Type.DOUBLE) {
            if (this.destinyType === Type.INT) {
                value.value = Math.round(value.value)
                return {value: value.value, type: Type.INT}
            }
            if (this.destinyType === Type.VARCHAR) { 
                return {value: value.value, type: Type.VARCHAR}
            }
            env.setError(`No hay casteo de "${this.getType(value.type)}" a "${this.getType(this.destinyType)}"`, this.value.line, this.value.column)
            return {value: 'NULL', type: Type.NULL}
        }
        if (value.type === Type.DATE) {
            if (this.destinyType === Type.VARCHAR) {
                return {value: value.value, type: Type.VARCHAR}
            }
            env.setError(`No hay casteo de "${this.getType(value.type)}" a "${this.getType(this.destinyType)}"`, this.value.line, this.value.column)
            return {value: 'NULL', type: Type.NULL}
        }
        if (value.type === Type.VARCHAR) {
            if (this.destinyType === Type.INT && /^\d+$/.test(value.value)) {
                return {value: value.value, type: Type.INT}
            }
            if (this.destinyType === Type.DOUBLE && /^\d+(\.\d+)?$/.test(value.value)) {
                return {value: value.value, type: Type.DOUBLE}
            }
            if (value.value.toLowerCase() === 'true' || value.value.toLowerCase() === 'false') {
                return {value: value.value, type: Type.BOOLEAN}
            }
            env.setError(`No hay casteo de "${this.getType(value.type)}" a "${this.getType(this.destinyType)}"`, this.value.line, this.value.column)
            return {value: 'NULL', type: Type.NULL}
        }
        env.setError(`No hay casteo de "${this.getType(value.type)}" a "${this.getType(this.destinyType)}"`, this.value.line, this.value.column)
        return {value: 'NULL', type: Type.NULL}
    }
    private getType(type: Type): string {
        switch(type) {
            case Type.INT:
                return "INT"
            case Type.DOUBLE:
                return "DOUBLE"
            case Type.VARCHAR:
                return "VARCHAR"
            case Type.BOOLEAN:
                return "BOOLEAN"
            case Type.DATE:
                return "DATE"
            case Type.TABLE:
                return "TABLE"
            default:
                return "NULL"
        }
    }
}