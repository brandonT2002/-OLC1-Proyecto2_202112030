import { Env } from "../Env/Env"
import { Type } from "../Utils/Type"

export class Data {
    constructor (public type: Type, public value: any) {}
}

export class Field {
    constructor (public type: Type, public values: Array<any>, public length: number) {}

    public slice() {
        this.values.slice(0)
    }

    public updateLength(n: number) {
        if(n > this.length) {
            this.length = n
        }
    }
}

export class Table {
    public fields: Map<string, Field> = new Map<string, Field>()
    private rows: number = 0;
    private name: string = ''
    constructor(name: string, nameFields: string[], typeFields: Type[]) {
        for (var i = 0; i < nameFields.length; i ++) {
            this.fields.set(nameFields[i].toLowerCase(), new Field(typeFields[i], [], nameFields[i].length)) 
            this.name = name
        }
    }

    public insert (env: Env, fields: Map<string, any[]> | undefined, line: number, column: number): boolean {
        if (fields && this.validate(env, fields, line, column)) {
            for (const [nameField, field] of fields) {
                this.fields.get(nameField)?.values.push(new Data(field[0], field[1]))
                this.fields.get(nameField)?.updateLength(field[1].length)
            }
            this.rows ++
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

    public addColumn(newColumn: string, type: Type) {
        this.fields.set(newColumn.toLowerCase(), new Field(type, [], newColumn.length ))
        for (let i = 0; i < this.rows; i ++) {
            this.fields.get(newColumn.toLowerCase())?.values.push(new Data(Type.NULL, 'NULL'))
            this.fields.get(newColumn.toLowerCase())?.updateLength(4)
        }
    }

    public dropColumn(column: string) {
        this.fields.delete(column.toLowerCase())
    }

    public renameTo(newId: string) {
        this.name = newId.toLowerCase()
    }

    public renameCOlumn(currentColumn: string, newColumn: string) {
        var field = this.fields.get(currentColumn.toLowerCase())
        if (field) {
            this.fields.set(newColumn, field)
            this.fields.delete(currentColumn.toLowerCase())
        }
    }

    public select(): string {
        var consult: string = ''
        var start: string = ''
        var header: string = ''
        var middle: string = ''
        var end: string = ''
        var lengths: number[] = []
        var data: any[][] = []
        for(const [nameField, field] of this.fields) {
            if(header != '') {
                start += '═╦═'
                middle += '═╬═'
                header += ' ║ '
                end += '═╩═'
            }
            start += `═`.repeat(field.length)
            middle += `═`.repeat(field.length)
            header += `${nameField}`.padEnd(field.length)
            end += `═`.repeat(field.length)
            lengths.push(field.length)
            data.push(field.values)
        }
        var title = `${this.name}`
        var mitad = Math.trunc(header.length / 2)
        var mitadTitle = Math.trunc(title.length / 2)
        consult += `╔═${'═'.repeat(header.length)}═╗\n`
        consult += `║ ${' '.repeat(mitad - mitadTitle) + title.padEnd(header.length - mitad + mitadTitle)} ║\n`
        consult += `╠═${start}═╣\n`
        consult += `║ ${header} ║\n`
        consult += `╠═${middle}═╣\n`
        var row: string = ''
        for(var j = 0; j < this.rows; j ++) {
            row = ''
            for(var i = 0; i < data.length; i ++) {
                if(row != '') {
                    row += ' ║ '
                }
                row += `${data[i][j].value}`.padEnd(lengths[i])
            }
            consult += `║ ${row} ║\n`
        }
        consult += `╚═${end}═╝\n`
        return consult
    }
    
    public getFieldsRow(): Map<string, any[]> {
        var base: Map<string, any[]> = new Map<string, any[]>()
        for (const [nameField, field] of this.fields) {
            base.set(nameField, [field.type, "NULL"])
        }
        return base
    }
}