import { Instruction } from '../Abstracts/Instruction';
import { Expression } from '../Abstracts/Expression';
import { TypeInst } from '../Utils/TypeInst';
import { Env } from '../Env/Env';
import { AST, ReturnAST } from '../Env/AST';
export class Print extends Instruction {
    constructor(line: number, column: number, private expression: Expression) {
        super(line, column, TypeInst.PRINT)
    }
    public execute(env: Env) {
        let value = this.expression ? this.expression.execute(env) : null
        env.setPrint(value ? value.value : '')
    }
    public ast(ast: AST): ReturnAST {
        const id = ast.getNewID()
        var dot = `node_${id}[label="PRINT" color="white" fontcolor="white"];`
        let value: ReturnAST = this.expression.ast(ast)
        dot += '\n' + value.dot
        dot += `\nnode_${id} -> node_${value.id};`
        return {dot: dot, id: id}
    }
}