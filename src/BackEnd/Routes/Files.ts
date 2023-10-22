import express from 'express';
import { Files } from '../Controller/Files';
const routerF = express.Router()
const files: Files = new Files()
routerF.post('/openFile',files.openFile)
routerF.get('/openedFiles',files.openedFiles)
routerF.post('/setCurrentN',files.setCurrentN)
routerF.get('/getCurrentN',files.getCurrentN)
routerF.post('/close',files.close)
routerF.post('/save',files.save)
export default routerF