import { Instruction } from "../Abstracts/Instruction";
import { TypeInst } from "../Utils/TypeInst";
import { ReturnType, Type } from "../Utils/Type";

export class Continue extends Instruction {
    constructor(line: number, column: number) {
        super(line, column, TypeInst.CONTINUE)
    }
    public execute(): ReturnType {
        return {value: this.typeInst, type: Type.NULL}
    }
}