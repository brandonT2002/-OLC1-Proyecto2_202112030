import { Request, Response } from "express";
export class Controller {
    public runing(req: Request,res: Response) {
        res.send('Interpreter is running!!!')
    }
    public parser(req: Request,res: Response) {
        let code = req.body.code
        let parser = require('../Language/Parser')
        try {
            
        }
        catch (error) {
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