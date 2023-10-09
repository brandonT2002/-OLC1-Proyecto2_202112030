import { Env } from '../Env/Env';
import { TypeInst } from '../Utils/TypeInst';
export abstract class Instruction {
    constructor(public line: number,public column: number,public typeInst: TypeInst) {}
    public abstract execute(env: Env): any;
}