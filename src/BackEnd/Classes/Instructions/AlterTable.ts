import { Instruction } from "../Abstracts/Instruction";
import { AST, ReturnAST } from "../Env/AST";
import { Env } from "../Env/Env";
import { Type } from "../Utils/Type";
import { TypeInst } from "../Utils/TypeInst";

export class AlterTable extends Instruction {
    constructor(line: number, column: number, private id: string, private action: string, private field1: string, private field2: string, private type: Type) {
        super(line, column, TypeInst.ALTER_TABLE)
    }
    public execute(env: Env) {
        if (this.action.toLowerCase() === 'add') {
            env.addColumn(this.id, this.field1, this.type, this.line, this.column)
            return
        }
        if (this.action.toLowerCase() === 'drop') {
            env.dropColumn(this.id, this.field1, this.line, this.column)
            return
        }
        if (this.action.toLowerCase() === 'renameto') {
            env.renameTo(this.id, this.field1, this.line, this.column)
        }
        if (this.action.toLowerCase() === 'renamecolumn') {
            env.renameColumn(this.id, this.field1, this.field2, this.line, this.column)
        }
    }
    public ast(ast: AST): ReturnAST {
        const id = ast.getNewID()
        var dot = `node_${id}[label="ALTER TABLE" color="white" fontcolor="white"];`
        switch (this.action.toLowerCase()) {
            case 'add':
                dot += `\nnode_${id}_action[label="ADD" color="white" fontcolor="white"];`
                dot += `\nnode_${id}_table[label="${this.id}" color="white" fontcolor="white"];`
                dot += `\nnode_${id}_field1[label="${this.field1}" color="white" fontcolor="white"];`
                dot += `\nnode_${id}_type[label="${this.getType(this.type)}" color="white" fontcolor="white"];`
                dot += `\nnode_${id}_action -> node_${id}_table;`
                dot += `\nnode_${id}_action -> node_${id}_field1;`
                dot += `\nnode_${id}_action -> node_${id}_type;`
                break
            case 'drop':
                dot += `node_${id}_action[label="DROP" color="white" fontcolor="white"];`
                dot += `\nnode_${id}_table[label="${this.id}" color="white" fontcolor="white"];`
                dot += `\nnode_${id}_field1[label="${this.field1}" color="white" fontcolor="white"];`
                dot += `\nnode_${id}_action -> node_${id}_table;`
                dot += `\nnode_${id}_action -> node_${id}_field1;`
                break
            case 'renameto':
                dot += `node_${id}_action[label="RENAME TO" color="white" fontcolor="white"];`
                dot += `\nnode_${id}_table[label="${this.id}" color="white" fontcolor="white"];`
                dot += `\nnode_${id}_field1[label="${this.field1}" color="white" fontcolor="white"];`
                dot += `\nnode_${id}_action -> node_${id}_table;`
                dot += `\nnode_${id}_action -> node_${id}_field1;`
                break
            case 'renamecolumn':
                dot += `node_${id}_action[label="RENAME COLUMN" color="white" fontcolor="white"];`
                dot += `\nnode_${id}_table[label="${this.id}" color="white" fontcolor="white"];`
                dot += `\nnode_${id}_field1[label="${this.field1}" color="white" fontcolor="white"];`
                dot += `\nnode_${id}_field2[label="${this.field2}" color="white" fontcolor="white"];`
                dot += `\nnode_${id}_action -> node_${id}_table;`
                dot += `\nnode_${id}_action -> node_${id}_field1;`
                dot += `\nnode_${id}_action -> node_${id}_field2;`
                break
        }
        dot += `\nnode_${id} -> node_${id}_action;`
        return {dot: dot, id: id}
    }
    private getType(type: Type): string {
        switch(type) {
            case Type.INT:
                return "INT"
            case Type.DOUBLE:
                return "DOUBLE"
            case Type.VARCHAR:
                return "VARCHAR"
            case Type.BOOLEAN:
                return "BOOLEAN"
            case Type.DATE:
                return "DATE"
            case Type.TABLE:
                return "TABLE"
            default:
                return "NULL"
        }
    }
}