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
exports.getTodoById = exports.deleteTodo = exports.updateTodo = exports.createTodo = exports.getTodos = void 0;
const todo_1 = __importDefault(require("../../models/todo"));
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield todo_1.default.find();
        res.status(200).json({ todos });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});
exports.getTodos = getTodos;
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const todo = new todo_1.default({
            name: body.name,
            description: body.description,
            status: body.status
        });
        const newTodo = yield todo.save();
        const allTodos = yield todo_1.default.find();
        console.log("All Todos:", allTodos);
        res.status(201).json({
            message: "New task added",
            todo: newTodo,
            todos: allTodos
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});
exports.createTodo = createTodo;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        const updateTodo = yield todo_1.default.findByIdAndUpdate(id, body, { new: true });
        const allTodos = yield todo_1.default.find();
        res.status(200).json({
            message: "Task updated",
            todo: updateTodo,
            todos: allTodos
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});
exports.updateTodo = updateTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleteTodo = yield todo_1.default.findByIdAndDelete(id);
        if (!deleteTodo) {
            res.status(404).json({ message: "Todo not found" });
        }
        const allTodos = yield todo_1.default.find();
        res.status(200).json({
            message: "Task deleted",
            todo: deleteTodo,
            todos: allTodos
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});
exports.deleteTodo = deleteTodo;
const getTodoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const getTodo = yield todo_1.default.findById(id);
        if (!getTodo) {
            res.status(404).json({ message: "Todo not found!" });
            return;
        }
        res.status(200).json({
            message: "Todo found",
            todo: getTodo
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});
exports.getTodoById = getTodoById;
