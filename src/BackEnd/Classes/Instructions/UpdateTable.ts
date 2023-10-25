import { Expression } from "../Abstracts/Expression";
import { Instruction } from "../Abstracts/Instruction";
import { AST } from "../Env/AST";
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
    public ast(ast: AST) {
        return {dot: '', id: 1}
    }
}