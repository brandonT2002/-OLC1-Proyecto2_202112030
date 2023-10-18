import { Expression } from "../Abstracts/Expression";
import { Env } from "../Env/Env";
import { ReturnType, Type } from "../Utils/Type";
import { TypeExp } from "../Utils/TypeExp";

export class Round extends Expression {
    constructor (line: number, column: number, private exp: Expression, private round: Expression) {
        super(line, column, TypeExp.NATIVE_FUNC)
    }
    public execute (env: Env): ReturnType {
        let value: ReturnType = this.exp.execute(env)
        let round_: ReturnType = this.round.execute(env)
        if (value.type === Type.DOUBLE) {
            return {value: parseFloat(value.value.toFixed(round_.value)), type: Type.DOUBLE}
        }
        return {value: 'NULL', type: Type.NULL}
    }
}