import { Expression } from "../Abstracts/Expression";
import { AST, ReturnAST } from "../Env/AST";
import { Env } from "../Env/Env";
import { ReturnType, Type } from "../Utils/Type";
import { TypeExp } from "../Utils/TypeExp";

export class Cast extends Expression {
    constructor (line: number, column: number, private value: Expression, private destinyType: Type) {
        super(line, column, TypeExp.CAST);
    }
    public execute (env: Env): ReturnType {
        let value: ReturnType = this.value.execute(env);
        if (value.type === Type.INT)  {
            if (this.destinyType === Type.DOUBLE) {
                return {value: parseFloat(value.value), type: Type.DOUBLE}
            }
            if (this.destinyType === Type.VARCHAR) {
                return {value: String(value.value), type: Type.VARCHAR}
            }
            env.setError(`No hay casteo de "${this.getType(value.type)}" a "${this.getType(this.destinyType)}"`, this.value.line, this.value.column)
            return {value: 'NULL', type: Type.NULL}
        }
        if (value.type === Type.DOUBLE) {
            if (this.destinyType === Type.INT) {
                return {value: parseInt(value.value), type: Type.INT}
            }
            if (this.destinyType === Type.VARCHAR) { 
                return {value: String(value.value), type: Type.VARCHAR}
            }
            env.setError(`No hay casteo de "${this.getType(value.type)}" a "${this.getType(this.destinyType)}"`, this.value.line, this.value.column)
            return {value: 'NULL', type: Type.NULL}
        }
        if (value.type === Type.DATE) {
            if (this.destinyType === Type.VARCHAR) {
                return {value: String(value.value), type: Type.VARCHAR}
            }
            env.setError(`No hay casteo de "${this.getType(value.type)}" a "${this.getType(this.destinyType)}"`, this.value.line, this.value.column)
            return {value: 'NULL', type: Type.NULL}
        }
        if (value.type === Type.VARCHAR) {
            if (this.destinyType === Type.INT && /^\d+$/.test(value.value)) {
                return {value: parseInt(value.value), type: Type.INT}
            }
            if (this.destinyType === Type.DOUBLE && /^\d+(\.\d+)?$/.test(value.value)) {
                return {value: parseFloat(value.value), type: Type.DOUBLE}
            }
            if (this.destinyType === Type.BOOLEAN) {
                return {value: value.value.toLowerCase() === 'true', type: Type.BOOLEAN}
            }
            env.setError(`No hay casteo de "${this.getType(value.type)}" a "${this.getType(this.destinyType)}"`, this.value.line, this.value.column)
            return {value: 'NULL', type: Type.NULL}
        }
        env.setError(`No hay casteo de "${this.getType(value.type)}" a "${this.getType(this.destinyType)}"`, this.value.line, this.value.column)
        return {value: 'NULL', type: Type.NULL}
    }
    private getType(type: Type): string {
        switch(type) {
            case Type.INT:
                return "INT"
            case Type.DOUBLE:
                return "DOUBLE"
            case Type.VARCHAR:
                return "VARCHAR"
            case Type.BOOLEAN:
                return "BOOLEAN"
            case Type.DATE:
                return "DATE"
            case Type.TABLE:
                return "TABLE"
            default:
                return "NULL"
        }
    }
    public ast(ast: AST): ReturnAST {
        const id = ast.getNewID()
        var dot = `node_${id}[label="CAST"];`
        let value1: ReturnAST = this.value.ast(ast)
        dot += '\n' + value1.dot
        dot += `\nnode_${id}_type[label="${this.getType(this.destinyType)}"];`
        dot += `\nnode_${id} -> node_${value1.id};`
        dot += `\nnode_${id} -> node_${id}_type;`
        return {dot: dot, id: id}
    }
}