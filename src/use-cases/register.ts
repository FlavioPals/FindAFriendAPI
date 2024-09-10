import { hash } from "bcryptjs"
import { prisma } from "../lib/prisma"
import { PrismaUsersRepository } from "../repositories/prisma-users-repository"

interface RegisterUseCaseRequest{
    name: string
    email: string
    password: string
}

export async function registerUseCase({name, email, password}: RegisterUseCaseRequest){
    const password_hash = await hash(password, 2)

    const userWithSameEmail = await prisma.user.findUnique({
        where:{
            email,
        }
    })

    if(userWithSameEmail){
        throw new Error('User already exists')
        }
    const prismaUsersRepository = new PrismaUsersRepository()
    prismaUsersRepository.create({
        name,
        email,
        password:password_hash
    })

}