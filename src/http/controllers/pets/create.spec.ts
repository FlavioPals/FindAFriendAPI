import { afterAll, beforeAll, describe, expect, it } from "vitest";
import  request  from "supertest"
import { app } from "../../../app";
import { makeCreateOrgUseCase } from "../../../use-cases/factories/make-create-org-use-case";
import { makeRegisterUseCase } from "../../../use-cases/factories/make-register-use-case";

describe('Create Pet (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })
    it('should be able to create pet', async () => {
        const createOrgUseCase = makeCreateOrgUseCase()
        const registerUseCase = makeRegisterUseCase()
        const {org} =  await createOrgUseCase.execute({
            name: 'ORG 1',
            email: 'org1@hotmail.com',
            whatsapp: 'whatsapp',
            password: '123456',
            state: 'state',
            city: 'city',
        })
        const {user} = await registerUseCase.execute({
            name: 'John Doe',
            email: 'QpNkS@example.com',
            password: '123456'
        })

        const response = await request(app.server)
        .post('/create/pet')
        .send({
            name: 'John Doe',
            description: 'Lorem ipsum',
            age: '10',
            size: 'M',
            energy_level: '5',
            org_id: org.id,
            userId: user.id
        })

        expect(response.statusCode).toEqual(201)
    })
})


// name, description, age, size, energy_level, org_id, userId