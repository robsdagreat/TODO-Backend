import { Request, Response } from "express";
import { updateUser, createUser, deleteUser, getUsers, getUserById } from '../controllers/todo/user';
import User from '../models/users';



const mockRequest = {} as Request;
const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
} as unknown as Response;



describe('user controllers', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should get all users', async () => {
        
        const mockUsers = [{ name: 'User 1' }, { name: 'User 2' }]; 
    

        const findSpy = jest.spyOn(User, 'find').mockResolvedValueOnce(mockUsers);
    
        await getUsers(mockRequest, mockResponse);
    
        expect(findSpy).toHaveBeenCalled(); 
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({ users: mockUsers });
    });

    it('should create a new user', async () => {
        const mockBody = {
            email: 'test@example.com',
            password: 'testpassword'
        };

        User.prototype.save = jest.fn().mockResolvedValueOnce({ _id: '123', ...mockBody });

        mockRequest.body = mockBody;

        await createUser(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalled();
    });

    it('should update a user', async () => {
        const mockId = '123';
        const updatedUser = { _id: mockId, email: 'update@example.com' };

        mockRequest.params = { id: mockId };
        mockRequest.body = { email: 'update@example.com' };

        User.findByIdAndUpdate = jest.fn().mockResolvedValueOnce(updatedUser);

        await updateUser(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: "User info was updated successfully",
            user: updatedUser
        });
    });

    it('should delete a user', async () => {
        const mockId = '123';
        const deletedUser = { _id: mockId, email: 'delete@example.com' };

        mockRequest.params = { id: mockId };

        User.findByIdAndDelete = jest.fn().mockResolvedValueOnce(deletedUser);

        await deleteUser(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: "User was deleted successfully",
            user: deletedUser
        });
    });

    it('should get a user', async () => {
        const mockId = '123';
        const getsUser = { _id: mockId, email: 'gete@xample.com' };

        mockRequest.params = { id: mockId } as { id: string };

        User.findById = jest.fn().mockResolvedValueOnce(getsUser);

        await getUserById(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: "User found!",
            user: getsUser
        });
    });
});
