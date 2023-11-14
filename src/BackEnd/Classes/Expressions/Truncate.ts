import { Expression } from "../Abstracts/Expression";
import { AST, ReturnAST } from "../Env/AST";
import { Env } from "../Env/Env";
import { ReturnType, Type } from "../Utils/Type";
import { TypeExp } from "../Utils/TypeExp";
import { Field } from "../Objects/Table";

export class Truncate extends Expression {
    constructor (line: number, column: number, private exp: Expression, private truncate: Expression) {
        super(line, column, TypeExp.NATIVE_FUNC)
    }
    public setField(_: Map<string, Field>) {}
    public execute (env: Env): ReturnType {
        let value_: string
        let value: ReturnType = this.exp.execute(env)
        let trunc: ReturnType = this.truncate.execute(env)
        if (value.type === Type.DOUBLE) {
            value_ = value.value.toString()
            return {value: this.trucateDigit(value_, trunc.value), type: Type.INT}
        }
        return {value: 'NULL', type: Type.NULL}
    }
    public trucateDigit(value: string, trunc: number): string {
        const parts = value.split('.')
        if (parts.length === 2) {
            const integer_ = parts[0]
            const decimal_ = parts[1].substring(0, trunc)
            return integer_ + (decimal_.length > 0 ? '.' + decimal_ : '')
        }
        return value
    }
    public ast(ast: AST): ReturnAST {
        const id = ast.getNewID()
        var dot = `node_${id}[label="TRUNCATE" color="white" fontcolor="white"];`
        let value1: ReturnAST = this.exp.ast(ast)
        dot += '\n' + value1.dot
        dot += `\nnode_${id} -> node_${value1.id};`
        return {dot: dot, id: id}
    }
}