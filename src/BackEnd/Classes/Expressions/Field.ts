import { Expression } from "../Abstracts/Expression";
import { AST, ReturnAST } from "../Env/AST";
import { Env } from "../Env/Env";
import { TypeExp } from "../Utils/TypeExp";
import { ReturnType, Type } from "../Utils/Type";
import { Field as F } from "../Objects/Table";

export class Field extends Expression {
    private field: Map<string, F> = new Map<string, F>()
    private isFieldName: boolean = false
    constructor(line: number, column: number, private id: string) {
        super(line, column, TypeExp.FIELD)
    }
    public setIsFieldName(isFieldName: boolean) {
        this.isFieldName = isFieldName
    }
    public setField(field: Map<string, F>) {
        this.field = field;
    }
    public execute(env: Env): ReturnType {
        if(!this.isFieldName) {
            if(this.field.has(this.id.toLowerCase())) {
                return this.field.get(this.id.toLowerCase())?.values[0].getData()!
            }
            env.setError(`No existe el campo ${this.id.toLowerCase()}`, this.line, this.column)
            return {value: 'NULL', type: Type.NULL}
        }
        return {value: this.id, type: Type.NULL}
    }
    public ast(ast: AST): ReturnAST {
        const id = ast.getNewID()
        var dot = `node_${id}[label="${this.id}" color="white" fontcolor="white"];`
        return {dot: dot, id: id}
    }
}