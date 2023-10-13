import { Instruction } from "../Abstracts/Instruction";
import { TypeInst } from "../Utils/TypeInst";
import { ReturnType, Type } from "../Utils/Type";

export class Break extends Instruction {
    constructor(line: number, column: number) {
        super(line, column, TypeInst.BREAK)
    }
    public execute(): ReturnType {
        return {value: this.typeInst, type: Type.NULL}
    }
}