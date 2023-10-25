import { Expression } from "../Abstracts/Expression";
import { Instruction } from "../Abstracts/Instruction";
import { AST } from "../Env/AST";
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
    public ast(ast: AST) {
        return {dot: '', id: 1}
    }
}