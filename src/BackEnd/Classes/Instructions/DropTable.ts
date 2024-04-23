import { Instruction } from "../Abstracts/Instruction";
import { AST, ReturnAST } from "../Env/AST";
import { Env } from "../Env/Env";
import { TypeInst } from "../Utils/TypeInst";

export class DropTable extends Instruction {
    constructor(line: number, column: number, private id: string) {
        super(line, column, TypeInst.TRUNCATE_TABLE)
    }
    public execute(env: Env) {
        env.dropTable(this.id, this.line, this.column)
    }
    public ast(ast: AST): ReturnAST {
        const id = ast.getNewID()
        var dot = `node_${id}[label="DROP"];`
        dot += `\nnode_${id}_drop[label="${this.id}"]`
        dot += `\nnode_${id} -> node_${id}_drop;`
        return {dot: dot, id: id}
    }
}