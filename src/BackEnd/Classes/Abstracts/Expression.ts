import { ReturnType } from '../Utils/Type';
import { TypeExp } from '../Utils/TypeExp';
import { Env } from '../Env/Env';
import { AST, ReturnAST } from '../Env/AST';
import { Field } from '../Objects/Table';
export abstract class Expression {
    constructor(public line: number, public column: number, public typeExp: TypeExp) {}
    public abstract setField(field: Map<string, Field>): any;
    public abstract execute(env: Env): ReturnType;
    public abstract ast(ast: AST): ReturnAST;
}