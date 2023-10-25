import { Expression } from "../Abstracts/Expression";
import { AST, ReturnAST } from "../Env/AST";
import { Env } from "../Env/Env";
import { TypeExp } from "../Utils/TypeExp";
import { ReturnType, Type } from "../Utils/Type";
import { Field as F } from "../Objects/Table";

export class Field extends Expression {
    private field: Map<string, F> = new Map<string, F>()
    constructor(line: number, column: number, private id: string) {
        super(line, column, TypeExp.FIELD)
    }
    public setField(field: Map<string, F>) {
        this.field = field;
    }
    public execute(env: Env): ReturnType {
        if(this.field.has(this.id.toLowerCase())) {
            return this.field.get(this.id.toLowerCase())?.values[0].getData()!
        }
        env.setError(`No existe el campo ${this.id.toLowerCase()}`, this.line, this.column)
        return {value: 'NULL', type: Type.NULL}
    }
    public ast(ast: AST): ReturnAST {
        return {dot: '', id: -1}
    }
}