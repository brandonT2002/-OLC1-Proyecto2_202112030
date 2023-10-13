import { Expression } from "../Abstracts/Expression";
import { Env } from "../Env/Env";
import { ReturnType, Type } from "../Utils/Type";
import { TypeExp } from "../Utils/TypeExp";
import { plus, minus, mult, div, mod } from "../Utils/DomineOp";

export class Arithmetic extends Expression {
    private type: Type = Type.NULL
    constructor(line: number,column: number,public exp1: Expression,public sign: string,public exp2: Expression) {
        super(line, column, TypeExp.ARITHMETIC_OP);
    }
    public execute(env: Env): ReturnType {
        switch (this.sign) {
            case '+':
                return this.plus(env)
            case '-':
                if (this.exp1 != undefined) {
                    return this.minus(env)
                }
                return this.negative(env)
            case '*':
                return this.mult(env)
            case '/':
                return this.div(env)
            case '%':
                return this.mod(env)
            default:
                return {value: -1, type: Type.NULL}
        }
    }

    plus(env: Env): ReturnType {
        let value1: ReturnType = this.exp1.execute(env)
        let value2: ReturnType = this.exp2.execute(env)
        this.type = plus[value1.type][value2.type]
        if(this.type !== Type.NULL) {
            if (this.type === Type.INT) {
                return {value: parseInt(value1.value) + parseInt(value2.value), type: this.type}
            }
            if (this.type === Type.DOUBLE) {
                return {value: parseFloat(value1.value) + parseFloat(value2.value), type: this.type}
            }
            else if (this.type === Type.VARCHAR) {
                return {value: `${value1.value}${value2.value}`, type: this.type}
            }
        }
        env.setError("Los tipos no son válidos para operaciones aritméticas", this.exp2.line, this.exp2.column)
        return {value: 'NULL', type: this.type}
    }

    minus(env: Env): ReturnType {
        let value1: ReturnType = this.exp1.execute(env)
        let value2: ReturnType = this.exp2.execute(env)
        this.type = minus[value1.type][value2.type]
        if(this.type !== Type.NULL) {
            if (this.type === Type.INT) {
                return {value: parseInt(value1.value) - parseInt(value2.value), type: this.type}
            }
            if (this.type === Type.DOUBLE) {
                return {value: parseFloat(value1.value) - parseFloat(value2.value), type: this.type}
            }
            else if (this.type === Type.VARCHAR) {
                return {value: `${value1.value}${value2.value}`, type: this.type}
            }
        }
        env.setError("Los tipos no son válidos para operaciones aritméticas", this.exp2.line, this.exp2.column)
        return {value: 'NULL', type: this.type}
    }

    negative(env: Env): ReturnType {
        let value: ReturnType = this.exp2.execute(env)
        this.type = value.type
        if (this.type === Type.INT || this.type === Type.DOUBLE) {
            return {value: -value.value, type: this.type}
        }
        env.setError("Los tipos no son válidos para operaciones aritméticas", this.exp2.line, this.exp2.column)
        return {value: 'NULL', type: Type.NULL}
    }

    mult(env: Env): ReturnType {
        let value1: ReturnType = this.exp1.execute(env)
        let value2: ReturnType = this.exp2.execute(env)
        this.type = mult[value1.type][value2.type]
        if (this.type === Type.INT) {
            return {value: parseInt(value1.value) * parseInt(value2.value), type: this.type}
        }
        if (this.type === Type.DOUBLE) {
            return {value: parseFloat(value1.value) * parseFloat(value2.value), type: this.type}
        }
        env.setError("Los tipos no son válidos para operaciones aritméticas", this.exp2.line, this.exp2.column)
        return {value: 'NULL', type: this.type}
    }

    div(env: Env): ReturnType {
        let value1: ReturnType = this.exp1.execute(env)
        let value2: ReturnType = this.exp2.execute(env)
        this.type = div[value1.type][value2.type]
        if (this.type === Type.INT) {
            return {value: parseInt(`${parseFloat(value1.value) / parseFloat(value2.value)}`), type: this.type}
        }
        if (this.type === Type.DOUBLE) {
            return {value: parseFloat(value1.value) / parseFloat(value2.value), type: this.type}
        }
        env.setError("Los tipos no son válidos para operaciones aritméticas", this.exp2.line, this.exp2.column)
        return {value: 'NULL', type: this.type}
    }

    mod(env: Env): ReturnType {
        let value1: ReturnType = this.exp1.execute(env)
        let value2: ReturnType = this.exp2.execute(env)
        this.type = mod[value1.type][value2.type]
        if (this.type === Type.INT) {
            return {value: parseInt(`${parseFloat(value1.value) % parseFloat(value2.value)}`), type: this.type}
        }
        if (this.type === Type.DOUBLE) {
            return {value: parseFloat(value1.value) % parseFloat(value2.value), type: this.type}
        }
        env.setError("Los tipos no son válidos para operaciones aritméticas", this.exp2.line, this.exp2.column)
        return {value: 'NULL', type: this.type}
    }
}