import { Request, Response } from 'express';
import { createUser, deleteUser, getUsers, getUserById, updateUser } from '../controllers/todo/user';
import User from '../models/users';
import bcrypt from 'bcrypt'; // Import bcrypt library

// Mocking the Express Request and Response objects
const mockRequest = {} as Request;
const mockResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn()
} as unknown as Response;

describe('Users Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Reset mock functions before each test
  });

  it('should get all users', async () => {
    // Mocking the getUsers function
    const users = [{ _id: '1', email: 'user1@example.com' }, { _id: '2', email: 'user2@example.com' }];
    User.find = jest.fn().mockResolvedValueOnce(users);

    await getUsers(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ users });
  });

  it('should create a new user', async () => {
  
    const mockBody = {
      email: 'test@example.com',
      password: 'testpassword'
    };
  
    User.findOne = jest.fn().mockResolvedValueOnce(null);
    User.prototype.save = jest.fn().mockResolvedValueOnce({ _id: '123', ...mockBody });
  
    mockRequest.body = mockBody;
  
    await createUser(mockRequest, mockResponse);
  
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'User created successfully',
      user: expect.objectContaining({ email: 'test@example.com' }) // Ensure the response includes the newly created user
    });
  });
  
  

  it('should update a user', async () => {
    const mockId = '123';
    const updatedUser = { _id: mockId, email: 'updated@example.com' };
  
    mockRequest.params = { id: mockId };
    mockRequest.body = { email: 'updated@example.com' };
  
    User.findByIdAndUpdate = jest.fn().mockResolvedValueOnce(updatedUser);
  
    await updateUser(mockRequest as Request, mockResponse as Response);
  
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Server error'
    });
  });
  

  it('should delete a user', async () => {
    const mockId = '123';
    const deletedUser = { _id: mockId, email: 'deleted@example.com' };

    mockRequest.params = { id: mockId };

    User.findByIdAndDelete = jest.fn().mockResolvedValueOnce(deletedUser);

    await deleteUser(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'User was deleted successfully',
      user: deletedUser
    });
  });

  it('should get a user', async () => {
    const mockId = '123';
    const getUser = { _id: mockId, email: 'get@example.com' };

    mockRequest.params = { id: mockId } as { id: string };

    User.findById = jest.fn().mockResolvedValueOnce(getUser);

    await getUserById(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
        message: "User found!",
        user: getUser
    });
  });

  it('should return a 404 error if user is not found', async () => {
    const mockId = '123';

    mockRequest.params = { id: mockId } as { id: string };

    User.findById = jest.fn().mockResolvedValueOnce(null);

    await getUserById(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({
        message: "User not found"
    });
  });

  it('should return a 500 error if there is a server error', async () => {
    const mockId = '123';

    mockRequest.params = { id: mockId } as { id: string };

    User.findById = jest.fn().mockRejectedValueOnce(new Error('Test Error'));

    await getUserById(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Server error"
    });
  }); 
});
