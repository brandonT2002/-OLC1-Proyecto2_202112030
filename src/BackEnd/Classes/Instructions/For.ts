import { Expression } from "../Abstracts/Expression";
import { Instruction } from "../Abstracts/Instruction";
import { AST, ReturnAST } from "../Env/AST";
import { Env } from "../Env/Env";
import { ReturnType, Type } from "../Utils/Type";
import { TypeInst } from "../Utils/TypeInst";

export class For extends Instruction {
    constructor (line: number, column: number, private iterator: string, private limInf: Expression, private limSup: Expression, private block: Instruction) {
        super(line, column, TypeInst.LOOP_FOR)
    }
    public execute (env: Env) {
        const envFor: Env = new Env(env, `${env.name} for`)
        var limInf: ReturnType = this.limInf.execute(env);
        if (limInf.type != Type.INT) {
            env.setError("Tipo inválido para rango", this.line, this.column)
            return
        }
        var limSup: ReturnType = this.limSup.execute(env);
        if (limSup.type != Type.INT) {
            env.setError("Tipo inválido para rango", this.line, this.column)
            return
        }
        let block: ReturnType
        if (env.getValue(this.iterator)) {
            for (let i = limInf.value; i <= limSup.value; i ++) {
                envFor.reasignID(this.iterator, {value: i, type: Type.INT}, this.line, this.column)
                block = this.block.execute(envFor)
                if (block) {
                    if (block.value == TypeInst.CONTINUE) {
                        continue
                    }
                    if (block.value == TypeInst.BREAK) {
                        break
                    }
                    return block
                }
            }
            return
        }
        env.setError("Iterador sin declarar", this.line, this.column)
    }
    public ast(ast: AST): ReturnAST {
        return {dot: '', id: 0}
    }
}