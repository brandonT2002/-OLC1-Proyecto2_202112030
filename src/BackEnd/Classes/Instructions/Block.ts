import { Instruction } from "../Abstracts/Instruction";
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
}