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
        var id = ast.getNewID()
        var dot = `node_${id}[label="SELECT" color="white" fontcolor="white"];`
        var value: ReturnAST
        for (let i = 0; i < this.expression.length; i ++) {
            value = this.expression[i][0].ast(ast)
            if(this.expression[i][1] !== '') {
                dot += `\nnode_${id}_AS${i}[label="AS" color="white" fontcolor="white"];`
                dot += `\nnode_${id} -> node_${id}_AS${i};`
                dot += `\n${value.dot}`
                dot += `\nnode_${id}_AS${i} -> node_${value.id};`
                dot += `\nnode_${id}_ASTXT${i}[label="${this.expression[i][1]}"];`
                dot += `\nnode_${id}_AS${i} -> node_${id}_ASTXT${i};`
            } else {
                dot += `\n${value.dot}`
                dot += `\nnode_${id} -> node_${value.id};`
            }
        }
        return {dot: dot, id: id}
    }
}