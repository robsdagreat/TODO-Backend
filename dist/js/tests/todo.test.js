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
const todo_1 = require("../controllers/todo/todo");
const todo_2 = __importDefault(require("../models/todo"));
const mockRequest = {};
const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
};
jest.mock('../models/todo');
describe('Todo controllers', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should get all todos', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockTodos = [{ name: 'Task 1' }, { name: 'Task 2' }];
        todo_2.default.find.mockResolvedValueOnce(mockTodos);
        yield (0, todo_1.getTodos)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({ todos: mockTodos });
    }));
    it('should create a new todo', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockBody = {
            name: 'task',
            description: 'this task has to be done',
            status: true
        };
        todo_2.default.prototype.save.mockResolvedValueOnce(Object.assign({ _id: '123' }, mockBody));
        mockRequest.body = mockBody;
        yield (0, todo_1.createTodo)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: "New task added",
            todo: Object.assign({ _id: '123' }, mockBody),
            todos: expect.any(Array)
        });
    }), 10000);
    it('should update a todo', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockId = '123';
        const updatedTodo = { _id: mockId, name: 'updated', description: 'task to be done' };
        const allTodos = [{ _id: '1', name: 'Task 1' }, { _id: '2', name: 'Task 2' }];
        mockRequest.params = { id: mockId };
        mockRequest.body = { name: 'updated', description: 'task to be done', status: true };
        todo_2.default.findByIdAndUpdate.mockResolvedValueOnce(updatedTodo);
        todo_2.default.find.mockResolvedValueOnce(allTodos);
        yield (0, todo_1.updateTodo)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: "Task updated",
            todo: updatedTodo,
            todos: allTodos
        });
    }));
    it('should delete a todo', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockId = '123';
        const deletedTodo = { _id: mockId, name: 'deleted', description: 'task to be deleted' };
        mockRequest.params = { id: mockId };
        todo_2.default.findByIdAndDelete.mockResolvedValueOnce(deletedTodo);
        todo_2.default.find.mockResolvedValueOnce([]);
        yield (0, todo_1.deleteTodo)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: "Task deleted",
            todo: deletedTodo,
            todos: []
        });
    }), 30000);
    it('should get a todo by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockId = '123';
        const getTodo = { _id: mockId, name: 'task', description: 'task to be done' };
        mockRequest.params = { id: mockId };
        todo_2.default.findById.mockResolvedValueOnce(getTodo);
        yield (0, todo_1.getTodoById)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: "Todo found",
            todo: getTodo
        });
    }));
});
