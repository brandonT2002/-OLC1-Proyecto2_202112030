import { Instruction } from "../Abstracts/Instruction";
import { TypeInst } from "../Utils/TypeInst";
import { ReturnType, Type } from "../Utils/Type";
import { AST, ReturnAST } from "../Env/AST";

export class Continue extends Instruction {
    constructor(line: number, column: number) {
        super(line, column, TypeInst.CONTINUE)
    }
    public execute(): ReturnType {
        return {value: this.typeInst, type: Type.NULL}
    }
    public ast(ast: AST): ReturnAST {
        const id = ast.getNewID()
        var dot = `node_${id}[label="CONTINUE"];`
        return {dot: dot, id: id}
    }
}