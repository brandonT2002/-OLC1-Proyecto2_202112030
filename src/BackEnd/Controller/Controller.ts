import { Request, Response } from "express";
import { Env } from "../Classes/Env/Env";
import { getStringOuts } from '../Classes/Utils/Outs';

export class Controller {
    public running(req: Request,res: Response) {
        res.send('Interpreter is running!!!')
    }
    public parser(req: Request,res: Response) {
        let code = req.body.code
        let parser = require('../Language/Parser')
        try {
            let ast = parser.parse(code)
            const global: Env = new Env(null, 'Global')
            for(let instruction of ast) {
                try {
                    instruction.execute(global)
                }
                catch (error) {}
            }

            var out: string = getStringOuts()
            console.log(out)
            res.json({
                console: out
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