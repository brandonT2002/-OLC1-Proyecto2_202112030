import { Expression } from "../Abstracts/Expression";
import { Instruction } from "../Abstracts/Instruction";
import { AST, ReturnAST } from "../Env/AST";
import { Env } from "../Env/Env";
import { TypeInst } from "../Utils/TypeInst";

export class UpdateTable extends Instruction {
    constructor(line: number, column: number, private id: string, private fields: string[], private values: Expression[], private condition: Expression) {
        super(line, column, TypeInst.UPDATE_TABLE)
    }
    public execute(env: Env) {
        env.updateTable(this.id, this.fields, this.values, this.condition, this.line, this.column)
        return
    }
    public ast(ast: AST): ReturnAST {
        var id = ast.getNewID()
        var dot = `node_${id}[label="UPDATE" color="white" fontcolor="white"];`
        dot += `\nnode_${id}_set[label="SET"];`
        dot += `\nnode_${id} -> node_${id}_set;`
        dot += `\nnode_${id}_condition[label="CONDITION"];`
        dot += `\nnode_${id} -> node_${id}_condition;`
        var value: ReturnAST
        for(var i = 0; i < this.fields.length; i ++) {
            dot += `\nnode_${id}_field${i}[label="${this.fields[i]}"]`
            dot += `\nnode_${id}_set -> node_${id}_field${i};`
            value = this.values[i].ast(ast)
            dot += `\n${value.dot}`
            dot += `\nnode_${id}_field${i} -> node_${value.id};`
        }
        var condition = this.condition.ast(ast)
        dot += `\n${condition.dot}`
        dot += `\nnode_${id}_condition -> node_${condition.id};`
        return {dot: dot, id: id}
    }
}