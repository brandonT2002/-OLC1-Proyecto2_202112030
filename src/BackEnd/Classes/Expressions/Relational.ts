import { Expression } from "../Abstracts/Expression";
import { AST, ReturnAST } from "../Env/AST";
import { Env } from "../Env/Env";
import { Field } from "../Objects/Table";
import { ReturnType, Type } from "../Utils/Type";
import { TypeExp } from "../Utils/TypeExp";

export class Relational extends Expression {
    constructor(line: number, column: number, public exp1: Expression, public sign: string, public exp2: Expression) {
        super(line, column, TypeExp.RELATIONAL_OP)
    }
    public setField(field: Map<string, Field>) {
        this.exp1.setField(field)
        this.exp2.setField(field)
    }
    public execute(env: Env): ReturnType {
        switch (this.sign) {
            case '=':
                return this.equal(env)
            case '!=':
                return this.notEqual(env)
            case '>=':
                return this.greatEqual(env)
            case '<=':
                return this.lessEqual(env)
            case '>':
                return this.great(env)
            case '<':
                return this.less(env)
            default:
                return {value: 'NULL', type: Type.NULL}
        }
    }
    equal (env: Env): ReturnType {
        let value1: ReturnType = this.exp1.execute(env)
        let value2: ReturnType = this.exp2.execute(env)
        if (value1.type === Type.INT || value1.type === Type.DOUBLE) {
            if (value2.type === Type.INT || value2.type === Type.DOUBLE) {
                // return {value: parseFloat(value1.value) + parseFloat(value2.value), type: this.type}
                return {value: value1.value === value2.value, type: Type.BOOLEAN}
            }
            env.setError("Los tipos no son válidos para operaciones relacionales", this.exp2.line, this.exp2.column)
            return {value: 'NULL', type: Type.NULL}
        }
        if (value1.type === Type.VARCHAR && value2.type === Type.VARCHAR) {
            return {value: value1.value === value2.value, type: Type.BOOLEAN}
        }
        env.setError("Los tipos no son válidos para operaciones relacionales", this.exp2.line, this.exp2.column)
        return {value: 'NULL', type: Type.NULL}
    }
    notEqual(env: Env): ReturnType {
        let value1: ReturnType = this.exp1.execute(env)
        let value2: ReturnType = this.exp2.execute(env)
        if (value1.type === Type.INT || value1.type == Type.DOUBLE) {
            if (value2.type === Type.INT || value2.type === Type.DOUBLE) {
                return {value: value1.value !== value2.value, type: Type.BOOLEAN}
            }
            env.setError("Los tipos no son válidos para operaciones relacionales", this.exp2.line, this.exp2.column)
            return {value: 'NULL', type: Type.NULL}
        }
        if (value1.type === Type.VARCHAR && value2.type === Type.VARCHAR) {
            env.setError("Los tipos no son válidos para operaciones relacionales", this.exp2.line, this.exp2.column)
            return {value: value1.value !== value2.value, type: Type.BOOLEAN}
        }
        env.setError("Los tipos no son válidos para operaciones relacionales", this.exp2.line, this.exp2.column)
        return {value: 'NULL', type: Type.NULL}
    }
    greatEqual(env: Env): ReturnType {
        let value1: ReturnType = this.exp1.execute(env)
        let value2: ReturnType = this.exp2.execute(env)
        if (value1.type === Type.INT || value1.type == Type.DOUBLE) {
            if (value2.type === Type.INT || value2.type === Type.DOUBLE) {
                return {value: value1.value >= value2.value, type: Type.BOOLEAN}
            }
            env.setError("Los tipos no son válidos para operaciones relacionales", this.exp2.line, this.exp2.column)
            return {value: 'NULL', type: Type.NULL}
        }
        if (value1.type === Type.VARCHAR && value2.type === Type.VARCHAR) {
            env.setError("Los tipos no son válidos para operaciones relacionales", this.exp2.line, this.exp2.column)
            return {value: value1.value >= value2.value, type: Type.BOOLEAN}
        }
        env.setError("Los tipos no son válidos para operaciones relacionales", this.exp2.line, this.exp2.column)
        return {value: 'NULL', type: Type.NULL}
    }
    lessEqual(env: Env): ReturnType {
        let value1: ReturnType = this.exp1.execute(env)
        let value2: ReturnType = this.exp2.execute(env)
        if (value1.type === Type.INT || value1.type == Type.DOUBLE) {
            if (value2.type === Type.INT || value2.type === Type.DOUBLE) {
                return {value: value1.value <= value2.value, type: Type.BOOLEAN}
            }
            env.setError("Los tipos no son válidos para operaciones relacionales", this.exp2.line, this.exp2.column)
            return {value: 'NULL', type: Type.NULL}
        }
        if (value1.type === Type.VARCHAR && value2.type === Type.VARCHAR) {
            env.setError("Los tipos no son válidos para operaciones relacionales", this.exp2.line, this.exp2.column)
            return {value: value1.value <= value2.value, type: Type.BOOLEAN}
        }
        env.setError("Los tipos no son válidos para operaciones relacionales", this.exp2.line, this.exp2.column)
        return {value: 'NULL', type: Type.NULL}
    }
    great(env: Env): ReturnType {
        let value1: ReturnType = this.exp1.execute(env)
        let value2: ReturnType = this.exp2.execute(env)
        if (value1.type === Type.INT || value1.type == Type.DOUBLE) {
            if (value2.type === Type.INT || value2.type === Type.DOUBLE) {
                return {value: value1.value > value2.value, type: Type.BOOLEAN}
            }
            env.setError("Los tipos no son válidos para operaciones relacionales", this.exp2.line, this.exp2.column)
            return {value: 'NULL', type: Type.NULL}
        }
        if (value1.type === Type.VARCHAR && value2.type === Type.VARCHAR) {
            env.setError("Los tipos no son válidos para operaciones relacionales", this.exp2.line, this.exp2.column)
            return {value: value1.value > value2.value, type: Type.BOOLEAN}
        }
        env.setError("Los tipos no son válidos para operaciones relacionales", this.exp2.line, this.exp2.column)
        return {value: 'NULL', type: Type.NULL}
    }
    less(env: Env): ReturnType {
        let value1: ReturnType = this.exp1.execute(env)
        let value2: ReturnType = this.exp2.execute(env)
        if (value1.type === Type.INT || value1.type == Type.DOUBLE) {
            if (value2.type === Type.INT || value2.type === Type.DOUBLE) {
                return {value: value1.value < value2.value, type: Type.BOOLEAN}
            }
            env.setError("Los tipos no son válidos para operaciones relacionales", this.exp2.line, this.exp2.column)
            return {value: 'NULL', type: Type.NULL}
        }
        if (value1.type === Type.VARCHAR && value2.type === Type.VARCHAR) {
            env.setError("Los tipos no son válidos para operaciones relacionales", this.exp2.line, this.exp2.column)
            return {value: value1.value < value2.value, type: Type.BOOLEAN}
        }
        env.setError("Los tipos no son válidos para operaciones relacionales", this.exp2.line, this.exp2.column)
        return {value: 'NULL', type: Type.NULL}
    }
    public ast(ast: AST): ReturnAST {
        const id = ast.getNewID()
        var dot = `node_${id}[label="${this.sign}" color="white" fontcolor="white"];`
        let value1: ReturnAST = this.exp1.ast(ast)
        dot += '\n' + value1.dot
        dot += `\nnode_${id} -> node_${value1.id};`
        let value2: ReturnAST = this.exp2.ast(ast)
        dot += '\n' + value2.dot
        dot += `\nnode_${id} -> node_${value2.id};`
        return {dot: dot, id: id}
    }
}