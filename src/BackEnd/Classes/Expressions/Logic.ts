import { Expression } from "../Abstracts/Expression";
import { Env } from "../Env/Env";
import { ReturnType, Type } from "../Utils/Type";
import { TypeExp } from "../Utils/TypeExp";

export class Logic extends Expression {
    private type: Type = Type.NULL
    constructor(line: number, column: number, public exp1: Expression, public sign: string, public exp2: Expression) {
        super(line, column, TypeExp.LOGIC_OP)
    }
    public execute(env: Env): ReturnType {
        switch(this.sign.toUpperCase()) {
            case 'AND':
                return this.and(env)
            case 'OR':
                return this.or(env)
            case 'NOT':
                return this.not(env)
            default:
                return {value: 'NULL', type: Type.NULL}
        }
    }
    and (env: Env): ReturnType {
        let value1: ReturnType = this.exp1.execute(env)
        let value2: ReturnType = this.exp2.execute(env)
        this.type = Type.BOOLEAN
        return {value: value1.value && value2.value, type: this.type}
    }
    or (env: Env): ReturnType {
        let value1: ReturnType = this.exp1.execute(env)
        let value2: ReturnType = this.exp2.execute(env)
        this.type = Type.BOOLEAN
        return {value: value1.value || value2.value, type: this.type}
    }
    not (env: Env): ReturnType {
        let value: ReturnType = this.exp2.execute(env)
        this.type = Type.BOOLEAN
        console.log(value)
        return {value: !value.value, type: this.type}
    }
}