import { Expression } from "../Abstracts/Expression";
import { Instruction } from "../Abstracts/Instruction";
import { AST, ReturnAST } from "../Env/AST";
import { Env } from "../Env/Env";
import { ReturnType } from "../Utils/Type";
import { TypeInst } from "../Utils/TypeInst";

export class If extends Instruction {
    constructor(line: number, column: number, private condition: Expression, private block: Instruction, private except: Instruction) {
        super(line, column, TypeInst.IF)
    }
    public execute(env: Env) {
        let condition: ReturnType = this.condition.execute(env)
        if (condition.value) { // if (condicion)
            let block: ReturnType = this.block.execute(env) // instrucciones
            if (block) {
                return block
            }
            return
        }
        // else
        if (this.except) {
            let except: ReturnType = this.except.execute(env)
            if (except) {
                return except
            }
        }
        return
    }
    public ast(ast: AST): ReturnAST {
        const id = ast.getNewID()
        var dot = `node_${id}[label="IF" color="white" fontcolor="white"];`
        let cond: ReturnAST = this.condition.ast(ast)
        dot += '\n' + cond.dot
        let inst: ReturnAST = this.block.ast(ast)
        dot += '\n' + inst.dot
        dot += `\nnode_${id}_cnd[label="CONDICION" color="white" fontcolor="white"];`
        dot += `\nnode_${id} -> node_${id}_cnd;`
        dot += `\nnode_${id}_cnd -> node_${cond.id};`
        dot += `\nnode_${id} -> node_${inst.id};`
        if(this.except) {
            let except: ReturnAST = this.except.ast(ast)
            dot += `\nnode_${id}_else[label="ELSE" color="white" fontcolor="white"];`
            dot += `\nnode_${id} -> node_${id}_else;`
            dot += '\n' + except.dot
            dot += `\nnode_${id}_else -> node_${except.id};`
        }
        return {dot: dot, id: id}
    }
}