import { Expression } from "../Abstracts/Expression";
import { Instruction } from "../Abstracts/Instruction";
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
}