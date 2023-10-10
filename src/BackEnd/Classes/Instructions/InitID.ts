import { Expression } from '../Abstracts/Expression';
import { Instruction } from '../Abstracts/Instruction';
import { Env } from '../Env/Env';
import { TypeInst } from '../Utils/TypeInst';
import { ReturnType, Type } from '../Utils/Type';
export class InitID extends Instruction {
    constructor(line: number,column: number,private id: string,private type: Type,private value: Expression) {
        super(line,column,TypeInst.INIT_ID)
    }
    public execute(env: Env): any {
        const value: ReturnType = this.value.execute(env)
        env.saveID(this.id,value.value,this.type,this.line,this.column)
    }
}