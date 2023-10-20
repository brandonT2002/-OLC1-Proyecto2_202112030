import { Expression } from '../Abstracts/Expression';
import { Env } from '../Env/Env';
import { TypeExp } from '../Utils/TypeExp';
import { ReturnType, Type } from '../Utils/Type';
export class Return extends Expression {
    constructor(line: number, column: number, private exp: Expression) {
        super(line, column, TypeExp.RETURN)
    }
    public execute(env: Env): ReturnType {
        if(this.exp) {
            let value: ReturnType = this.exp.execute(env)
            return {value: value.value,type: value.type}
        }
        return {value: this.typeExp,type: Type.NULL}
    }
}