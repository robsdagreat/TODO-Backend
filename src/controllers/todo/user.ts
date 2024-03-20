import User from '../../models/users'
import IUser from '../../types/user'
import { Request, Response } from 'express'


const getUsers = async (req: Request, res: Response) : Promise<void> =>{
 try{ const users: IUser[] = await User.find()
      res.status(200).json({users})
  } catch(error){
    console.error(error)
    res.status(500).json({messsage: "Server error"})
  }
} 


const getUserById = async (req: Request, res: Response): Promise<void> =>{
    try{const {params: {id}}= req

    const getUser: IUser | null = await User.findById({_id: id}) 

    res.status(200).json({
        message: "User found!",
        user: getUser
    })} catch(error){
        console.error(error)
        res.status(500).json({
            message: "Server error"
        })
    }
} 


const createUser= async (req: Request, res: Response): Promise<void> =>{
    try{
    
    const body= req.body as Pick<IUser, "email" | "password" >

    const user: IUser = new User({
        username: body.email,
        password: body.password
    })

    const newUser: IUser = await user.save()

    res.status(200).json({
        message: "User created succesfully",
        user: newUser
    })} catch(error){
        console.error(error)
        res.status(500).json({message: "Server error"})
    }
}

const deleteUser = async (req: Request, res: Response): Promise<void> =>{
    try{
    const {id} = req.params

    const deleteUser : IUser | null = await User.findByIdAndDelete(id)
    
    res.status(200).json({
        message: "User was deleted successfully",
        user: deleteUser
    })} catch(error){
        console.error(error)
        res.status(500).json({message: "Server error"})
    }
} 

const updateUser = async (req: Request, res: Response): Promise<void> =>{
    try{
        const {params: {id}, body}= req

        const updatedUser: IUser | null = await User.findByIdAndUpdate(id, body)
    
        res.status(201).json({
           message: "User info was updated successfully",
           user: updatedUser
     })} catch(error){
        console.error(error)
        res.status(500).json({message: "Server error"})
     }

}

export {updateUser, createUser, deleteUser, getUsers, getUserById}