import { Expression } from '../Abstracts/Expression';
import { Instruction } from '../Abstracts/Instruction';
import { Env } from '../Env/Env';
import { TypeInst } from '../Utils/TypeInst';
import { ReturnType, Type } from '../Utils/Type';
export class InitID extends Instruction {
    constructor(line: number, column: number, private id: string | string[], private type: Type | Type[], private value: Expression | null) {
        super(line,column,TypeInst.INIT_ID)
    }
    public execute(env: Env): any {
        if(typeof this.id === 'string' && typeof this.type === 'number' && this.value) {
            const value: ReturnType = this.value.execute(env)
            if (value.type === this.type || this.type === Type.DOUBLE && value.type === Type.INT) {
                env.saveID(this.id, value.value, this.type, this.line, this.column)
            } else {
                env.setError("Los tipos no coinciden en la declaración", this.line, this.column)
            }
        }
        else if(typeof this.id === 'object' && typeof this.type === 'object' && !this.value) {
            for(var i = 0; i < this.id.length; i ++) {
                env.saveID(this.id[i], 'NULL', this.type[i], this.line, this.column)
            }
        }
    }
}