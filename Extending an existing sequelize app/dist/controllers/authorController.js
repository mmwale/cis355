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
exports.deleteAuthor = exports.updateAuthor = exports.createAuthor = exports.editAuthorForm = exports.newAuthorForm = exports.getAuthor = exports.getAllAuthors = void 0;
// TODO: Import Book model
// TODO: Import Author model
// TODO: Implement get all authors
const getAllAuthors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // TODO: Get all authors with their book counts
});
exports.getAllAuthors = getAllAuthors;
// TODO: Implement show author details
const getAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // TODO: Get author with their books
});
exports.getAuthor = getAuthor;
// TODO: Implement new author form
const newAuthorForm = (req, res) => {
};
exports.newAuthorForm = newAuthorForm;
// TODO: Implement edit author form
const editAuthorForm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.editAuthorForm = editAuthorForm;
// TODO: Implement create author
const createAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // TODO: Check if author already exists
});
exports.createAuthor = createAuthor;
// TODO: Implement update author
const updateAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.updateAuthor = updateAuthor;
// TODO: Implement delete author
const deleteAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // TODO: Check if author has books and handle them (either prevent deletion or delete books)
});
exports.deleteAuthor = deleteAuthor;
