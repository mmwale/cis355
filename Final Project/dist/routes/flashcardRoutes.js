"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const flashcardController_1 = require("../controllers/flashcardController");
const router = express_1.default.Router();
router.get('/:deckId/flashcards/new', flashcardController_1.getFlashcardForm);
router.get('/:deckId/flashcards/:id/edit', flashcardController_1.getFlashcardForm);
router.post('/:deckId/flashcards', flashcardController_1.createFlashcard);
router.put('/:deckId/flashcards/:id', flashcardController_1.updateFlashcard);
router.delete('/:deckId/flashcards/:id', flashcardController_1.deleteFlashcard);
exports.default = router;
