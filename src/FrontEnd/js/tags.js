function changeTag(num,name) {
    fetch(`${path}/files/setCurrentN`,{
        method: 'POST',
        headers,
        body: `{"num": ${num},"name":"${name}"}`
    })
    .then(response => response.json())
    .then(response => {getOpenedFiles(response.num)})
    .catch(error => {})
}
function closeTag(name) {
    fetch(`${path}/files/close`,{
        method: 'POST',
        headers,
        body: `{"name":"${name}"}`
    })
    .then(response => response.json())
    .then(response => {getOpenedFiles(response.num)})
    .catch(error => {})
}