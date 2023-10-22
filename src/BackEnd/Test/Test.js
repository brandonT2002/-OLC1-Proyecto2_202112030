var fs = require('fs')
var parser = require('../Language/Parser')
fs.readFile('../../../Inputs/Input.sql',(err,data) => {
    if(err) throw err
    let string = data.toString()
    console.log(string,'\n')
    parser.parse(string)
    // console.log(instructions)
})