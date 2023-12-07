import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { User } from '../entities/User.entity';

const getAllUsers = async (req: Request, res: Response) => {
    try {

        const users = await User.find();

        if (!users || users.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No users found.',
            });
        }

        return res.status(200).json({
            success: true,
            data: users,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getUserById = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const user = await User.findOne({ where: { id: new ObjectId(userId) } });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found.',
            });
        }

        return res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const createUser = async (req: Request, res: Response) => {

    try {
        const newUser = User.create(req.body);

        const result = await newUser.save();

        return res.status(200).json({
            success: true,
            message: 'User created successfully',
            data: result
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const updateUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const updatedUser = req.body;

        await User.update(userId, updatedUser);

        return res.status(200).json({
            success: true,
            message: 'User updated successfully.',
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;

        const user = await User.findOne({ where: { id: new ObjectId(userId) } });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found.',
            });
        }

        await User.remove(user);

        return res.status(200).json({
            success: true,
            message: 'User deleted successfully.',
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}