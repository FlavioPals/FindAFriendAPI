import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { prisma } from "../../lib/prisma"

export async function register(request:FastifyRequest, reply:FastifyReply){
    const createUserBodySchema = z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
    })
    const { name, email, password } = createUserBodySchema.parse(request.body)

    await prisma.user.create({
        data: {
            name,
            email,
            password
        }
    })
    return reply.status(201).send()
}