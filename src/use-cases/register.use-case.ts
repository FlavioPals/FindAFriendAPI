import { hash } from "bcryptjs"
import { prisma } from "../lib/prisma"
import { PrismaUsersRepository } from "../repositories/prisma/prisma-users-repository"
import { UsersRepository } from "../repositories/users-repository"
import { UserAlreadyExistsError } from "../errors/user-already-exists"

interface RegisterUseCaseRequest{
    name: string
    email: string
    password: string
}
export class RegisterUseCase{
    constructor(private usersRepository: UsersRepository){}
    async execute({name, email, password}: RegisterUseCaseRequest){
        const password_hash = await hash(password, 2)
        const userWithSameEmail = await this.usersRepository.findByEmail(email)
        if(userWithSameEmail){
            throw new UserAlreadyExistsError()
            }
       
        this.usersRepository.create({
            name,
            email,
            password:password_hash
        })
    }
}
