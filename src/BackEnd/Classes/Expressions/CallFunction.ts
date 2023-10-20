import { Expression } from "../Abstracts/Expression";
import { AST, ReturnAST } from "../Env/AST";
import { Env } from "../Env/Env";
import { SymTab } from "../Env/SymTab";
import { symTable } from "../Env/SymbolTable";
import { Function } from "../Instructions/Function";
import { ReturnType, Type } from "../Utils/Type";
import { Symbol } from '../Env/Symbol';
import { TypeExp } from "../Utils/TypeExp";
import { Parameter } from "./Parameter";

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
                var param: Parameter
                for(let i = 0; i < func.parameters.length; i ++) {
                    value = this.args[i].execute(env)
                    param = func.parameters[i]  
                    if(value.type === param.type || param.type === Type.DOUBLE && value.type === Type.INT) {
                        if(!envFunc.ids.has(param.id.toLowerCase())) {
                            envFunc.ids.set(param.id.toLowerCase(), new Symbol(value.value, param.id.toLowerCase(), value.type))
                            symTable.push(new SymTab(param.line, param.column + 1, true, true, param.id.toLowerCase(), env.name, param.type))
                            continue
                        }
                        env.setError(`No puede haber parámetros distintos con el mismo nombre`, param.line, param.column)
                        return
                    }
                    env.setError(`Se esperaba un tipo de dato "${this.getType(param.type)}" para el parámetro "${param.id}"`, param.line, param.column)
                    return
                }
                let execute: any = func.block.execute(envFunc)
                if(execute) {
                    if(execute.value === TypeExp.RETURN) {
                        return
                    }
                    return execute
                }
                return
            }
            env.setError(`Cantidad errónea de parámetros enviados`, this.line, this.column)
            return
        }
        env.setError(`La Función "${this.id}" no existe, línea ${this.line} columna ${this.column}`, this.line, this.column)
    }
    private getType(type: Type): string {
        switch(type) {
            case Type.INT:
                return "INT"
            case Type.DOUBLE:
                return "DOUBLE"
            case Type.VARCHAR:
                return "VARCHAR"
            case Type.BOOLEAN:
                return "BOOLEAN"
            case Type.DATE:
                return "DATE"
            case Type.TABLE:
                return "TABLE"
            default:
                return "NULL"
        }
    }
    public ast(ast: AST): ReturnAST {
        const id = ast.getNewID()
        var dot = `node_${id}[label="${this.id}"]`
        let param: ReturnAST
        if (this.args.length > 0) {
            for (let i = 0; i < this.args.length; i ++) {
                param = this.args[i].ast(ast)
                dot += '\n' + param.dot
                dot += `\nnode_${id} -> node_${param.id}`
            }
        }
        return {dot: dot, id: id}
    }
}