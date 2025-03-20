"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_handlebars_1 = require("express-handlebars");
const path_1 = __importDefault(require("path"));
const database_1 = __importDefault(require("./config/database"));
const book_routes_1 = __importDefault(require("./routes/book-routes"));
// TODO: Import new route files
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
// Handlebars setup
app.engine('handlebars', (0, express_handlebars_1.engine)());
app.set('view engine', 'handlebars');
app.set('views', path_1.default.join(__dirname, 'views'));
// Routes
app.use('/books', book_routes_1.default);
// TODO: Use the new routes
// TODO: Add route for dashboard
app.get('/', (req, res) => {
    res.redirect('/books');
});
// Database sync and server start
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // TODO: Update sync options for development/production
        // Development: Force sync to recreate tables
        // await sequelize.sync({ force: true });
        // Production: Don't force sync, just sync what's needed
        yield database_1.default.sync();
        console.log('Database synced successfully');
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    }
    catch (error) {
        console.error('Unable to start server:', error);
    }
});
startServer();
