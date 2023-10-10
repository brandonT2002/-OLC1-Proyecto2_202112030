import { Expression } from "../Abstracts/Expression";
import { Instruction } from "../Abstracts/Instruction";
import { Env } from "../Env/Env";
import { TypeInst } from "../Utils/TypeInst";

export class AsignID extends Instruction {
    constructor(line: number, column: number, private id: string, private value: Expression) {
        super(line, column, TypeInst.ASIGN_ID);
    }
    public execute(env: Env) {
        let value = this.value.execute(env)
        env.reasignID(this.id, value)
    }
}