import { Response, Request } from "express";
import { ITODO } from "../../types/todo";
import Todo from '../../models/todo';

const getTodos = async (req: Request, res: Response): Promise<void> => {
    try {
        const todos: ITODO[] = await Todo.find();
        res.status(200).json({ todos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

const createTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body as Pick<ITODO, "name" | "description" | "status">;

        const todo: ITODO = new Todo({
            name: body.name,
            description: body.description,
            status: body.status
        });

        const newTodo: ITODO | null = await todo.save();
        const allTodos: ITODO[] = await Todo.find();

        console.log("All Todos:", allTodos);

        res.status(201).json({
            message: "New task added",
            todo: newTodo,
            todos: allTodos
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

const updateTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const body = req.body;

        const updateTodo: ITODO | null = await Todo.findByIdAndUpdate(id, body, { new: true });
        const allTodos: ITODO[] = await Todo.find();

        res.status(200).json({
            message: "Task updated",
            todo: updateTodo,
            todos: allTodos
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

const deleteTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const deleteTodo: ITODO | null = await Todo.findByIdAndDelete(id);
        if (!deleteTodo) {
             res.status(404).json({ message: "Todo not found" });
        }

        const allTodos: ITODO[] = await Todo.find();

        res.status(200).json({
            message: "Task deleted",
            todo: deleteTodo,
            todos: allTodos
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};


const getTodoById= async(req: Request, res: Response) : Promise<void> =>{
    try{
        const {id} = req.params;

        const getTodo: ITODO | null = await Todo.findById(id);

        if(!getTodo){
            res.status(404).json({message: "Todo not found!"});
            return;
        }

          res.status(200).json({
            message: "Todo found",
            todo: getTodo
        })

    } catch(error){
        console.error(error);
        res.status(500).json({message: "Server Error"});
    }
}

export { getTodos, createTodo, updateTodo, deleteTodo, getTodoById };
