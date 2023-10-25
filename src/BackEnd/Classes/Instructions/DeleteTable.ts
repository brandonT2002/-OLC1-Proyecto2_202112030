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
        return {dot: '', id: 1}
    }
}