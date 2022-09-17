"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saludar = void 0;
const saludar = (req, res) => {
    res.status(200).send({ mensaje: 'Hola' });
};
exports.saludar = saludar;
