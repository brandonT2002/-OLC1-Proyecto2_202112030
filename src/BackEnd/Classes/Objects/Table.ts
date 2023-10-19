import { Env } from "../Env/Env"
import { Type } from "../Utils/Type"

export class Field {
    constructor (public type: Type, public values: Array<any>) {}

    public slice() {
        this.values.slice(0)
    }
}

export class Table {
    public fields: Map<string, Field> = new Map<string, Field>()
    constructor(public name: string, nameFields: string[], typeFields: Type[]) {
        for (var i = 0; i < nameFields.length; i ++) {
            this.fields.set(nameFields[i].toLowerCase(), new Field(typeFields[i], [])) 
        }
    }

    public insert (env: Env, fields: Map<string, any[]> | undefined, line: number, column: number): boolean {
        if (fields && this.validate(env, fields, line, column)) {
            for (const [nameField, field] of fields) {
                this.fields.get(nameField)?.values.push(field[1])
            }
            return true
        }
        return false
    }

    public validate(env: Env, fields: Map<string, any[]>, line: number, column: number): boolean {
        for (const [nameField, field] of fields) {
            if (this.fields.get(nameField)?.type !== field[0]) {
                env.setError(`No coincide el tipo de dato para la columna ${nameField} en la Tabla ${this.name}`, line, column)
                return false
            }
        }
        return true
    }

    public validateFields(names: string[]): boolean {
        for(const name of names) {
            if (!this.fields.has(name.toLowerCase())) {
                return false
            }
        }
        return true
    }

    public truncate() {
        for (const [_, field] of this.fields) {
            field.slice()
        }
    }

    public getFieldsRow(): Map<string, any[]> {
        var base: Map<string, any[]> = new Map<string, any[]>()
        for (const [nameField, field] of this.fields) {
            base.set(nameField, [field.type, "NULL"])
        }
        return base
    }
}