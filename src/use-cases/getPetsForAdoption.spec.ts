import { beforeEach, describe, expect, it, test } from "vitest";

import { ORGRepository } from "../repositories/ORGRepository";
import { GetPetsByCityUseCase } from "./getPets";
import { InMemoryORGRepository } from "../repositories/in-memory/in-memory-ORG-repository";
import { InMemoryPetsRepository } from "../repositories/in-memory/in-memory-pets-repository";
import { CreatePetUseCase } from "./createPet";
import { CreateOrgUseCase } from "./createORG";
import { Org, Pet } from "@prisma/client";
import exp from "constants";
import { GetPetsForAdoptionUseCase } from "./getPetsForAdoption";

let petRepository: InMemoryPetsRepository
let orgRepository: InMemoryORGRepository
let createOrgUseCase: CreateOrgUseCase
let createPet: CreatePetUseCase
let sut: GetPetsForAdoptionUseCase

describe('Register Use Case', () => {

    beforeEach(() => {
        orgRepository = new InMemoryORGRepository()
        petRepository = new InMemoryPetsRepository(orgRepository)
        createOrgUseCase = new CreateOrgUseCase(orgRepository)
        createPet = new CreatePetUseCase(petRepository)
        sut = new GetPetsForAdoptionUseCase(petRepository)

    })

    it('should be able to get pets for adoption', async () => {
        const org1 = await createOrgUseCase.execute({
            name: 'Org 1',
            email: 'a@a.com',
            whatsapp: '123123123',
            city: 'São Paulo',
            state: 'SP',
            password: '123456',
        })
        const pet = await createPet.execute({
            name: 'Pet 1',
            description: 'Pet 1',
            age: '1',
            size: 'small',
            energy_level: '1',
            org_id: org1.org.id,
            userId: null
            
        })
        const pet2 = await createPet.execute({
            name: 'Pet 2',
            description: 'Pet 2',
            age: '1',
            size: 'small',
            energy_level: '1',
            org_id: org1.org.id,
            userId:org1.org.id
           
        })
        const pets = await sut.execute({city: 'São Paulo'})

        expect(pets.pets).toEqual([pet.pet, pet2.pet])
    })
})
