import express, {Router} from 'express'
import {updateUser, createUser, deleteUser, getUsers, getUserById} from '../controllers/todo/user'


const router: Router = express.Router()

router.use(express.json())

router.get("/user", getUsers)

router.get("/user/:id", getUserById)

router.post("/create", createUser)

router.put("/edit/:id", updateUser)

router.delete("/delete/:id", deleteUser)

export default router