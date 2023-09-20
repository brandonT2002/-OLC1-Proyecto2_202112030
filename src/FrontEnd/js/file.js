function openFile() {
    let fileInput = document.createElement('input')
    fileInput.type = 'file'
    fileInput.addEventListener('change', function(event) {
        let file = event.target.files[0]
        let reader = new FileReader()
        reader.readAsText(file,'utf-8')
        reader.onload = function(evt) {
            let code = getCodeF(evt.target.result.toString())
            fetch(`${path}/files/openFile`,{
                method: 'POST',
                headers,
                body: `{"name":"${file.name}","content":"${code}"}`
            })
            .then(response => response.json())
            .then(response => {getOpenedFiles(response.num)})
            .catch(error => {})
        }
    });
    fileInput.click();
}
function getOpenedFiles(num) {
    fetch(`${path}/files/openedFiles`)
    .then(response => response.json())
    .then(response => {
        response = response.response
        editor.setOption('value','')
        let tags = document.getElementById('tags')
        tags = `<div class="tmp"><div>d</div></div>`
        let c = 0;
        for(let key in response) {
            tags += `<div class="${c == num ? 'tag-active' : 'tag'}"><div onclick="changeTag(${c + 1},'${key.split('_')[1]}')">${key.split('_')[1]}</div><div class="close-b" onclick="closeTag('${key.split('_')[1]}')">x</div></div>`
            if(c == num) {
                editor.setOption('value',response[key])
            }
            c ++
        }
        document.getElementById('tags').innerHTML = tags
    })
    .catch(error => {})
}
function saveFile() {
    fetch(`${path}/files/save`,{
        method: 'POST',
        headers,
        body: `{"content":"${getCode()}"}`
    })
    .then(response => response.json())
    .then(response => {})
    .then(error => {})
}
function getCodeF(code) {
    code = code.replace(/\\/g,'\\\\')
    code = code.replace(/\t/g,'    ')
    code = code.replace(/\r?\n|\r/g,'\\n')
    code = code.replace(/"/g,'\\"')
    return code
}
fetch(`${path}/files/getCurrentN`)
.then(response => response.json())
.then(response => {getOpenedFiles(response.num)})
.catch(error => {})