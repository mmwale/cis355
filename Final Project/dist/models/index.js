"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.sequelize = exports.Flashcard = exports.Deck = void 0;
const sequelize_1 = require("sequelize");
const config_json_1 = __importDefault(require("../config/config.json"));
const deck_1 = __importDefault(require("./deck"));
exports.Deck = deck_1.default;
const flashcard_1 = __importDefault(require("./flashcard"));
exports.Flashcard = flashcard_1.default;
const user_1 = __importDefault(require("./user"));
exports.User = user_1.default;
const env = process.env.NODE_ENV || 'development';
const dbConfig = config_json_1.default[env];
const sequelize = new sequelize_1.Sequelize({
    database: dbConfig.database,
    username: dbConfig.username,
    password: dbConfig.password,
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: false
});
exports.sequelize = sequelize;
// No initializeModel needed - models are already initialized in their files
const db = {
    sequelize,
    User: user_1.default,
    Deck: deck_1.default,
    Flashcard: flashcard_1.default
};
// Set up associations
Object.values(db).forEach(model => {
    if (model === sequelize)
        return;
    if ('associate' in model && typeof model.associate === 'function') {
        model.associate(db);
    }
});
