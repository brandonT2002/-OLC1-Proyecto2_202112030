import { Expression } from "../Abstracts/Expression";
import { Instruction } from "../Abstracts/Instruction";
import { AST, ReturnAST } from "../Env/AST";
import { Env } from "../Env/Env";
import { TypeInst } from "../Utils/TypeInst";

export class DeleteTable extends Instruction {
    constructor(line: number, column: number, private id: string, private condition: Expression){
        super(line, column, TypeInst.DELETE_TABLE)
    }
    public execute(env: Env) {
        if (this.condition) {
            env.deleteTable(this.id, this.condition, this.line, this.column)
            return
        }
    }
    public ast(ast: AST): ReturnAST {
        var id = ast.getNewID()
        var dot = `node_${id}[label="DELETE" color="white" fontcolor="white"];`
        dot += `\nnode_${id}_tableName[label="${this.id}" color="white" fontcolor="white"];`
        dot += `\nnode_${id} -> node_${id}_tableName;`
        var condition = this.condition.ast(ast)
        dot += `\n${condition.dot}`
        dot += `\nnode_${id} -> node_${condition.id};`
        return {dot: dot, id: id}
    }
}