import { Instruction } from "../Abstracts/Instruction";
import { TypeInst } from "../Utils/TypeInst";
import { ReturnType, Type } from "../Utils/Type";
import { AST, ReturnAST } from "../Env/AST";

export class Break extends Instruction {
    constructor(line: number, column: number) {
        super(line, column, TypeInst.BREAK)
    }
    public execute(): ReturnType {
        return {value: this.typeInst, type: Type.NULL}
    }
    public ast(ast: AST): ReturnAST {
        const id = ast.getNewID()
        var dot = `node_${id}[label="BREAK" color="white" fontcolor="white"];`
        return {dot: dot, id: id}
    }
}