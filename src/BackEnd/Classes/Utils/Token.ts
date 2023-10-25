export class Token {
    constructor(public line: number, public column: number, public lexema: string, public token: string) {
        this.column ++
    }
}