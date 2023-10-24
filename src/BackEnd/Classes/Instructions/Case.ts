import { Expression } from "../Abstracts/Expression";
import { Instruction } from "../Abstracts/Instruction";
import { AST, ReturnAST } from "../Env/AST";
import { Env } from "../Env/Env";
import { ReturnType, Type } from "../Utils/Type";
import { TypeInst } from "../Utils/TypeInst";
import { When } from "./When";

export class Case extends Instruction {
    constructor (line: number, column: number, private arg: Expression, private whens: Array<When>, private else_: Expression, private alias: string | null) {
        super(line, column, TypeInst.CASE)
    }
    public execute(env: Env) {
        const envCase: Env = new Env(env, 'case')
        if(this.whens) {
            let when_: When
            if(this.arg) {
                let arg: ReturnType = this.arg.execute(env)
                for (when_ of this.whens) {
                    when_.setWhen(arg)
                    let when_exe: ReturnType = when_.execute(envCase)
                    if (when_exe) {
                        env.setPrint(`${this.alias ? this.alias + ': ' : ''}` + when_exe.value + `. ${when_.line}:${when_.column}`)
                        return
                    }
                }
            }
            else {
                for (when_ of this.whens) {
                    let when_exe: ReturnType = when_.execute(envCase)
                    if (when_exe) {
                        env.setPrint(`${this.alias ? this.alias + ': ' : ''}` + when_exe.value + `. ${when_.line}:${when_.column}`)
                        return
                    }
                }
            }
        }
        if (this.else_) {
            var default_: ReturnType = this.else_.execute(envCase)
            if (default_) {
                env.setPrint(`${this.alias ? this.alias + ': ' : ''}` + default_.value + `. ${this.else_.line}:${this.else_.column}`)
                return
            }
        }
    }
    public ast(ast: AST): ReturnAST {
        const id = ast.getNewID()
        var dot = `node_${id}[label="CASE" color="white" fontcolor="white"];`
        let arg_: ReturnAST
        let when: ReturnAST
        let default_: ReturnAST
        if(this.arg) {
            arg_ = this.arg.ast(ast)
            dot += '\n' + arg_.dot
            dot += `\nnode_${id} -> node_${arg_.id};`
        }
        for (let i = 0; i < this.whens.length; i ++) {
            when = this.whens[i].ast(ast)
            dot += '\n' + when.dot
            dot += `\nnode_${id} -> node_${when.id};`
        }
        if (this.else_) {
            dot += `node_${id}_else[label="ELSE" color="white" fontcolor="white"];`
            default_ = this.else_.ast(ast)
            dot += '\n' + default_.dot
            dot += `\nnode_${id}_else -> node_${default_.id};`
            dot += `\nnode_${id} -> node_${id}_else;`
        }
        if (this.alias) {
            dot += `\nnode_${id}_as[label="AS" color="white" fontcolor="white"];`
            dot += `\nnode_${id}_alias[label="${this.alias}" color="white" fontcolor="white"];`
            dot += `\nnode_${id}_as -> node_${id}_alias;`
            dot += `\nnode_${id} -> node_${id}_as;`
        }
        return {dot: dot, id: id}
    }
}