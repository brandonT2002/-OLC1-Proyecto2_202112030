import { Expression } from "../Abstracts/Expression";
import { TypeExp } from "../Utils/TypeExp";
import { ReturnType, Type } from "../Utils/Type";
import { Env } from '../Env/Env';
import { AST, ReturnAST } from "../Env/AST";
import { Field } from "../Objects/Table";

export class Primitive extends Expression {
    constructor(line: number, column: number, public value: any, public type: Type) {
        super(line, column, TypeExp.PRIMITIVE)
    }
    public setField(_: Map<string, Field>) {}
    public execute(_: Env): ReturnType {
        switch(this.type) {
            case Type.INT:
                return {value: parseInt(this.value), type: this.type}
            case Type.DOUBLE:
                return {value: parseFloat(this.value), type: this.type}
            case Type.BOOLEAN:
                return {value: this.value.toString().toLowerCase() === 'true', type: this.type}
            case Type.DATE:
                return {value: this.value.toString(), type: this.type}
            default:
                this.value = this.value.replace(/\\n/g, '\n')
                this.value = this.value.replace(/\\t/g, '\t')
                this.value = this.value.replace(/\\"/g, '\"')
                this.value = this.value.replace(/\\'/g, '\'')
                this.value = this.value.replace(/\\\\/g, '\\')
                return {value: this.value, type: this.type}
        }
    }
    public ast(ast: AST): ReturnAST {
        const id = ast.getNewID()
        var dot = `node_${id}[label="${this.value}"];`
        return {dot: dot, id: id}
    }
}