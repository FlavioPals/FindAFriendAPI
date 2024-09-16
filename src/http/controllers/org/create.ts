import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreateOrgUseCase } from "../../../use-cases/factories/make-create-org-use-case";
import { OrgAlreadyExistsError } from "../../../errors/org-already-exists";

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const createOrgBodySchema = z.object({
        name: z.string(),
        email: z.string(),
        whatsapp: z.string(),
        password: z.string(),
        state: z.string(),
        city: z.string(),
    })

    const { name, email, whatsapp, password, state, city } = createOrgBodySchema.parse(request.body)
    try{ 
        const createOrgUseCase = makeCreateOrgUseCase()
        await createOrgUseCase.execute({
            name, email, whatsapp, password, state, city
        })

        return reply.status(201).send()

    } catch(err){
        if(err instanceof OrgAlreadyExistsError){
            return reply.status(409).send({message: err.message})
        }
        throw err
    }
}

// name, email, whatsapp, password, state, city