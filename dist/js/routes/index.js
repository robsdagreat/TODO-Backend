"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todo_1 = require("../controllers/todo");
const router = express_1.default.Router();
router.use(express_1.default.json());
router.get("/todos", todo_1.getTodos);
router.get("/todos/:id", todo_1.getTodoById);
router.post("/add", todo_1.createTodo);
router.delete("/delete/:id", todo_1.deleteTodo);
router.put("/edit/:id", todo_1.updateTodo);
exports.default = router;
