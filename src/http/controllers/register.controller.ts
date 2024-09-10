import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository"
import { RegisterUseCase } from "../../use-cases/register"

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
    }catch{
        return reply.status(409).send()
    }
    return reply.status(201).send()
}