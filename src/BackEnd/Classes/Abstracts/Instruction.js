"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Instruction = void 0;
var Instruction = /** @class */ (function () {
    function Instruction(line, column, typeInst) {
        this.line = line;
        this.column = column;
        this.typeInst = typeInst;
    }
    return Instruction;
}());
exports.Instruction = Instruction;
