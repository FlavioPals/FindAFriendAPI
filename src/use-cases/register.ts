import { hash } from "bcryptjs"
import { prisma } from "../lib/prisma"
import { PrismaUsersRepository } from "../repositories/prisma-users-repository"

interface RegisterUseCaseRequest{
    name: string
    email: string
    password: string
}
export class RegisterUseCase{
    constructor(private usersRepository: any){}
    async execute({name, email, password}: RegisterUseCaseRequest){
        const password_hash = await hash(password, 2)
        const userWithSameEmail = await prisma.user.findUnique({
            where:{
                email,
            }
        })
        if(userWithSameEmail){
            throw new Error('User already exists')
            }
       
        this.usersRepository.create({
            name,
            email,
            password:password_hash
        })
    }
}
