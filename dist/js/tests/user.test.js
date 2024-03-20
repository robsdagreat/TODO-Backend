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
const user_1 = require("../controllers/todo/user");
const users_1 = __importDefault(require("../models/users"));
const mockRequest = {};
const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
};
describe('user controllers', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should get all users', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUsers = [{ name: 'User 1' }, { name: 'User 2' }];
        const findSpy = jest.spyOn(users_1.default, 'find').mockResolvedValueOnce(mockUsers);
        yield (0, user_1.getUsers)(mockRequest, mockResponse);
        expect(findSpy).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({ users: mockUsers });
    }));
    it('should create a new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockBody = {
            email: 'test@example.com',
            password: 'testpassword'
        };
        users_1.default.prototype.save = jest.fn().mockResolvedValueOnce(Object.assign({ _id: '123' }, mockBody));
        mockRequest.body = mockBody;
        yield (0, user_1.createUser)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalled();
    }));
    it('should update a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockId = '123';
        const updatedUser = { _id: mockId, email: 'update@example.com' };
        mockRequest.params = { id: mockId };
        mockRequest.body = { email: 'update@example.com' };
        users_1.default.findByIdAndUpdate = jest.fn().mockResolvedValueOnce(updatedUser);
        yield (0, user_1.updateUser)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: "User info was updated successfully",
            user: updatedUser
        });
    }));
    it('should delete a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockId = '123';
        const deletedUser = { _id: mockId, email: 'delete@example.com' };
        mockRequest.params = { id: mockId };
        users_1.default.findByIdAndDelete = jest.fn().mockResolvedValueOnce(deletedUser);
        yield (0, user_1.deleteUser)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: "User was deleted successfully",
            user: deletedUser
        });
    }));
    it('should get a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockId = '123';
        const getsUser = { _id: mockId, email: 'gete@xample.com' };
        mockRequest.params = { id: mockId };
        users_1.default.findById = jest.fn().mockResolvedValueOnce(getsUser);
        yield (0, user_1.getUserById)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: "User found!",
            user: getsUser
        });
    }));
});
