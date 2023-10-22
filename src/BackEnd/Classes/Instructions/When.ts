import { Expression } from "../Abstracts/Expression";
import { Instruction } from "../Abstracts/Instruction";
import { AST, ReturnAST } from "../Env/AST";
import { Env } from "../Env/Env";
import { ReturnType } from "../Utils/Type";
import { TypeInst } from "../Utils/TypeInst";

export class When extends Instruction {
    private whenEvaluate: ReturnType | any
    constructor (line: number, column: number, private when_: Expression, private result: Expression) {
        super(line, column, TypeInst.WHEN)
    }
    public setWhen (whenEvaluate: ReturnType) {
        this.whenEvaluate = whenEvaluate;
    }
    public execute (env: Env): ReturnType | any {
        const envWhen: Env = new Env(env, `${env.name} when`)
        let whenE: ReturnType = this.whenEvaluate
        let when_: ReturnType = this.when_.execute(envWhen)
        envWhen.name = `${envWhen.name} ${when_.value}`
        if (when_.value === whenE.value) {
            let result: ReturnType = this.result.execute(envWhen)
            return result
        }
    }
    public ast(ast: AST): ReturnAST {
        return {dot: '', id: 0}
    }
}