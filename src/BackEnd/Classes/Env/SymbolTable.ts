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
}

export var symTable: SymbolTable = new SymbolTable()