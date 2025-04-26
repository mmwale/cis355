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
exports.logout = exports.register = exports.showRegister = exports.login = exports.showLogin = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const passport_1 = __importDefault(require("passport"));
const models_1 = require("../models");
const showLogin = (req, res) => {
    res.render('login', { error: req.flash('error') });
};
exports.showLogin = showLogin;
exports.login = passport_1.default.authenticate('local', {
    successRedirect: '/decks',
    failureRedirect: '/login',
    failureFlash: true
});
const showRegister = (req, res) => {
    res.render('register', { error: req.flash('error') });
};
exports.showRegister = showRegister;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        yield models_1.User.create({
            username,
            email,
            password: hashedPassword
        });
        res.redirect('/login');
    }
    catch (error) {
        console.error(error);
        req.flash('error', 'Registration failed');
        res.redirect('/register');
    }
});
exports.register = register;
const logout = (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
};
exports.logout = logout;
