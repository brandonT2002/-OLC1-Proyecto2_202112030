import { Function } from '../Instructions/Function';
import { ReturnType, Type } from '../Utils/Type';
import { TypeError } from '../Utils/TypeError'
import { Error } from '../Utils/Error'
import { printConsole, errors } from '../Utils/Outs'
import { symTable } from './SymbolTable';
import { Symbol } from './Symbol';
import { SymTab } from "./SymTab";
import { Field, Table } from '../Objects/Table';
import { Expression } from '../Abstracts/Expression';

export class Env {
    public ids: Map<string, Symbol> = new Map<string, Symbol>()
    public functions: Map<string, Function> = new Map<string, Function>()
    public tables: Map<string, Table>  = new Map<string, Table>()
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
                if (symbol.type === value.type || symbol.type === Type.DOUBLE && value.type === Type.INT) {
                    symbol.value = value.value;
                    env.ids.set(id.toLowerCase(), symbol)
                    return true
                }
                env.setError(`Los tipos no coinciden en la asignación. Intenta asignar un "${env.getTypeOf(value.type)}" a un "${env.getTypeOf(symbol.type)}"`, line, column)
				return false
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

    public saveTable(id: string, table: Table, line: number, column: number) {
        let env: Env = this
        if(!env.tables.has(id.toLowerCase())) {
            env.tables.set(id.toLowerCase(), table)
            symTable.push(new SymTab(line, column + 1, false, false, id.toLowerCase(), env.name, Type.TABLE))
            this.setPrint(`Tabla ${id.toLowerCase()} creada. ${line}:${column + 1}`)
        }
        else {
            this.setError('Redefinición de tabla existente', line, column)
        }
    }

    public deletTable(id: string, line: number, column: number): boolean {
        let env: Env | null = this
        while(env) {
            if(env.tables.has(id.toLowerCase())) {
                env.tables.delete(id.toLowerCase())
                this.setPrint(`Tabla ${id.toLowerCase()} eliminada. ${line}:${column + 1}`)
                symTable.pop(id.toLowerCase())
                return true
            }
            env = env.previous
        }
        this.setError('Eliminación de tabla inexistente', line, column)
        return false
    }

    public truncateTable(id: string, line: number, column: number): boolean {
        let env: Env | null = this
        while(env) {
            if(env.tables.has(id.toLowerCase())) {
                env.tables.get(id.toLowerCase())?.truncate()
                this.setPrint(`Registros eliminados de Tabla ${id.toLowerCase()}. ${line}:${column + 1}`)
                return true
            }
            env = env.previous
        }
        this.setError('Truncar tabla inexistente', line, column)
        return false
    }

    public insertTable(id: string, fields: string[], values: Expression[], line: number, column: number): boolean {
        let env: Env | null = this
        while(env) {
            if(env.tables.has(id.toLowerCase())) {
                if (env.tables.get(id.toLowerCase())?.validateFields(fields)) {
                    var newRow: Map<string, any[]> | undefined = env.tables.get(id.toLowerCase())?.getFieldsRow()
                    var result: ReturnType
                    for (let i = 0; i < fields.length; i ++) {
                        result = values[i].execute(this)
                        newRow?.set(fields[i].toLowerCase(), [result.type, result.value])
                    }
                    if (env.tables.get(id.toLowerCase())?.insert(env, newRow, line, column)) {
                        this.setPrint(`Registro insertado exitosamente en Tabla ${id.toLowerCase()}. ${line}:${column + 1}`)
                        console.log(env.tables.get(id.toLowerCase())?.fields)
                        return true
                    }
                    return false
                }
                this.setError(`Inserta dato en columna inexistente en Tabla ${id.toLowerCase()}`, line, column)
                return false
            }
            env = env.previous
        }
        this.setError(`Insertar en tabla inexistente`, line, column)
        return false
    }

    public setPrint(print: string) {
        printConsole.push(print)
    }

    public setError(errorD: string, line: number, column: number) {
        if(!this.match(errorD, line, column + 1)) {
            errors.push(new Error(line, column + 1, TypeError.SEMANTIC, errorD))
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