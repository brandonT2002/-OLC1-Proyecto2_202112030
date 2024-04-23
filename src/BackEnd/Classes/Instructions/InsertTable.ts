import { Expression } from "../Abstracts/Expression";
import { Instruction } from "../Abstracts/Instruction";
import { AST, ReturnAST } from "../Env/AST";
import { Env } from "../Env/Env";
import { TypeInst } from "../Utils/TypeInst";

export class InsertTable extends Instruction {
    constructor(line: number, column: number, private name: string, private fields: string[], private values: Expression[]) {
        super(line, column, TypeInst.INSERT_TABLE)
    }
    public execute(env: Env) {
        if (this.fields.length === this.values.length) {
            env.insertTable(this.name, this.fields, this.values, this.line, this.column)
            return
        }
        if (this.fields.length < this.values.length) {
            env.setError('Inserta más valores de los esperados', this.line, this.column)
            return
        }
        env.setError('Inserta menos valores de los esperados', this.line, this.column)
    }
    public ast(ast: AST): ReturnAST {
        const id = ast.getNewID()
        var dot = `node_${id}[label="INSERT"];`
        dot += `\nnode_${id}_table[label="${this.name}"];`
        dot += `\nnode_${id}_fields[label="FIELDS"];`
        for (let i = 0; i < this.fields.length; i ++) {
            dot += `\nnode_${id}_field_${i}[label="${this.fields[i]}"];`
            dot += `\nnode_${id}_fields -> \nnode_${id}_field_${i};`
        }
        dot += `\nnode_${id}_values[label="VALORES"];`
        var value: ReturnAST 
        for (let i = 0; i < this.values.length; i ++) {
            value = this.values[i].ast(ast)
            dot += '\n' + value.dot
            dot += `\nnode_${id}_values -> node_${value.id};`
        }
        dot += `\nnode_${id}_table -> node_${id}_fields;`
        dot += `\nnode_${id}_table -> node_${id}_values;`
        dot += `\nnode_${id} -> node_${id}_table`
        return {dot: dot, id: id}
    }
}