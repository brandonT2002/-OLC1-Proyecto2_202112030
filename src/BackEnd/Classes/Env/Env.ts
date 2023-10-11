import { Function } from '../Instructions/Function';
import { ReturnType, Type } from '../Utils/Type';
import { TypeError } from '../Utils/TypeError'
import { Error } from '../Utils/Error'
import { printConsole, errors } from '../Utils/Outs'
import { symTable } from './SymbolTable';
import { Symbol } from './Symbol';
import { SymTab } from "./SymTab";

export class Env {
    private ids: Map<string, Symbol> = new Map<string, Symbol>()
    private functions: Map<string, Function> = new Map<string, Function>()
    // private tables: Map<string, any> = new Map<string, any>()
    constructor(private previous: Env | null,public name: string) {}

    public saveID(id: string, value: any, type: Type, line: number, column: number) {
        let env: Env = this
        if(!env.ids.has(id.toLowerCase())) {
            env.ids.set(id.toLowerCase(), new Symbol(value, id.toLowerCase(), type))
            symTable.push(new SymTab(line, column + 1, true, true, id.toLowerCase(), env.name, type))
        }
        else {
            this.setError('Redeclaración de variable existente', line, column)
        }
    }

    public getValue(id: string): Symbol | null {
        let env: Env | null = this
        while(env) {
            if(env.ids.has(id.toLowerCase())) {
                return env.ids.get(id.toLowerCase())!
            }
            env = env.previous
        }
        return null
    }

    public reasignID(id: string, value: ReturnType, line: number, column: number): boolean {
        let env: Env | null = this
        while (env) {
            if (env.ids.has(id.toLowerCase())) {
                let symbol: Symbol = env.ids.get(id.toLowerCase())!
                symbol.value = value.value;
                env.ids.set(id.toLowerCase(), symbol)
                return true
            }
            env = env.previous
        }
        this.setError('Resignación de valor a variable inexistente', line, column)
        return false;
    }

    public saveFunction(id: string, func: Function) {
        let env: Env = this
        if(!env.functions.has(id.toLowerCase())) {
            env.functions.set(id.toLowerCase(),func)
            symTable.push(new SymTab(func.line, func.column + 1, false, false, id.toLowerCase(), env.name, func.type))
        }
        else {
            this.setError('Redefinición de función existente', func.line, func.column)
        }
    }

    public setPrint(print: string) {
        printConsole.push(print)
    }

    public setError(errorD: string, line: number, column: number) {
        if(this.match(errorD, line, column)) {
            errors.push(new Error(line, column, TypeError.SEMANTIC, errorD))
        }
    }

    public match(err: string, line: number, column: number): boolean {
        for(const s of errors) {
            if(s.toString() == (new Error(line, column, TypeError.SEMANTIC, err)).toString()) {
                return true
            }
        }
        return false
    }

    public printSymTab() {
        console.log(symTable.toString())
    }

    getTypeOf(type: Type): string {
        if(type === Type.INT) {
            return 'INT'
        }
        if(type === Type.DOUBLE) {
            return 'DOUBLE'
        }
        if(type === Type.BOOLEAN) {
            return 'BOOLEAN'
        }
        if(type === Type.VARCHAR) {
            return 'VARCHAR'
        }
        return 'NULL'
    }
}