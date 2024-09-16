import { beforeEach, describe, expect, it, test } from "vitest";
import { ORGRepository } from "../repositories/ORGRepository";
import { CreateOrgUseCase } from "./createORG";
import { InMemoryORGRepository } from "../repositories/in-memory/in-memory-ORG-repository";
import { PetsRepository } from "../repositories/pets-repository";
import { CreatePetUseCase } from "./createPet";
import { InMemoryPetsRepository } from "../repositories/in-memory/in-memory-pets-repository";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { RegisterUseCase } from "./register";

let petRepository: PetsRepository
let createPetUseCase: CreatePetUseCase
let createOrgUseCase: CreateOrgUseCase
let orgRepository: ORGRepository
let usersRepository: InMemoryUsersRepository
let registerUseCase: RegisterUseCase
let inMemoryORGRepository:InMemoryORGRepository
describe('create Pet use case', () => {
    beforeEach(() => {
        inMemoryORGRepository = new InMemoryORGRepository()
        petRepository = new InMemoryPetsRepository(inMemoryORGRepository)
        createPetUseCase = new CreatePetUseCase(petRepository)
        orgRepository = new InMemoryORGRepository()
        createOrgUseCase = new CreateOrgUseCase(orgRepository)
        usersRepository = new InMemoryUsersRepository()
        registerUseCase = new RegisterUseCase(usersRepository)
    })
    it('should be able to create a Pet', async () => {
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

        const {pet} = await createPetUseCase.execute({
            age: '5',
            description: 'description',
            energy_level: '5',
            name: 'name',
            size: 'size',
            org_id: org.id,
            userId: user.id
        })

        expect(pet.id).toEqual(expect.any(String))

    })
})