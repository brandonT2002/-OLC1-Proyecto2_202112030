function analyze() {
    fetch(`${path}/interpreter/parser`, {
        method: 'POST',
        headers,
        body: `{"code":"${getCode()}"}`
    })
        .then(response => response.json())
        .then(response => {
            out.setOption('value', response.console)
        })
        .catch(error => { })
}
let graphviz
function graphAST() {
    fetch(`${path}/interpreter/getAST`)
        .then(response => response.json())
        .then(response => {
            graphviz = d3.select('#report').graphviz().scale(1).height(550 * 1).width(document.getElementById('report').clientWidth).renderDot(response.ast)
        })
        .catch(error => { })
}
function getSymbolsTable() {
    fetch(`${path}/interpreter/getSymbolsTable`)
        .then(response => response.json())
        .then(response => {
            let info = '<tr><th>No.</th><th>ID</th><th>Tipo</th><th>Tipo de Dato</th><th>Entorno</th><th>Linea</th><th>Columna</th></tr>'
            for (let i = 0; i < response.table.length; i++) {
                info += `<tr>
            <td>${i + 1}</td>
            <td>${response.table[i].id}</td>` 
            
            if (response.table[i].isPrimitive || response.table[i].isVariable) {
                if (response.table[i].isPrimitive) {
                    if (response.table[i].isVariable) {
                        info += `<td>Variable</td>`
                        info += `<td>${getTypeDescription(response.table[i].type)}</td>`
                    }
                }
            }
            else if (response.table[i].type == getTypes.TABLE) {
                info += `<td>${getTypeDescription(response.table[i].type)}</td>`
                info += `<td>NULL</td>`
            } else if (response.table[i].type != getTypes.NULL) {
                info += `<td>Función</td>`
                info += `<td>${getTypeDescription(response.table[i].type)}</td>`
            } else {
                info += `<td>Método</td>`
                info += `<td>${getTypeDescription(response.table[i].type)}</td>`
            }
            info += `<td>${response.table[i].nameEnv}</td>
            <td>${response.table[i].line}</td>
            <td>${response.table[i].column}</td>
            </tr>`
            }
            if (response.table.length != 0) {
                document.getElementById('symb-report').innerHTML = info
            }
        })
        .catch(error => { })
}
function getErrors() {
    fetch(`${path}/interpreter/getErrors`)
        .then(response => response.json())
        .then(response => {
            console.log('RESPUESTA')
            console.log(response.errors)
            let info = '<tr><th>No.</th><th>Tipo</th><th>Descripción</th><th>Linea</th><th>Columna</th></tr>'
            for (let i = 0; i < response.errors.length; i++) {
                info += `<tr>
            <td>${i + 1}</td>
            <td>${response.errors[i].type}</td>
            <td>${response.errors[i].description}</td>
            <td>${response.errors[i].line}</td>
            <td>${response.errors[i].column}</td>
            </tr>`
            }
            if (response.errors.length != 0) {
                document.getElementById('errors-report').innerHTML = info
            }
        })
        .catch(error => { })
}
function getTokens() {
    fetch(`${path}/interpreter/getTokens`)
        .then(response => response.json())
        .then(response => {
            console.log('RESPUESTA')
            console.log(response.tok)
            let info = '<tr><th>No.</th><th>Lexema</th><th>Token</th><th>Linea</th><th>Columna</th></tr>'
            for (let i = 0; i < response.tok.length; i++) {
                info += `<tr>
            <td>${i + 1}</td>
            <td>${response.tok[i].lexema}</td>
            <td>${response.tok[i].token}</td>
            <td>${response.tok[i].line}</td>
            <td>${response.tok[i].column}</td>
            </tr>`
            }
            if (response.tok.length != 0) {
                document.getElementById('tokens-report').innerHTML = info
            }
        })
        .catch(error => { })
}
const getTypes = {
    INT:     0,
    DOUBLE:  1,
    DATE:    2,
    VARCHAR: 3,
    BOOLEAN: 4,
    NULL:    5,
    TABLE:   6
};
function getTypeDescription(type) {
    switch (type) {
        case getTypes.INT:
            return "INT";
        case getTypes.DOUBLE:
            return "DOUBLE";
        case getTypes.VARCHAR:
            return "VARCHAR";
        case getTypes.BOOLEAN:
            return "BOOLEAN";
        case getTypes.DATE:
            return "DATE";
        case getTypes.TABLE:
            return "TABLE";
        case getTypes.NULL:
            return "NULL";
        default:
            return "TIPO DESCONOCIDO";
    }
}
function resetGraph() {
    graphviz.resetZoom(d3.transition().duration(500))
}
function getCode() {
    let code = editor.getValue()
    code = code.replace(/\\/g, '\\\\')
    code = code.replace(/\t/g, '    ')
    code = code.replace(/\r?\n|\r/g, '\\n')
    code = code.replace(/"/g, '\\"')
    return code
}