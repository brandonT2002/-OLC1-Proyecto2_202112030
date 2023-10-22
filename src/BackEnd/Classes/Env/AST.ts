export class AST {
    private nodeID: number = 0
    constructor() {}
    public getNewID() {
        return this.nodeID ++
    }
}

export type ReturnAST = {dot: string, id: number}