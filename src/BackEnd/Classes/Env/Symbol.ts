import { Type } from "../Utils/Type";
export class Symbol {
    constructor(public value: any,public id: string,public type: Type) {
        this.id = id.toLowerCase()
    }
}