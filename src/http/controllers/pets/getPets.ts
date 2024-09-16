import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreatePetUseCase } from "../../../use-cases/factories/make-create-pet-use-case";
import { makeGetPetsUseCase } from "../../../use-cases/factories/make-get-pets-use-case";

export function getPets(request: FastifyRequest, reply: FastifyReply) {
    const getPetsBodySchema = z.object({
       city: z.string(),
       age: z.string(),
       size: z.string(),
       energy_level: z.string(),
    })
    const {city, age, size, energy_level } = getPetsBodySchema.parse(request.body)
    try{
        const getPetsUseCase = makeGetPetsUseCase()
        getPetsUseCase.execute({
            age, size, energy_level, city
        })
        reply.status(201).send()
    } catch(err) {
        reply.status(500).send({message: "Internal Server Error"})
    }

}

