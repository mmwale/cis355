"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const router = express_1.default.Router();
router.get('/login', authController_1.showLogin);
router.post('/login', authController_1.login);
router.get('/register', authController_1.showRegister);
router.post('/register', authController_1.register);
router.get('/logout', authController_1.logout);
exports.default = router;
