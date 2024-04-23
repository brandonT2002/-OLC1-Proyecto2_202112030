import { Expression } from "../Abstracts/Expression";
import { AST, ReturnAST } from "../Env/AST";
import { Env } from "../Env/Env";
import { ReturnType, Type } from "../Utils/Type";
import { TypeExp } from "../Utils/TypeExp";
import { Field } from "../Objects/Table";

export class TypeOf extends Expression {
    constructor (line: number, column: number, private exp: Expression) {
        super(line, column, TypeExp.NATIVE_FUNC)
    }
    public setField(_: Map<string, Field>) {}
    public execute (env: Env): ReturnType {
        let value: ReturnType = this.exp.execute(env)
        if (value.type === Type.INT) {
            return {value: 'INT', type: value.type}
        }
        if (value.type === Type.DOUBLE) {
            return {value: 'DOUBLE', type: value.type}
        }
        if (value.type === Type.DATE) {
            return {value: 'DATE', type: value.type}
        }
        if (value.type === Type.VARCHAR) {
            return {value: 'VARCHAR', type: value.type}
        }
        if (value.type === Type.BOOLEAN) {
            return {value: 'BOOLEAN', type: value.type}
        }
        return {value: 'NULL', type: Type.NULL}
    }
    public ast(ast: AST): ReturnAST {
        const id = ast.getNewID()
        var dot = `node_${id}[label="TYPEOF"];`
        let value1: ReturnAST = this.exp.ast(ast)
        dot += '\n' + value1.dot
        dot += `\nnode_${id} -> node_${value1.id};`
        return {dot: dot, id: id}
    }
}