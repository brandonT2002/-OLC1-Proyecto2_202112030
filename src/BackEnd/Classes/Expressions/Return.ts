import { Expression } from '../Abstracts/Expression';
import { Env } from '../Env/Env';
import { TypeExp } from '../Utils/TypeExp';
import { ReturnType, Type } from '../Utils/Type';
import { AST, ReturnAST } from '../Env/AST';
export class Return extends Expression {
    constructor(line: number, column: number, private exp: Expression) {
        super(line, column, TypeExp.RETURN)
    }
    public execute(env: Env): ReturnType {
        if(this.exp) {
            let value: ReturnType = this.exp.execute(env)
            return {value: value.value,type: value.type}
        }
        return {value: this.typeExp,type: Type.NULL}
    }
    public ast(ast: AST): ReturnAST {
        const id = ast.getNewID()
        var dot = `node_${id}[label="RETURN"];`
        let value1: ReturnAST = this.exp.ast(ast)
        dot += '\n' + value1.dot
        dot += `\nnode_${id} -> node_${value1.id};`
        return {dot: dot, id: id}
    }
}