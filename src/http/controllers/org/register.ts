import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

import { PrismaUsersRepository } from "../../../repositories/prisma/prisma-users-repository"
import { RegisterUseCase } from "../../../use-cases/register"
import { UserAlreadyExistsError } from "../../../errors/user-already-exists"
import { makeRegisterUseCase } from "../../../use-cases/factories/make-register-use-case"

export async function register(request:FastifyRequest, reply:FastifyReply){
    const createUserBodySchema = z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
    })
    const { name, email, password } = createUserBodySchema.parse(request.body)

    try{
        const registerUseCase = makeRegisterUseCase()
        await registerUseCase.execute({name, email, password})
    }catch(err){
        if(err instanceof UserAlreadyExistsError){
            return reply.status(409).send({message: err.message})
        }

        throw err
    }
    return reply.status(201).send()
}