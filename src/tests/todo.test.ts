import { Request, Response } from 'express';
import { getTodos, createTodo, updateTodo, deleteTodo, getTodoById } from '../controllers/todo/todo';
import Todo from '../models/todo';


const mockRequest = {
    body: {
        name: 'Test Todo',
        description: 'Test Description',
        status: 'Pending'
    },
    params: { id: '1' }
} as unknown as Request<any, any, { id: string }, any>;
  
  const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  } as unknown as Response;
  
  describe('Todo Controller Tests', () => {
    beforeEach(() => {
      jest.clearAllMocks(); 
    });

    it('should create a new todo', async () => {
        const newTodoData = {
            _id: '1',
            name: 'Test Todo',
            description: 'Test Description',
            status: 'Pending'
        };
    
       
        const saveMock = jest.spyOn(Todo.prototype, 'save').mockResolvedValueOnce(newTodoData);
    
        
        const findMock = jest.spyOn(Todo, 'find').mockResolvedValueOnce([newTodoData]);

        await createTodo(mockRequest, mockResponse);
    
        expect(saveMock).toHaveBeenCalledWith();
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: 'New task added',
            todo: newTodoData,
            todos: [newTodoData]
        });
    });


  it('should handle server error in createTodo', async () => {
    const errorMock = new Error('Test Error');
    jest.spyOn(Todo.prototype, 'save').mockRejectedValueOnce(errorMock);

    await createTodo(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);

    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Server Error' });
  });

  it('should get all todos', async () => {
    const todos = [{ _id: '1', name: 'Todo 1', description: 'Description 1', status: 'Pending' }, { _id: '2', name: 'Todo 2', description: 'Description 2', status: 'Completed' }];
    Todo.find = jest.fn().mockResolvedValueOnce(todos);

    await getTodos(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ todos });
  });

  it('should update an existing todo', async () => {
    const updatedTodoData = {
      _id: '1',
      name: 'Updated Todo',
      description: 'Updated Description',
      status: 'Completed'
    };

    const findByIdAndUpdateMock = jest.spyOn(Todo, 'findByIdAndUpdate').mockResolvedValueOnce(updatedTodoData);

    const allTodos = [updatedTodoData];
    jest.spyOn(Todo, 'find').mockResolvedValueOnce(allTodos);

    await updateTodo(mockRequest, mockResponse);

    expect(findByIdAndUpdateMock).toHaveBeenCalledWith('1', mockRequest.body, { new: true });
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Task updated',
      todo: updatedTodoData,
      todos: allTodos
    });
});


  it('should handle server error in updateTodo', async () => {
    const errorMock = new Error('Test Error');
    jest.spyOn(Todo, 'findByIdAndUpdate').mockRejectedValueOnce(errorMock);

    await updateTodo(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);

    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Server Error' });
  });



  it('should delete a todo', async () => {
    const deletedTodoData = {
      _id: '1',
      name: 'Test Todo',
      description: 'Test Description',
      status: 'Pending'
    };
    const findByIdAndDeleteMock = jest.spyOn(Todo, 'findByIdAndDelete').mockResolvedValueOnce(deletedTodoData);

    
    const allTodos = [deletedTodoData]; 
    jest.spyOn(Todo, 'find').mockResolvedValueOnce(allTodos);

    await deleteTodo(mockRequest, mockResponse);

    expect(findByIdAndDeleteMock).toHaveBeenCalledWith('1');

    expect(mockResponse.status).toHaveBeenCalledWith(200);

    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Task deleted',
      todo: deletedTodoData,
      todos: allTodos
    });
});


  it('should handle todo not found in deleteTodo', async () => {
    jest.spyOn(Todo, 'findByIdAndDelete').mockResolvedValueOnce(null);

    await deleteTodo(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(404);

    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Todo not found' });
  });

  it('should handle server error in deleteTodo', async () => {
    const errorMock = new Error('Test Error');
    jest.spyOn(Todo, 'findByIdAndDelete').mockRejectedValueOnce(errorMock);

    await deleteTodo(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);

    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Server Error' });
  });

  it('should get a todo by ID', async () => {
    const mockId = '123';
    const todo = { _id: mockId, name: 'Test Todo', description: 'Test Description', status: 'Incomplete' };

    mockRequest.params = { id: mockId };
    Todo.findById = jest.fn().mockResolvedValueOnce(todo);

    await getTodoById(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Todo found',
      todo
    });
  });

  it('should return a 404 error if todo is not found in getTodoById', async () => {
    const mockId = '123';

    mockRequest.params = { id: mockId };

    Todo.findById = jest.fn().mockResolvedValueOnce(null);

    await getTodoById(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Todo not found!'
    });
  });

  it('should handle server errors in getTodoById', async () => {
    const mockId = '123';

    mockRequest.params = { id: mockId };

    Todo.findById = jest.fn().mockRejectedValueOnce(new Error('Test Error'));

    await getTodoById(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Server Error'
    });
  });

  it('should get a todo by ID', async () => {
    const mockId = '123';
    const todo = { _id: mockId, name: 'Test Todo', description: 'Test Description', status: 'Incomplete' };

    mockRequest.params = { id: mockId };
    Todo.findById = jest.fn().mockResolvedValueOnce(todo);

    await getTodoById(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Todo found',
      todo
    });
  });

  it('should return a 404 error if todo is not found in getTodoById', async () => {
    const mockId = '123';

    mockRequest.params = { id: mockId };

    Todo.findById = jest.fn().mockResolvedValueOnce(null);

    await getTodoById(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Todo not found!'
    });
  });

  it('should handle server errors in getTodoById', async () => {
    const mockId = '123';

    mockRequest.params = { id: mockId };

    Todo.findById = jest.fn().mockRejectedValueOnce(new Error('Test Error'));

    await getTodoById(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Server Error'
    });
    });

});
