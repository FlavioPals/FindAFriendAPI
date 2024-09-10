import { hash } from "bcryptjs"
import { prisma } from "../lib/prisma"

interface RegisterUseCaseRequest{
    name: string
    email: string
    password: string
}

export async function registerUseCase({name, email, password}: RegisterUseCaseRequest){
    const userWithSameEmail = await prisma.user.findUnique({
        where:{
            email,
        }
    })
    if(userWithSameEmail){
        throw new Error('User already exists')
        }
    const password_hash = await hash(password, 2)
    await prisma.user.create({
        data: {
            name,
            email,
            password: password_hash
        }
    })
}