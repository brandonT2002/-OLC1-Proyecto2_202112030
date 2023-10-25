import { Expression } from "../Abstracts/Expression";
import { Env } from "../Env/Env";
import { ReturnType, Type } from "../Utils/Type";
import { Symbol } from "../Env/Symbol";
import { TypeExp } from "../Utils/TypeExp";
import { AST, ReturnAST } from "../Env/AST";
import { Field } from "../Objects/Table";

export class AccessID extends Expression {
    constructor(line: number, column: number, private id: string) {
        super(line, column, TypeExp.ACCESS_ID);
    }
    public setField(_: Map<string, Field>) {}
    public execute(env: Env): ReturnType {
        const value: Symbol | null = env.getValue(this.id)
        if(value) {
            return {value: value.value,type: value.type}
        }
        return {value: 'NULL', type: Type.NULL}
    }
    public ast(ast: AST): ReturnAST {
        const id = ast.getNewID()
        var dot = `node_${id}[label="${this.id}" color="white" fontcolor="white"];`
        return {dot: dot, id: id}
    }
}