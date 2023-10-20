import { Expression } from "../Abstracts/Expression";
import { Instruction } from "../Abstracts/Instruction";
import { AST, ReturnAST } from "../Env/AST";
import { Env } from "../Env/Env";
import { ReturnType } from "../Utils/Type";
import { TypeInst } from "../Utils/TypeInst";

export class While extends Instruction {
    constructor (line: number, column: number, private condition: Expression, private block: Instruction) {
        super(line, column, TypeInst.LOOP_WHILE)
    }
    public execute (env: Env) {
        const whileEnv: Env = new Env(env, `${env.name} while`)
        let condition: ReturnType | null = this.condition.execute(whileEnv)
        while (condition.value) {
            let block: ReturnType = this.block.execute(whileEnv)
            if (block) {
                if (block.value === TypeInst.CONTINUE) {
                    condition = this.condition.execute(whileEnv)
                    continue
                }
                else if(block.value === TypeInst.BREAK) {
                    break
                }
                return block
            }
            condition = this.condition.execute(whileEnv)
        }
    }
    public ast(ast: AST): ReturnAST {
        return {dot: '', id: 0}
    }
}