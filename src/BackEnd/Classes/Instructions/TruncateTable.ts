import { Instruction } from "../Abstracts/Instruction";
import { AST, ReturnAST } from "../Env/AST";
import { Env } from "../Env/Env";
import { TypeInst } from "../Utils/TypeInst";

export class TruncateTable extends Instruction {
    constructor(line: number, column: number, private id: string) {
        super(line, column, TypeInst.TRUNCATE_TABLE)
    }
    public execute(env: Env) {
        env.truncateTable(this.id, this.line, this.column)
    }
    public ast(ast: AST): ReturnAST {
        return {dot: '', id: 0}
    }
}