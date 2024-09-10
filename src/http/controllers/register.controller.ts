import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { hash } from "bcryptjs"
import { prisma } from "../../lib/prisma"

export async function register(request:FastifyRequest, reply:FastifyReply){
    const createUserBodySchema = z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
    })
    const { name, email, password } = createUserBodySchema.parse(request.body)
    const userWithSameEmail = await prisma.user.findUnique({
        where:{
            email,
        }
    })
    if(userWithSameEmail){
        return reply.status(409).send({ message: "User already exists"})
        }
    const password_hash = await hash(password, 2)
    await prisma.user.create({
        data: {
            name,
            email,
            password: password_hash
        }
    })
    return reply.status(201).send()
}