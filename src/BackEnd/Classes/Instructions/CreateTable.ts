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
        return {dot: '', id: 0}
    }
}