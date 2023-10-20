import { Expression } from "../Abstracts/Expression";
import { Env } from "../Env/Env";
import { ReturnType, Type } from "../Utils/Type";
import { TypeExp } from "../Utils/TypeExp";

export class Parameter extends Expression {
    constructor(line: number, column: number, private id: string, private type: Type) {
        super(line, column, TypeExp.PARAMETER)
    }
    public execute(_: Env): ReturnType {
        return {value: this.id, type: this.type}
    }
}