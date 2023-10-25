import { Expression } from "../Abstracts/Expression";
import { Instruction } from "../Abstracts/Instruction";
import { AST, ReturnAST } from "../Env/AST";
import { Env } from "../Env/Env";
import { TypeInst } from "../Utils/TypeInst";
import { Primitive } from "../Expressions/Primitive"
import { Type } from "../Utils/Type";

export class Select extends Instruction {
    constructor(line: number, column: number, private id: string, private fields: any[][] | string, private condition: Expression) {
        super(line, column, TypeInst.SELECT)
    }
    public execute (env: Env) {
        this.condition = this.condition ? this.condition : new Primitive(this.line, this.column, 'true', Type.BOOLEAN)
        env.selectTable(this.id, this.fields, this.condition, this.line, this.column)
    }
    public ast(ast: AST): ReturnAST {
        var id = ast.getNewID()
        var dot = `node_${id}[label="SELECT" color="white" fontcolor="white"];`
        dot += `\nnode_${id}_id[label="${this.id}" color="white" fontcolor="white"];`
        dot += `\nnode_${id} -> node_${id}_id;`
        dot += `\nnode_${id}_fields[label="FIELDS" color="white" fontcolor="white"];`
        dot += `\nnode_${id}_id -> node_${id}_fields;`
        dot += `\nnode_${id}_condition[label="CONDITION" color="white" fontcolor="white"];`
        dot += `\nnode_${id}_id -> node_${id}_condition;`
        if(typeof(this.fields) === 'string') {
            dot += `\nnode_${id}_star[label="*" color="white" fontcolor="white"];`
            dot += `\nnode_${id}_fields -> node_${id}_star;`
        } else {
            var value: ReturnAST
            for(var i = 0; i < this.fields.length; i ++) {
                value = this.fields[i][0].ast(ast)
                if(this.fields[i][1] !== '') {
                    dot += `\nnode_${id}_AS${i}[label="AS" color="white" fontcolor="white"];`
                    dot += `\nnode_${id}_fields -> node_${id}_AS${i};`
                    dot += `\n${value.dot};`
                    dot += `\nnode_${id}_AS${i} -> node_${value.id};`
                    dot += `\nnode_${id}_ASTXT${i}[label="${this.fields[i][1]}"];`
                    dot += `\nnode_${id}_AS${i} -> node_${id}_ASTXT${i};`
                } else {
                    dot += `\n${value.dot}`
                    dot += `\nnode_${id}_fields -> node_${value.id};`
                }
            }
        }
        if(this.condition) {
            var condition = this.condition.ast(ast)
            dot += `\n${condition.dot}`
            dot += `\nnode_${id}_condition -> node_${condition.id};`
        }
        return {dot: dot, id: id}
    }
}