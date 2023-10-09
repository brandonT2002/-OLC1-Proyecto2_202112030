export class Env {
    private ids: Map<string,Symbol> = new Map<string,Symbol>()
    private functions: Map<string,Function> = new Map<string,Function>()
    constructor(private previous: Env | null,public name: string) {}
}