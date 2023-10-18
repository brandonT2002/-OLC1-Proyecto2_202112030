import { Expression } from "../Abstracts/Expression";
import { Instruction } from "../Abstracts/Instruction";
import { Env } from "../Env/Env";
import { ReturnType } from "../Utils/Type";
import { TypeInst } from "../Utils/TypeInst";
import { When } from "./When";

export class Case extends Instruction {
    constructor (line: number, column: number, private arg: Expression, private whens: Array<When>, private else_: Expression, private alias: string) {
        super(line, column, TypeInst.CASE)
    }
    public execute(env: Env) {
        const envCase: Env = new Env(env, 'case')
        if (this.whens) {
            let when_: When
            let arg: ReturnType = this.arg.execute(env)
            for (when_ of this.whens) {
                when_.setWhen(arg)
                let when_exe: ReturnType = when_.execute(envCase)
                if (when_exe) {
                    return `${this.alias}: ` + when_exe
                }
            }
        }
        if (this.else_) {
            let else_: ReturnType = this.else_.execute(envCase)
            if (else_) {
                return `${this.alias}: ` + else_
            }
        }
    }
}