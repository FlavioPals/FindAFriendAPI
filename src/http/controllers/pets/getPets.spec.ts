import { afterAll, beforeAll, describe, expect, it } from "vitest";
import  request  from "supertest"
import { app } from "../../../app";
import { makeCreateOrgUseCase } from "../../../use-cases/factories/make-create-org-use-case";
import { makeRegisterUseCase } from "../../../use-cases/factories/make-register-use-case";
import { makeCreatePetUseCase } from "../../../use-cases/factories/make-create-pet-use-case";

describe('Get Pets (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })
    it('should be able to filter pets by city', async () => {
        const createOrgUseCase = makeCreateOrgUseCase()
        const createPetUseCase = makeCreatePetUseCase()
        const {org} =  await createOrgUseCase.execute({
            name: 'ORG 1',
            email: 'org1@hotmail.com',
            whatsapp: 'whatsapp',
            password: '123456',
            state: 'state',
            city: 'city',
        })

        const pet1 = await createPetUseCase.execute({
            name: 'Pet 1',
            description: 'description',
            age: 'age',
            size: 'size',
            energy_level: 'energy_level',
            org_id: org.id,
        })

        const pet2 = await createPetUseCase.execute({
            name: 'Pet 2',
            description: 'description',
            age: 'age',
            size: 'size',
            energy_level: 'energy_level',
            org_id: org.id,
        })

       

        const response = await request(app.server)
        .get('/pets')
        .send({
            city: 'city',
        })

        expect(response).toEqual([pet1, pet2])
        
     
    })
})


// name, description, age, size, energy_level, org_id, userId