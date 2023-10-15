import { Request, Response } from "express";
import { Env } from "../Classes/Env/Env";
import { symTable } from '../Classes/Env/SymbolTable';
import { getStringOuts, resetOuts } from '../Classes/Utils/Outs'

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
                let ast = parser.parse(data)
                const global: Env = new Env(null, 'Global')
                for(let instruction of ast) {
                    try {
                        instruction.execute(global)
                    }
                    catch (error) {}
                }
                
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
            let ast = parser.parse(code)
            const global: Env = new Env(null, 'Global')
            for(let instruction of ast) {
                try {
                    instruction.execute(global)
                }
                catch (error) {}
            }

            res.json({
                console: getStringOuts()
            })
        }
        catch (error) {
            console.log(error)
            res.json({
                console: error
            })
        }
    }
    public getAST(req: Request,res: Response) {
        let code = req.body.code
        let parser = require('../AST/Parser')
        try {
            
        }
        catch (error) {
            res.json({
                ast: error
            })
        }
    }
    public getSymbolsTable(req: Request,res: Response) {
        try {
            
        }
        catch (error) {
            res.json({
                table: error
            })
        }
    }
    public getErrors(req: Request,res: Response) {
        try {
            
        }
        catch (error) {
            res.json({
                errors: error
            })
        }
    }
}