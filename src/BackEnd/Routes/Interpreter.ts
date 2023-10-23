import express from 'express'
import { Controller } from '../Controller/Controller'
const router = express.Router()
const interpreter: Controller = new Controller()
router.get('/',interpreter.running)
router.post('/parser',interpreter.parser)
router.post('/parserFile',interpreter.parserFile)
router.get('/getAST',interpreter.getAST)
router.get('/getSymbolsTable',interpreter.getSymbolsTable)
router.get('/getErrors',interpreter.getErrors)
export default router