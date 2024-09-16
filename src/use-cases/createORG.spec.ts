import { beforeEach, describe, expect, it, test } from "vitest";
import { compare } from "bcryptjs";
import { ORGRepository } from "../repositories/ORGRepository";
import { CreateOrgUseCase } from "./createORG";
import { InMemoryORGRepository } from "../repositories/in-memory/in-memory-ORG-repository";
import { OrgAlreadyExistsError } from "../errors/org-already-exists";

let OrgRepository: ORGRepository
let sut: CreateOrgUseCase
describe('create ORG use case', () => {
    beforeEach(() => {
        OrgRepository = new InMemoryORGRepository()
        sut = new CreateOrgUseCase(OrgRepository)
    })
    it('should be able to create ORG', async () => {
        const {org} =  await sut.execute({
            id: 'org-1',
            name: 'ORG 1',
            email: 'org1',
            whatsapp: 'whatsapp',
            password: '123456',
            state: 'state',
            city: 'city',
        })
        expect(org.id).toEqual(expect.any(String))
        expect(org.name).toEqual('ORG 1')
    })
    it('should hash user password upon registration', async () => {
        const {org} =  await sut.execute({
            id: 'org-1',
            name: 'ORG 1',
            email: 'org1',
            whatsapp: 'whatsapp',
            password: '123456',
            state: 'state',
            city: 'city',
        })

        const isPasswordCorrectlyHashed = await compare('123456', org.password)
        expect(isPasswordCorrectlyHashed).toBe(true)
    })
    it('should not be able to create ORG with same email', async () => {
        await sut.execute({
            id: 'org-1',
            name: 'ORG 1',
            email: 'org1',
            whatsapp: 'whatsapp',
            password: '123456',
            state: 'state',
            city: 'city',
        })
        await expect(() => 
            sut.execute({
                id: 'org-2',
                name: 'ORG 2',
                email: 'org1',
                whatsapp: 'whatsapp',
                password: '123456',
                state: 'state',
                city: 'city',
            })
        ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
    })
})