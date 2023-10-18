import { Expression } from "../Abstracts/Expression";
import { Env } from "../Env/Env";
import { ReturnType, Type } from "../Utils/Type";
import { TypeExp } from "../Utils/TypeExp";

export class Len extends Expression {
    constructor (line: number, column: number, private exp: Expression) {
        super(line, column, TypeExp.NATIVE_FUNC)
    }
    public execute (env: Env): ReturnType {
        let value: ReturnType = this.exp.execute(env)
        if (value.type === Type.VARCHAR) {
            return {value: value.value.length, type: Type.VARCHAR}
        }
        return {value: 'NULL', type: Type.NULL}
    }
}