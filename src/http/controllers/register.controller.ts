import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository"
import { RegisterUseCase } from "../../use-cases/register.use-case"
import { UserAlreadyExistsError } from "../../errors/user-already-exists"

export async function register(request:FastifyRequest, reply:FastifyReply){
    const createUserBodySchema = z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
    })
    const { name, email, password } = createUserBodySchema.parse(request.body)

    try{
        const primsaUsersRepository = new PrismaUsersRepository()
        const registerUseCase = new RegisterUseCase(primsaUsersRepository)
        await registerUseCase.execute({name, email, password})
    }catch(err){
        if(err instanceof UserAlreadyExistsError){
            return reply.status(409).send({message: err.message})
        }

        return reply.status(500).send()//TODO: fix me
    }
    return reply.status(201).send()
}