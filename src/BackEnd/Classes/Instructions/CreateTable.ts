import { Instruction } from "../Abstracts/Instruction";
import { AST, ReturnAST } from "../Env/AST";
import { Env } from "../Env/Env";
import { Table } from "../Objects/Table";
import { Type } from "../Utils/Type";
import { TypeInst } from "../Utils/TypeInst";

export class CreateTable extends Instruction {
    constructor (line: number, column: number, private name: string, private nameFields: string[], private typeFields: Type[]) {
        super(line, column, TypeInst.CREATE_TABLE)
    }
    public execute(env: Env) {
        var table = new Table(this.name.toLowerCase(), this.nameFields, this.typeFields)
        env.saveTable(this.name, table, this.line, this.column)
    }
    public ast(ast: AST): ReturnAST {
        const id = ast.getNewID()
        var dot = `node_${id}[label="TABLE" color="white" fontcolor="white"];`
        dot += `\nnode_${id}_name[label="${this.name}" color="white" fontcolor="white"]`
        dot += `\nnode_${id}_fields[label="CAMPOS" color="white" fontcolor="white"]`
        for (let i = 0; i < this.nameFields.length; i ++) {
            dot += `\nnode_${id}_field_${i}[label=${this.nameFields[i]} color="white" fontcolor="white"]`
            dot += `\nnode_${id}_fields -> node_${id}_field_${i};`
        }
        dot += `\nnode_${id} -> node_${id}_name;`
        dot += `\nnode_${id} -> node_${id}_fields;`
        return {dot: dot, id: id}
    }
}