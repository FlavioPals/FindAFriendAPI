import { Prisma, Org, Pet } from "@prisma/client";
import { ORGRepository } from "../ORGRepository";
import { FindMany, PetsRepository } from "../pets-repository";
import { randomUUID } from "crypto";
import { InMemoryORGRepository } from "./in-memory-ORG-repository";
import { number } from "zod";

export class InMemoryPetsRepository implements PetsRepository{
    constructor(private OrgsRepository:InMemoryORGRepository){}
    public items:Pet[] = []

    async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
        const pet = {
            id: randomUUID(),
            name: data.name,
            description: data.description,
            age: data.age,
            size: data.size,
            energy_level: data.energy_level,
            org_id: data.org_id,
            userId: data.userId ? data.userId : null
            
        }
        this.items.push(pet)
        return pet
    }
   async findManyPets(params:FindMany): Promise<Pet[] | null> {
        const orgsByCity = this.OrgsRepository.items.filter((org) => org.city === params.city)
        const pets = this.items
        .filter((item) => orgsByCity.some((org) => org.id === item.org_id))
        .filter((item) => (params.age ? item.age === params.age : true))
        .filter((item) => (params.energy_level ? item.energy_level === params.energy_level : true))
        .filter((item) => (params.size ? item.size === params.size : true))
        
        return pets
    }

   

  
    
}

