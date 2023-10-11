import { Expression } from "../Abstracts/Expression";
import { Env } from "../Env/Env";
import { ReturnType, Type } from "../Utils/Type";
import { Symbol } from "../Env/Symbol";
import { TypeExp } from "../Utils/TypeExp";

export class AccessID extends Expression {
    constructor(line: number, column: number, private id: string) {
        super(line, column, TypeExp.ACCESS_ID);
    }
    public execute(env: Env): ReturnType {
        const value: Symbol | null = env.getValue(this.id)
        if(value) {
            return {value: value.value,type: value.type}
        }
        return {value: 'NULL', type: Type.NULL}
    }
}