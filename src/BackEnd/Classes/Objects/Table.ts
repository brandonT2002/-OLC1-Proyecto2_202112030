import { Expression } from "../Abstracts/Expression"
import { Env } from "../Env/Env"
import { Type, ReturnType } from "../Utils/Type"
import { Field as F } from "../Expressions/Field"

export class Data {
    constructor (public type: Type, public value: any) {}
    
    public update(value: any) {
        this.value = value
    }

    public getData(): ReturnType {
        return {value: this.value, type: this.type}
    }
}

export class Field {
    constructor (public type: Type, public values: Array<Data>, public length: number) {}

    public slice() {
        this.values.slice(0, this.values.length)
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
        }
        this.name = name
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
                env.setError(`No coincide el tipo de dato para la columna '${nameField}' en la Tabla ${this.name}`, line, column)
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
        for (const [nameField, field] of this.fields) {
            field.slice()
            this.fields.set(nameField, field)
        }
        this.rows = 0
    }

    public addColumn(newColumn: string, type: Type) {
        this.fields.set(newColumn.toLowerCase(), new Field(type, [], newColumn.length ))
        for (let i = 0; i < this.rows; i ++) {
            this.fields.get(newColumn.toLowerCase())?.values.push(new Data(Type.NULL, 'NULL'))
            this.fields.get(newColumn.toLowerCase())?.updateLength(newColumn.length)
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
            this.fields.get(newColumn)?.updateLength(newColumn.length)
            this.fields.delete(currentColumn.toLowerCase())
        }
    }

    private createTmpFields(): Map<string, Field> {
        var newFields: Map<string, Field> = new Map<string, Field>()
        for (const [nameField, field] of this.fields) {
            newFields.set(nameField, new Field(field.type, [], nameField.length))
        }
        return newFields
    }

    public deleteWhere(condition: Expression, env: Env) {
        var tmpFields: Map<string, Field>
        var resultFields: Map<string, Field> = this.createTmpFields()
        var result: ReturnType
        var newRows: number = 0
        for(var i = 0; i < this.rows; i ++) {
            tmpFields = this.createTmpFields()
            for (const [nameField, field] of this.fields) {
                tmpFields.get(nameField)?.values.push(new Data(field.values[i].type, field.values[i].value))
            }
            condition.setField(tmpFields)
            result = condition.execute(env)
            if(result.type === Type.BOOLEAN && result.value.toString() === "false") {
                for (const [nameField, field] of tmpFields) {
                    resultFields.get(nameField)?.values.push(new Data(field.values[0].type, field.values[0].value))
                    resultFields.get(nameField)?.updateLength(`${field.values[0].value}`.length)
                }
                newRows ++
            }
        }
        this.fields = resultFields
        if(newRows != this.rows) {
            this.rows = newRows
        }
    }

    public updateWhere(condition: Expression, fields: string[] ,values: Expression[], env: Env) {
        var tmpFields: Map<string, Field>
        var result: ReturnType
        var newValue: ReturnType
        for (var i = 0; i < this.rows; i++) {
            tmpFields = this.createTmpFields()
            for (const [nameField, field] of this.fields) {
                tmpFields.get(nameField)?.values.push(new Data(field.values[i].type, field.values[i].value))
            }
            condition.setField(tmpFields)
            result = condition.execute(env)
            if(result.type === Type.BOOLEAN && result.value.toString() === "true") {
                for (var j = 0; j < fields.length; j ++) {
                    if(this.fields.has(fields[j].toLowerCase())) {
                        values[j].setField(tmpFields)
                        newValue = values[j].execute(env)
                        if(newValue.type === this.fields.get(fields[j].toLowerCase())?.type) {
                            this.fields.get(fields[j].toLowerCase())?.values[i].update(newValue.value)
                            this.fields.get(fields[j].toLowerCase())?.updateLength(`${newValue.value}`.length)
                            continue
                        }
                        env.setError(`No coincide el tipo de dato para la columna '${fields[j].toLowerCase()}' en la Tabla ${this.name}`, values[j].line, values[j].column)
                        return
                    }
                    env.setError(`No existe el campo '${fields[j].toLowerCase()}' en Tabla ${this.name}`, values[j].line, values[j].column)
                    return
                }
            }
        }
    }

    private getAllFieldsTitle(): any[][] {
        var fieldsTitle: any[][] = []
        for(const [field, _] of this.fields) {
            fieldsTitle.push([new F(0, 0, field), field])
        }
        return fieldsTitle
    }

    private getTitles(fieldsTitle: any[][] | string): string[][] {
        var newfieldsTitle: string[][] = []
        var newtitle: any
        for(const title of fieldsTitle) {
            title[0].setIsFieldName(true)
            newtitle = title[0].execute(null).value.toLowerCase()
            newfieldsTitle.push([newtitle, title[1] === '' ? newtitle : title[1].toLowerCase()])
        }
        return newfieldsTitle
    }

    private createSelectFields(titles: string[][]): Map<string, Field> {
        var newFields: Map<string, Field> = new Map<string, Field>()
        var type: Type | undefined
        for (const field of titles) {
            type = this.fields.get(field[0])?.type
            newFields.set(field[1], new Field(type ? type : Type.NULL, [], field[1].length))
        }
        return newFields
    }

    public select(fields: any[][] | string, condition: Expression, env: Env): string {
        var titles: string[][] = []
        if(typeof(fields) === 'string' && fields === '*') {
            fields = this.getAllFieldsTitle()
        }
        titles = this.getTitles(fields)
        var selectedFields: Map<string, Field> = this.createSelectFields(titles)
        var tmpFields: Map<string, Field>
        var result: ReturnType
        var resField: Data | undefined
        var newRows: number = 0
        for (var i = 0; i < this.rows; i++) {
            tmpFields = this.createTmpFields()
            for (const [nameField, field] of this.fields) {
                tmpFields.get(nameField)?.values.push(new Data(field.values[i].type, field.values[i].value))
            }
            condition.setField(tmpFields)
            result = condition.execute(env)
            if(result.type === Type.BOOLEAN && result.value.toString() === "true") {
                for (const field of titles) {
                    resField = this.fields.get(field[0])?.values[i]
                    selectedFields.get(field[1])?.values.push(new Data(resField?.type ? resField?.type: Type.NULL, resField?.value))
                    selectedFields.get(field[1])?.updateLength(resField?.value.length)
                }
                newRows ++
            }
        }
        return this.getTable(selectedFields, newRows)
    }

    public getTable(fields: Map<string, Field>, rows: number): string {
        var consult: string = ''
        var start: string = ''
        var header: string = ''
        var middle: string = ''
        var end: string = ''
        var lengths: number[] = []
        var data: any[][] = []
        for(const [nameField, field] of fields) {
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
        consult += `    ╔═${'═'.repeat(header.length)}═╗\n`
        consult += `    ║ ${' '.repeat(mitad - mitadTitle) + title.padEnd(header.length - mitad + mitadTitle)} ║\n`
        consult += `    ╠═${start}═╣\n`
        consult += `    ║ ${header} ║\n`
        consult += `    ╠═${middle}═╣\n`
        var row: string = ''
        for(var j = 0; j < rows; j ++) {
            row = ''
            for(var i = 0; i < data.length; i ++) {
                if(row != '') {
                    row += ' ║ '
                }
                row += `${data[i][j].value}`.padEnd(lengths[i])
            }
            consult += `    ║ ${row} ║\n`
        }
        consult += `    ╚═${end}═╝\n`
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