import User from '../../models/users';
import IUser from '../../types/user';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


interface AuthenticatedRequest extends Request {
    userId: string;
}


const authenticateUser = async (req: AuthenticatedRequest, res: Response, next: Function): Promise<void> => {
    try {
    
        const token = req.headers.authorization?.split(' ')[1]!;

        if (!token) {
            res.status(401).json({ message: 'Authentication failed. Token missing.' });
        }

        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);



        req.userId = decoded.userId;

        next();
    } catch (error) {
        res.status(401).json({ message: 'Authentication failed. Invalid token.' });
    }
};

const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users: IUser[] = await User.find();
        res.status(200).json({ users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const user: IUser | null = await User.findById(id);

        if (!user) {
             res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'User found!',
            user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
             res.status(400).json({ message: 'Email address already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user: IUser = new User({
            email,
            password: hashedPassword,
        });

        const newUser: IUser = await user.save();

        res.status(201).json({
            message: 'User created successfully',
            user: newUser,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const deleteUser: IUser | null = await User.findByIdAndDelete(id);

        res.status(200).json({
            message: 'User was deleted successfully',
            user: deleteUser,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const updatedUser: IUser | null = await User.findByIdAndUpdate(
            id,
            { email, password: hashedPassword },
            { new: true }
        );

        res.status(200).json({
            message: 'User info was updated successfully',
            user: updatedUser,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export { authenticateUser, getUsers, getUserById, createUser, deleteUser, updateUser };
