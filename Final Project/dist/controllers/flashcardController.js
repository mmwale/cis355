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
exports.deleteFlashcard = exports.updateFlashcard = exports.createFlashcard = exports.getFlashcardForm = void 0;
const models_1 = require("../models");
const getFlashcardForm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.params.id) {
            const flashcard = yield models_1.Flashcard.findByPk(req.params.id);
            return res.render('flashcard-form', {
                flashcard,
                deckId: req.params.deckId
            });
        }
        res.render('flashcard-form', { deckId: req.params.deckId });
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});
exports.getFlashcardForm = getFlashcardForm;
const createFlashcard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { question, answer } = req.body;
        yield models_1.Flashcard.create({
            question,
            answer,
            deckId: parseInt(req.params.deckId)
        });
        res.redirect(`/decks/${req.params.deckId}`);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error creating flashcard');
    }
});
exports.createFlashcard = createFlashcard;
const updateFlashcard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { question, answer } = req.body;
        yield models_1.Flashcard.update({ question, answer }, {
            where: { id: req.params.id }
        });
        res.redirect(`/decks/${req.params.deckId}`);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error updating flashcard');
    }
});
exports.updateFlashcard = updateFlashcard;
const deleteFlashcard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield models_1.Flashcard.destroy({
            where: { id: req.params.id }
        });
        res.redirect(`/decks/${req.params.deckId}`);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error deleting flashcard');
    }
});
exports.deleteFlashcard = deleteFlashcard;
