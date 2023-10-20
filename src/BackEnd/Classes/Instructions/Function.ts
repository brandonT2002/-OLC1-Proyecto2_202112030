import { Expression } from "../Abstracts/Expression";
import { Instruction } from "../Abstracts/Instruction";
import { Env } from "../Env/Env";
import { TypeInst } from "../Utils/TypeInst";
import { Type } from "../Utils/Type";
import { Parameter } from "../Expressions/Parameter";
import { AST, ReturnAST } from "../Env/AST";
export class Function extends Instruction {
    constructor(line: number, column: number, private id: string, public parameters: Parameter[], public block: Instruction, public type: Type) {
        super(line,column,TypeInst.INIT_FUNCTION)
    }
    public execute(env: Env) {
        env.saveFunction(this.id, this)
    }
    public ast(ast: AST): ReturnAST {
        const id = ast.getNewID()
        var dot = `node_${id}[label="FUNCION"];`
        if (this.parameters.length > 0) {
            dot += `\nnode_${id}_params[label="PARAMETROS"];`
            for (let i = 0; i < this.parameters.length; i ++) {
                dot += `\nnode_${id}_param_${i}[label="${this.parameters[i].id}"];`
                dot += `\nnode_${id}_params -> node_${id}_param_${i};`
            }
            dot += `\nnode_${id} -> node_${id}_params;`
        }
        let inst: ReturnAST = this.block.ast(ast)
        dot += '\n' + inst.dot
        return {dot: dot, id: id}
    }
}