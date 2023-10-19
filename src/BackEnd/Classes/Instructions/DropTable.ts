import { Instruction } from "../Abstracts/Instruction";
import { Env } from "../Env/Env";
import { TypeInst } from "../Utils/TypeInst";

export class DropTable extends Instruction {
    constructor(line: number, column: number, private id: string) {
        super(line, column, TypeInst.TRUNCATE_TABLE)
    }
    
    public execute(env: Env) {
        env.deletTable(this.id, this.line, this.column)
    }
}