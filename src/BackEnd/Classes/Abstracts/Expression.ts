import { ReturnType } from '../Utils/Type';
import { TypeExp } from '../Utils/TypeExp';
import { Env } from '../Env/Env';
import { AST, ReturnAST } from '../Env/AST';
export abstract class Expression {
    constructor(public line: number, public column: number, public typeExp: TypeExp) {}
    public abstract execute(env: Env): ReturnType;
    public abstract ast(ast: AST): ReturnAST;
}