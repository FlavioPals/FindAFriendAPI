import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository"
import { AuthenticateUseCase } from "../../use-cases/authenticate"
import { InvalidCredentialsError } from "../../errors/invalid-credentials-error"
import { makeAuthenticateUseCase } from "../../use-cases/factories/make-authenticate-use-case"

export async function authenticate(request:FastifyRequest, reply:FastifyReply){
    const authenticateUserBodySchema = z.object({
        email: z.string(),
        password: z.string(),
    })
    const {email, password } = authenticateUserBodySchema.parse(request.body)

    try{
        
        const authenticateUseCase = makeAuthenticateUseCase()
        await authenticateUseCase.execute({email, password})
    }catch(err){
        if(err instanceof InvalidCredentialsError){
            return reply.status(409).send({message: err.message})
        }
        throw err
    }
    return reply.status(200).send()
}