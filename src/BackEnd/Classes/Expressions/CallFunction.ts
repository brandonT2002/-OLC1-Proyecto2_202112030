import { Expression } from "../Abstracts/Expression";
import { Env } from "../Env/Env";
import { Function } from "../Instructions/Function";
import { ReturnType, Type } from "../Utils/Type";
import { TypeExp } from "../Utils/TypeExp";

export class CallFunction extends Expression {
    constructor(line: number, column: number, private id: string, private args: Expression[]) {
        super(line, column, TypeExp.CALL_FUNC)
    }
    public execute(env: Env): ReturnType | any {
        const func: Function | null = env.getFunction(this.id)
        if(func) {
            const envFunc: Env = new Env(env, `Funcion ${this.id.toLowerCase()}`)
            if(func.parameters.length == this.args.length) {
                var value: ReturnType
                var param: ReturnType
                for(let i = 0; i < func.parameters.length; i ++) {
                    value = this.args[i].execute(env)
                    param = func.parameters[i].execute(env)
                    if(value.type === param.type) {
                        envFunc.saveID(param.value, value.value, value.type, func.parameters[i].line, func.parameters[i].column)
                    }
                    else {
                        env.setError(`Error, El Parámetro "${param.value}" no es del tipo "${this.getType(param.type)}", linea ${this.line} columna ${this.column}`, this.line, this.column)
                    }
                }
                let execute: any = func.block.execute(envFunc)
                if(execute) {
                    if(execute.value === TypeExp.RETURN) {
                        return
                    }
                    return execute
                }
            }
            else {
                env.setError(`Error, La Función "${this.id}" no tiene la cantidad correcta de parámetros, línea ${this.line} columna ${this.column}`, this.line, this.column)
            }
        }
        else {
            env.setError(`Error, La Función "${this.id}" no existe, línea ${this.line} columna ${this.column}`, this.line, this.column)
        }
    }

    getType(type: Type): string {
        if(type === Type.INT) {
            return 'int'
        }
        if(type === Type.DOUBLE) {
            return 'double'
        }
        if(type === Type.BOOLEAN) {
            return 'boolean'
        }
        if(type === Type.VARCHAR) {
            return 'varchar'
        }
        return 'NULL'
    }
}