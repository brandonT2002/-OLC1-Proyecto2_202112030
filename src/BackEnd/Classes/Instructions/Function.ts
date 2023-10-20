import { Expression } from "../Abstracts/Expression";
import { Instruction } from "../Abstracts/Instruction";
import { Env } from "../Env/Env";
import { TypeInst } from "../Utils/TypeInst";
import { Type } from "../Utils/Type";
import { Parameter } from "../Expressions/Parameter";
export class Function extends Instruction {
    constructor(line: number, column: number, private id: string, public parameters: Parameter[], public block: Instruction, public type: Type) {
        super(line,column,TypeInst.INIT_FUNCTION)
    }
    public execute(env: Env) {
        env.saveFunction(this.id, this)
    }
}