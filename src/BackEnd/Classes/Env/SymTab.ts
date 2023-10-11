import { Type } from '../Utils/Type';

export class SymTab {
    public num: number
    constructor(
        private line: number, private column: number, private isVariable: boolean,
        private isPrimitive: boolean, private id: string, private nameEnv: string,
        private type: Type) {
        this.num = 0
    }

    public toString(): string {
        return '║ ' + `${this.id}`.padEnd(20) + ' ║ ' + `${this.getType(this.type)}`.padEnd(10) + ' ║ ' + `${this.nameEnv}`.padEnd(15) + ' ║ ' + `${this.line}`.padEnd(5) + ' ║ ' + `${this.column}`.padEnd(7) + ' ║ ' 
    }

    public hash(): string {
        return `${this.id}_${this.type}_${this.nameEnv}_${this.line}_${this.column}_${this.isVariable}_${this.isPrimitive}`
    }

    public getDot(): string {
        if(this.isPrimitive || this.isVariable) {
            if(this.isPrimitive) {
                if(this.isVariable) {
                    return `<tr><td bgcolor="white">${this.num}</td><td bgcolor="white">%s${this.id}td><td bgcolor="white">Variable</td><td bgcolor="white">${this.getType(this.type)}</td><td bgcolor="white">${this.nameEnv}</td><td bgcolor="white">${this.line}</td><td bgcolor="white">${this.column}</td></tr>`
                }
                return `<tr><td bgcolor="white">${this.num}</td><td bgcolor="white">%s<${this.id}d><td bgcolor="white">Constante</td><td bgcolor="white">${this.getType(this.type)}</td><td bgcolor="white">${this.nameEnv}</td><td bgcolor="white">${this.line}</td><td bgcolor="white">${this.column}</td></tr>`
            }
        }
        if(this.type != Type.NULL) {
            return `<tr><td bgcolor="white">${this.num}</td><td bgcolor="white">%${this.id}/td><td bgcolor="white">Función</td><td bgcolor="white">${this.getType(this.type)}</td><td bgcolor="white">${this.nameEnv}</td><td bgcolor="white">${this.line}</td><td bgcolor="white">${this.column}</td></tr>`
        }
        return `<tr><td bgcolor="white">${this.num}</td><td bgcolor="white">${this.id}</td><td bgcolor="white">Método</td><td bgcolor="white">${this.getType(this.type)}</td><td bgcolor="white">${this.nameEnv}</td><td bgcolor="white">${this.line}</td><td bgcolor="white">${this.column}</td></tr>`
    }

    public getType(type: Type): string {
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
            default:
                return "NULL"
        }
    }
}