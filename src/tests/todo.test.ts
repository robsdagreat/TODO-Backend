import { Request, Response } from "express";
import { getTodos, createTodo, updateTodo, deleteTodo, getTodoById } from '../controllers/todo/todo';
import Todo from '../models/todo';

const mockRequest = {} as Request;
const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
} as unknown as Response;

jest.mock('../models/todo');

describe('Todo controllers', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should get all todos', async () => {
        const mockTodos = [{ name: 'Task 1' }, { name: 'Task 2' }];
        (Todo.find as jest.Mock).mockResolvedValueOnce(mockTodos as any);
        await getTodos(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({ todos: mockTodos });
    });
    

    it('should create a new todo', async () => {
        const mockBody = {
            name: 'task',
            description: 'this task has to be done',
            status: true
        };
        (Todo.prototype.save as jest.Mock).mockResolvedValueOnce({ _id: '123', ...mockBody } as any);
        mockRequest.body = mockBody;
        await createTodo(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: "New task added",
            todo: { _id: '123', ...mockBody },
            todos: expect.any(Array)
        });
    },10000);

    it('should update a todo', async () => {
        const mockId = '123';
        const updatedTodo = { _id: mockId, name: 'updated', description: 'task to be done' };
        const allTodos = [{ _id: '1', name: 'Task 1' }, { _id: '2', name: 'Task 2' }];
        mockRequest.params = { id: mockId };
        mockRequest.body = { name: 'updated', description: 'task to be done', status: true };
        (Todo.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(updatedTodo as any);
        (Todo.find as jest.Mock).mockResolvedValueOnce(allTodos as any);
        await updateTodo(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: "Task updated",
            todo: updatedTodo,
            todos: allTodos 
        });
    });
    

    it('should delete a todo', async () => {
        const mockId = '123';
        const deletedTodo = { _id: mockId, name: 'deleted', description: 'task to be deleted' };
        mockRequest.params = { id: mockId };
        (Todo.findByIdAndDelete as jest.Mock).mockResolvedValueOnce(deletedTodo as any);
        (Todo.find as jest.Mock).mockResolvedValueOnce([] as any);
        await deleteTodo(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: "Task deleted",
            todo: deletedTodo,
            todos: []
        });
    },30000);

    it('should get a todo by id', async () => {
        const mockId = '123';
        const getTodo = { _id: mockId, name: 'task', description: 'task to be done' };
        mockRequest.params = { id: mockId };
        (Todo.findById as jest.Mock).mockResolvedValueOnce(getTodo as any);
        await getTodoById(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: "Todo found",
            todo: getTodo
        });
    });
});
