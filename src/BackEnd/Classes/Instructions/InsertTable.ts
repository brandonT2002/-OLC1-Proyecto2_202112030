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
        return {dot: '', id: 0}
    }
}