import { Request, Response } from "express";
import * as fs from 'fs'
export let root: string = 'C:\\Users\\bryan\\Documents\\TypeWiseProjects'
export let filesOpened: Map<string,string> = new Map<string,string>()
export let num: number = filesOpened.size - 1
export let name: string = 'NULL'
export class Files {
    public openFile(req: Request,res: Response) {
        name = req.body.name
        let content = req.body.content
        let path: string = `${root}\\${name}`
        let key: string = `${root}_${name}`
        fs.writeFile(path,content,(err) => {
            try {
                filesOpened.set(key.replace(/\\/g,'').replace(/\:/g,''),content)
                num = filesOpened.size - 1
                res.json({
                    num: num
                })
            }
            catch(error) {
                res.json({
                    response: error
                })
            }
        })
    }
    public openedFiles(req: Request,res: Response) {
        let obj = Object.fromEntries(filesOpened)
        let json = JSON.stringify(obj)
        res.json({
            response: JSON.parse(json)
        })
    }
    public setCurrentN(req: Request,res: Response) {
        num = req.body.num - 1
        name = req.body.name
        res.json({num: num})
    }
    public getCurrentN(req: Request,res: Response) {
        res.json({num: num})
    }
    public close(req: Request,res: Response) {
        filesOpened.delete(`${root}_${req.body.name}`.replace(/\\/g,'').replace(/\:/g,''))
        num = filesOpened.size > 0 ? 0 : -1
        name = filesOpened.size > 0 ? filesOpened.keys().next().value.split('_')[1] : 'NULL'
        res.json({num: num})
    }
    public save(req: Request,res: Response) {
        if(name == 'NULL') {
            res.json({
                response: 'unsaved'
            })
            return
        }
        fs.writeFile(`${root}\\${name}`,req.body.content,(err) => {
            try {
                filesOpened.set(`${root}_${name}`.replace(/\\/g,'').replace(/\:/g,''),req.body.content)
                res.json({
                    response: 'saved'
                })
            }
            catch(error) {
                res.json({
                    response: error
                })
            }
        })
    }
}