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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDeck = exports.updateDeck = exports.createDeck = exports.getDeck = void 0;
const models_1 = require("../models");
const getDeck = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deck = yield models_1.Deck.findByPk(req.params.id, {
            include: [models_1.Flashcard]
        });
        if (!deck) {
            return res.status(404).send('Deck not found');
        }
        res.render('deck', {
            deck: deck.get({ plain: true }),
            user: req.user
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});
exports.getDeck = getDeck;
const createDeck = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.body;
        if (!req.user || !('id' in req.user)) {
            return res.status(400).send('User not authenticated or invalid user object');
        }
        const deck = yield models_1.Deck.create({
            title,
            userId: req.user.id
        });
        res.redirect(`/decks/${deck.id}`);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error creating deck');
    }
});
exports.createDeck = createDeck;
const updateDeck = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.body;
        yield models_1.Deck.update({ title }, {
            where: { id: req.params.id }
        });
        res.redirect(`/decks/${req.params.id}`);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error updating deck');
    }
});
exports.updateDeck = updateDeck;
const deleteDeck = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield models_1.Deck.destroy({
            where: { id: req.params.id }
        });
        res.redirect('/decks');
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error deleting deck');
    }
});
exports.deleteDeck = deleteDeck;
