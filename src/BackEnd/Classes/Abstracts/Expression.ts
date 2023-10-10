import { ReturnType, Type } from '../Utils/Type';
import { TypeExp } from '../Utils/TypeExp';
import { Env } from '../Env/Env';
export abstract class Expression {
    constructor(public line: number, public column: number, public typeExp: TypeExp) {}
    public abstract execute(env: Env): ReturnType;
}