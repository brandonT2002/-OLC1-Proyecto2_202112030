import { TypeError } from './TypeError'

export class Error {
    public number: number
	constructor(public line: number, public column: number, public type: TypeError, public description: string) {
        this.number = 0
    }
    
    public toString(): string {
        return `→ Error ${this.type}, ${this.description}. ${this.line}:${this.column}`
    }
    
    public getDot(): string {
        return `<tr><td bgcolor="white">${this.number}</td><td bgcolor="white">${this.type}</td><td bgcolor="white">${this.description}</td><td bgcolor="white">${this.line}</td><td bgcolor="white">${this.column}</td></tr>`
    }
}