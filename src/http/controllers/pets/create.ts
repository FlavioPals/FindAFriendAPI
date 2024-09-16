import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreatePetUseCase } from "../../../use-cases/factories/make-create-pet-use-case";

export function create(request: FastifyRequest, reply: FastifyReply) {
    const createPetsBodySchema = z.object({
        name: z.string(),
        description: z.string(),
        age: z.string(),
        size: z.string(),
        energy_level: z.string(),
        org_id: z.string(),
        userId: z.string(),
    })
    const { name, description, age, size, energy_level, org_id, userId } = createPetsBodySchema.parse(request.body)
    try{
        const createPetUseCase = makeCreatePetUseCase()
        createPetUseCase.execute({
            name, description, age, size, energy_level, org_id, userId
        })
        reply.status(201).send()
    } catch(err) {
        reply.status(500).send({message: "Internal Server Error"})
    }

}