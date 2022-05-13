import { PrismaClient } from '@prisma/client';
import { IUser } from '../interfaces/User'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient();

export const createUser = async (user: IUser) => {
    try {
        const hashedPassword = bcrypt.hashSync(user.password as string, 10);
        const createdUser = await prisma.user.create({
            data: {
                username: user.username,
                password: hashedPassword
            }
        })
        return { ...createdUser, password: undefined } as IUser;
    }
    catch (err: any) {
        console.error(`Error creating user: ${err.message}`);
        return null
    }
}

export const getUserByUsername = async (username: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                username
            }
        })
        return user as IUser;
    }
    catch (err: any) {
        console.error(`Error getting user: ${err.message}`);
        return null
    }
}

export const removeUser = async (username: string) => {
    try {
        const user = await prisma.user.delete({
            where: {
                username
            }
        })
        return true
    } catch (err: any) {
        console.error(`Error removing user: ${err.message}`);
        return false
    }
}