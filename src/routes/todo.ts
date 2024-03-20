import express, {Router} from "express";
import {getTodos, createTodo , updateTodo, deleteTodo, getTodoById} from '../controllers/todo/todo'

const router : Router= express.Router()
router.use(express.json());

router.get("/todos", getTodos)

router.get("/todos/:id", getTodoById)

router.post("/add", createTodo)

router.delete("/delete/:id", deleteTodo)

router.put("/edit/:id", updateTodo)

 
export default router