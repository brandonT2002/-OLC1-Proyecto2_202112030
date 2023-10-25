import { TypeError } from './TypeError'

export class Error {
	constructor(public line: number, public column: number, public type: TypeError, public description: string) {
    }
    
    public toString(): string {
        return `→ Error ${this.type}, ${this.description}. ${this.line}:${this.column}`
    }
    
    public getData(): string[] {
        return [String(this.type), this.description, String(this.line), String(this.column)]
    }
}