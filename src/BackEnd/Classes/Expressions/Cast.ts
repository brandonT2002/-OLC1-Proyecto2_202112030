import { Expression } from "../Abstracts/Expression";
import { Env } from "../Env/Env";
import { ReturnType, Type } from "../Utils/Type";
import { TypeExp } from "../Utils/TypeExp";

export class Cast extends Expression {
    constructor (line: number, column: number, private value: Expression, private type_: Type) {
        super(line, column, TypeExp.CAST);
    }
    public execute (env: Env): ReturnType {
        let value: ReturnType = this.value.execute(env);
        if (value.type === Type.INT)  {
            if (this.type_ === Type.DOUBLE) {
                return {value: value.value, type: Type.DOUBLE}
            }
            if (this.type_ === Type.VARCHAR) {
                return {value: value.value, type: Type.VARCHAR}
            }
        }
        if (value.type === Type.DOUBLE) {
            if (this.type_ === Type.INT) {
                value.value = Math.round(value.value)
                return {value: value.value, type: Type.INT}
            }
            if (this.type_ === Type.VARCHAR) { 
                return {value: value.value, type: Type.VARCHAR}
            }
        }
        if (value.type === Type.DATE) {
            if (this.type_ === Type.VARCHAR) {
                return {value: value.value, type: Type.VARCHAR}
            }
        }
        if (value.type === Type.VARCHAR) {
            if (this.type_ === Type.INT && /^\d+$/.test(value.value)) {
                return {value: value.value, type: Type.INT}
            }
            if (this.type_ === Type.DOUBLE && /^\d+(\.\d+)?$/.test(value.value)) {
                return {value: value.value, type: Type.DOUBLE}
            }
            if (value.value.toLowerCase() === 'true' || value.value.toLowerCase() === 'false') {
                return {value: value.value, type: Type.BOOLEAN}
            }
        }
        return {value: 'NULL', type: Type.NULL}
    }
}