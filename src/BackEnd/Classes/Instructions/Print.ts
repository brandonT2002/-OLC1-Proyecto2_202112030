import { Instruction } from '../Abstracts/Instruction';
import { Expression } from '../Abstracts/Expression';
import { TypeInst } from '../Utils/TypeInst';
import { Env } from '../Env/Env';
export class Print extends Instruction {
    constructor(line: number,column: number,private expression: Expression) {
        super(line,column,TypeInst.PRINT)
    }
    public execute(env: Env) {
        let value = this.expression ? this.expression.execute(env) : null
        env.setPrint(value ? value.value : '')
    }
}