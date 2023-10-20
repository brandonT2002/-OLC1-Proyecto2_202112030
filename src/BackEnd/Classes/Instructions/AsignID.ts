import { Expression } from "../Abstracts/Expression";
import { Instruction } from "../Abstracts/Instruction";
import { AST, ReturnAST } from "../Env/AST";
import { Env } from "../Env/Env";
import { TypeInst } from "../Utils/TypeInst";

export class AsignID extends Instruction {
    constructor(line: number, column: number, private id: string, private value: Expression) {
        super(line, column, TypeInst.ASIGN_ID);
    }
    public execute(env: Env) {
        let value = this.value.execute(env)
        env.reasignID(this.id, value, this.line, this.column)
    }
    public ast(ast: AST): ReturnAST {
        const id = ast.getNewID()
        var dot = `node_${id}[label="ASIGNACION ID"];`
        let value1: ReturnAST = this.value.ast(ast)
        dot += `\nnode_${id}_id[label="${this.id}"]`
        dot += `\nnode_${id} -> node_${id}_id`
        dot += '\n' + value1.dot
        dot += `\nnode_${id} -> node_${value1.id};`
        return {dot: dot, id: id}
    }
}