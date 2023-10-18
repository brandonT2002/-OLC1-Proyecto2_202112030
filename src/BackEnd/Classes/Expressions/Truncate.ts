import { Expression } from "../Abstracts/Expression";
import { Env } from "../Env/Env";
import { ReturnType, Type } from "../Utils/Type";
import { TypeExp } from "../Utils/TypeExp";

export class Truncate extends Expression {
    constructor (line: number, column: number, private exp: Expression, private truncate: Expression) {
        super(line, column, TypeExp.NATIVE_FUNC)
    }
    public execute (env: Env): ReturnType {
        let value_: string
        let value: ReturnType = this.exp.execute(env)
        let trunc: ReturnType = this.truncate.execute(env)
        if (value.type === Type.DOUBLE) {
            value_ = value.value.toString()
            return {value: this.trucateDigit(value_, trunc.value), type: Type.VARCHAR}
        }
        return {value: 'NULL', type: Type.NULL}
    }
    public trucateDigit(value: string, trunc: number): string {
        const parts = value.split('.')
        if (parts.length === 2) {
            const integer_ = parts[0]
            const decimal_ = parts[1].substring(0, trunc)
            return integer_ + (decimal_.length > 0 ? '.' + decimal_ : '')
        }
        return value
    }
}