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
        let when_: ReturnType = this.when_.execute(envWhen)
        if(this.whenEvaluate) {
            let whenE: ReturnType = this.whenEvaluate
            envWhen.name = `${envWhen.name} ${when_.value}`
            if (when_.value === whenE.value) {
                let result: ReturnType = this.result.execute(envWhen)
                return result
            }
        }
        else {
            let condition: ReturnType = this.when_.execute(env)
            if (condition.value) {
                return this.result.execute(env)
            }
        }
    }
    public ast(ast: AST): ReturnAST {
        const id = ast.getNewID()
        var dot = `node_${id}[label="WHEN"];`
        dot += `node_${id}_cond[label="CONDICION"];`
        dot += `node_${id}_result[label="RESULT"];`
        let cond: ReturnAST = this.when_.ast(ast)
        let result: ReturnAST = this.result.ast(ast)
        dot += '\n' + cond.dot
        dot += '\n' + result.dot
        dot += `\nnode_${id}_cond -> node_${cond.id};`
        dot += `\nnode_${id}_result -> node_${result.id};`
        dot += `\nnode_${id} -> node_${id}_cond;`
        dot += `\nnode_${id} -> node_${id}_result;`
        return {dot: dot, id: id}
    }
}