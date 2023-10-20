import { Instruction } from "../Abstracts/Instruction";
import { AST, ReturnAST } from "../Env/AST";
import { Env } from "../Env/Env";
import { TypeInst } from "../Utils/TypeInst";

export class Block extends Instruction {
    constructor(line: number, column: number, private instructions: Array<Instruction>) {
        super(line, column, TypeInst.BLOCK_INST)
    }
    public execute(env: Env): any {
        const newEnv: Env = new Env(env, env.name)
        for (const instruction of this.instructions) {
            try {
                const ret = instruction.execute(newEnv)
                if (ret) {
                    return ret
                }
            }
            catch (error) {}
        }
    }
    public ast(ast: AST): ReturnAST {
        const id = ast.getNewID()
        var dot = `node_${id}[label="BLOQUE INSTRUCCIONES"];`
        let value1: ReturnAST
        for (let i = 0; i < this.instructions.length; i ++) {
            value1 = this.instructions[i].ast(ast)
            dot += '\n' + value1.dot
            dot += `\nnode_${id} -> node_${value1.id};`
        }
        return {dot: dot, id: id}
    }
}