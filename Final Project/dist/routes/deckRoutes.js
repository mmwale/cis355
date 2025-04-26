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
// src/routes/deckRoutes.ts
const express_1 = __importDefault(require("express"));
const deckController_1 = require("../controllers/deckController");
const models_1 = require("../models");
const router = express_1.default.Router();
router.get('/:id', deckController_1.getDeck);
router.post('/', deckController_1.createDeck);
router.put('/:id', deckController_1.updateDeck);
router.delete('/:id', deckController_1.deleteDeck);
router.get('/:id/study', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const deck = yield models_1.Deck.findByPk(req.params.id, {
            include: [{
                    model: models_1.Flashcard,
                    as: 'Flashcards'
                }],
            order: [[models_1.Flashcard, 'createdAt', 'ASC']]
        }); // Type assertion
        if (!deck) {
            res.status(404).send('Deck not found');
            return;
        }
        res.render('study', {
            deck: deck.get({ plain: true }),
            currentCardIndex: parseInt(req.query.card || '0'),
            totalCards: ((_a = deck.Flashcards) === null || _a === void 0 ? void 0 : _a.length) || 0
        });
    }
    catch (error) {
        console.error(error);
        next(error); // Pass the error to the next middleware
    }
}));
exports.default = router;
