import { SymTab } from './SymTab';

class SymbolTable {
    public symbols: SymTab[]
    constructor() {
        this.symbols = []
    }

    public push(sym: SymTab) {
        if(this.validateSymbol(sym)) {
            this.symbols.push(sym)
        }
    }

    public validateSymbol(sym: SymTab): boolean {
        for(const i of this.symbols) {
            if(i.hash() == sym.hash()) {
                return false
            }
        }
        return true
    }

    public getDot(): string {
        var dot = `digraph SymbolsTable {graph[fontname="Arial" labelloc="t" bgcolor="#252526" fontcolor="white"];node[shape=none fontname="Arial"];label="Tabla de Símbolos";table[label=<<table border="0" cellborder="1" cellspacing="0" cellpadding="3"><tr><td bgcolor="#009900" width="100"><font color="#FFFFFF">No.</font></td><td bgcolor="#009900" width="100"><font color="#FFFFFF">Identificador</font></td><td bgcolor="#009900" width="100"><font color="#FFFFFF">Tipo</font></td><td bgcolor="#009900" width="100"><font color="#FFFFFF">Tipo de Dato</font></td><td bgcolor="#009900" width="100"><font color="#FFFFFF">Entorno</font></td><td bgcolor="#009900" width="100"><font color="#FFFFFF">Línea</font></td><td bgcolor="#009900" width="100"><font color="#FFFFFF">Columna</font></td></tr>`
        for(let i = 0; i < this.symbols.length; i ++) {
            this.symbols[i].num = i + 1
            dot += this.symbols[i].getDot()
        }
        dot += `</table>>];}`
        return dot
    }

    public print() {
        console.log('TABLA DE SÍMBOLOS')
        for(const sym of this.symbols) {
            console.log(sym.toString())
        }
    }

    public splice() {
        this.symbols.splice(0)
    }

    public toString(): string {
        var table = '╔═' + '═'.repeat(69) + '═╗'
        table += '\n║ ' + ' '.repeat(26) + 'TABLA DE SÍMBOLOS' + ' '.repeat(26) + ' ║' 
        table += '\n╠═' + '═'.repeat(20) + '═╦═' + '═'.repeat(10) + '═╦═' +  '═'.repeat(15) + '═╦═' +  '═'.repeat(5) + '═╦═' +  '═'.repeat(7) + '═╣'
        table += '\n║ ' + 'ID'.padEnd(20) + ' ║ ' + 'TIPO'.padEnd(10) + ' ║ ' + 'ENTORNO'.padEnd(15) + ' ║ ' + 'LINEA'.padEnd(5) + ' ║ ' + 'COLUMNA'.padEnd(7) + ' ║' 
        table += '\n╠═' + '═'.repeat(20) + '═╬═' + '═'.repeat(10) + '═╬═' +  '═'.repeat(15) + '═╬═' +  '═'.repeat(5) + '═╬═' +  '═'.repeat(7) + '═╣'
        for(const sym of this.symbols) {
            table += '\n' + sym.toString()
        }
        table += '\n╚═' + '═'.repeat(20) + '═╩═' + '═'.repeat(10) + '═╩═' +  '═'.repeat(15) + '═╩═' +  '═'.repeat(5) + '═╩═' +  '═'.repeat(7) + '═╝'
        return table
    }
}

export var symTable: SymbolTable = new SymbolTable()