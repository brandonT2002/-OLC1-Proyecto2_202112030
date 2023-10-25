import { Error } from './Error'
import { Token } from './Token'

export var printConsole: string[] = []
export var errors: Error[] = []
export var tokens: Token[] = []

export function getStringOuts(): string {
    var out = ''
    for(let i = 0; i < printConsole.length; i ++) {
		out += printConsole[i]
		if(i < printConsole.length - 1) {
			out += "\n"
		}
	}
    if(errors.length > 0) {
		if(out != "") {
			out += "\n\n↳ ERRORES\n"
		} else {
			out += "↳ ERRORES\n"
		}
		for(var i = 0; i < errors.length; i ++) {
			out += errors[i].toString()
			if(i < errors.length - 1) {
				out += "\n"
			}
		}
	}
    return out
}

export function getErrors() {
	return errors;
}

export function getTokens() {
	return tokens;
}

export function resetOuts() {
	printConsole.splice(0, printConsole.length)
	errors.splice(0, errors.length)
	tokens.splice(0, tokens.length)
}