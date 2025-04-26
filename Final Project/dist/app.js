"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_handlebars_1 = __importDefault(require("express-handlebars"));
const express_session_1 = __importDefault(require("express-session"));
const models_1 = require("./models");
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
// Handlebars setup
app.engine('handlebars', (0, express_handlebars_1.default)());
app.set('view engine', 'handlebars');
app.set('views', './src/views');
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, express_session_1.default)({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
// Routes
app.use('/', routes_1.default);
// Sync database
models_1.sequelize.sync().then(() => {
    console.log('Database synced');
});
exports.default = app;
