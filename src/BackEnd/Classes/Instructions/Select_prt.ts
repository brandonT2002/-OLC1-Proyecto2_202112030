import { Expression } from "../Abstracts/Expression";
import { Instruction } from "../Abstracts/Instruction";
import { AST, ReturnAST } from "../Env/AST";
import { Env } from "../Env/Env";
import { ReturnType } from "../Utils/Type";
import { TypeInst } from "../Utils/TypeInst";

export class Select_prt extends Instruction {
    constructor(line: number, column: number, private expression: any[][]) {
        super(line, column, TypeInst.SELECT)
    }
    public execute(env: Env) {
        let value: ReturnType
        for (let i = 0; i < this.expression.length; i ++) {
            value = this.expression[i] ? this.expression[i][0].execute(env) : null
            if(this.expression[i][1] !== '') {
                env.setPrint(this.expression[i][1] + ': ' +value.value)
            } else {
                env.setPrint(value.value)
            }
        }
    }
    public ast(ast: AST): ReturnAST {
        return {dot: '', id: 1}
    }
}