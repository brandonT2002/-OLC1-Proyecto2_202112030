function analyze() {
    fetch(`${path}/interpreter/parser`,{
        method: 'POST',
        headers,
        body: `{"code":"${getCode()}"}`
    })
    .then(response => response.json())
    .then(response => {
        out.setOption('value',response.console)
    })
    .catch(error => {})
}
let graphviz
function graphAST() {
    fetch(`${path}/interpreter/getAST`,{
        method: 'POST',
        headers,
        body: `{"code":"${getCode()}"}`
    })
    .then(response => response.json())
    .then(response => {
        graphviz = d3.select('#report').graphviz().scale(0.6).height(document.getElementById('report').clientHeight).width(890*1.9).renderDot(response.ast)
    })
    .catch(error => {})
}
function getSymbolsTable() {
    fetch(`${path}/interpreter/getSymbolsTable`)
    .then(response => response.json())
    .then(response => {
        graphviz = d3.select('#report').graphviz().scale(1).height(document.getElementById('report').clientHeight).width(890*1.9).renderDot(response.table)
    })
    .catch(error => {})
}
function getErrors() {
    fetch(`${path}/interpreter/getErrors`)
    .then(response => response.json())
    .then(response => {
        graphviz = d3.select('#report').graphviz().scale(1).height(document.getElementById('report').clientHeight).width(890*1.9).renderDot(response.errors)
    })
    .catch(error => {})
}
function resetGraph() {
    graphviz.resetZoom(d3.transition().duration(500))
}
function getCode() {
    let code = editor.getValue()
    code = code.replace(/\\/g,'\\\\')
    code = code.replace(/\t/g,'    ')
    code = code.replace(/\r?\n|\r/g,'\\n')
    code = code.replace(/"/g,'\\"')
    return code
}