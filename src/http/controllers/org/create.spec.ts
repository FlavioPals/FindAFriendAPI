import { afterAll, beforeAll, describe, expect, it } from "vitest";
import  request  from "supertest"
import { app } from "../../../app";

describe('Create Org (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })
    it('should be able to create org', async () => {
        const response = await request(app.server)
        .post('/create/org')
        .send({
            name: 'John Doe',
            email: 'qJ9oK@example.com',
            whatsapp: '11999999999',
            password: '123456',
            state: 'SP',
            city: 'São Paulo'
        })

        expect(response.statusCode).toEqual(201)
    })
})

