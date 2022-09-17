"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./rutas/index"));
const config_1 = require("./config");
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.use('/api', index_1.default);
app.listen(config_1.CONFIG.APP_PORT, () => {
    console.log(`Corriendo en el puerto ${config_1.CONFIG.APP_PORT}`);
});
