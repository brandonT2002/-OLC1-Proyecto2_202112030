import { Error } from './Error'

export var printConsole: string[] = []
export var errors: Error[] = []

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
			errors[i].number = i + 1
			out += errors[i].toString()
			if(i < errors.length - 1) {
				out += "\n"
			}
		}
	}
    return out
}