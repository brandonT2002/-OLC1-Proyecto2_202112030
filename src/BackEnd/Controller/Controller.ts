import { Request, Response } from "express";
import { Env } from "../Classes/Env/Env";
import { symTable } from '../Classes/Env/SymbolTable';
import { getStringOuts, resetOuts, getErrors, getTokens } from '../Classes/Utils/Outs'
import { AST, ReturnAST } from "../Classes/Env/AST";
import { TypeInst } from "../Classes/Utils/TypeInst";

var res_dotAST: string = ''

export class Controller {

    public running(req: Request,res: Response) {
        res.send('Interpreter is running!!!')
    }
    public parserFile(req: Request,res: Response) {
        let file = req.body.file
        let parser = require('../Language/Parser')
        var fs = require('fs')
        console.log('\x1Bc');
        fs.readFile(file, 'utf-8', (err: Error, data: string) => {
            if(err) {
                console.log(err)
                res.json({
                    console: err
                })
            }
            else {
                resetOuts()
                symTable.splice()
                let instructions = parser.parse(data)
                let ast: AST = new AST()
                const global: Env = new Env(null, 'Global')
                var dotAST: string = 'node_r[label="INSTRUCTIONS"];'
                var resultAST: ReturnAST
                for(let instruction of instructions) {
                    try {
                        if(instruction.typeInst === TypeInst.INIT_FUNCTION) {
                            instruction.execute(global)
                            resultAST = instruction.ast(ast)
                            dotAST += '\n' + resultAST.dot
                            dotAST += `\nnode_r -> node_${resultAST.id};`
                        }
                    }
                    catch (error) {}
                }
                for(let instruction of instructions) {
                    try {
                        if(instruction.typeInst !== TypeInst.INIT_FUNCTION) {
                            instruction.execute(global)
                            resultAST = instruction.ast(ast)
                            dotAST += '\n' + resultAST.dot
                            dotAST += `\nnode_r -> node_${resultAST.id};`
                        }
                    }
                    catch (error) {}
                }
                console.log(dotAST)
                var out: string = getStringOuts()
                console.log()
                global.printSymTab()
                console.log()
                console.log('\x1b[32mOutput QUERYCRYPTER\x1b[0m')
                console.log(out)
                res.json({
                    console: out
                })
            }
        })
    }
    public parser(req: Request,res: Response) {
        let code = req.body.code
        let parser = require('../Language/Parser')
        try {
            resetOuts()
            symTable.splice()
            let instructions = parser.parse(code)
            let ast: AST = new AST()
            const global: Env = new Env(null, 'Global')
            var dotAST: string =  'digraph G{\nnode[color="white" fontcolor="white"];\nedge[dir=none color="white"];\nbgcolor = "#0D1117";'
            dotAST += '\nnode_r[label="INSTRUCTIONS" color="white" fontcolor="white"];'
            var resultAST: ReturnAST
            for(let instruction of instructions) {
                try {
                    if(instruction.typeInst === TypeInst.INIT_FUNCTION) {
                        instruction.execute(global)
                        resultAST = instruction.ast(ast)
                        dotAST += '\n' + resultAST.dot
                        dotAST += `\nnode_r -> node_${resultAST.id};`
                    }
                }
                catch (error) {}
            }
            for(let instruction of instructions) {
                try {
                    if(instruction.typeInst !== TypeInst.INIT_FUNCTION) {
                        instruction.execute(global)
                        resultAST = instruction.ast(ast)
                        dotAST += '\n' + resultAST.dot
                        dotAST += `\nnode_r -> node_${resultAST.id};`
                    }
                }
                catch (error) {}
            }
            dotAST += '\n}'
            res_dotAST = dotAST
            res.json({
                console: getStringOuts()
            })
        }
        catch (error) {
            res.json({
                console: error
            })
        }
    }
    public getAST(req: Request,res: Response) {
        try {
            res.json({
                ast: res_dotAST
            })
        }
        catch (error) {
            res.json({
                ast: error
            })
        }
    }
    public getSymbolsTable(req: Request,res: Response) {
        try {
            res.json({
                table: symTable.symbols
            })
        }
        catch (error) {
            res.json({
                table: error
            })
        }
    }
    public getErrors(req: Request,res: Response) {
        try {
            res.json({
                errors: getErrors()
            })
        }
        catch (error) {
            res.json({
                errors: error
            })
        }
    }
    public getTokens(req: Request,res: Response) {
        try {
            res.json({
                tok: getTokens()
            })
        }
        catch (error) {
            res.json({
                tok: error
            })
        }
    }
}