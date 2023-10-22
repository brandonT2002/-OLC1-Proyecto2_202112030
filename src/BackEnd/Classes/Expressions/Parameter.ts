import { Type } from "../Utils/Type";

export class Parameter {
    constructor(public line: number, public column: number, public id: string, public type: Type) {}
}