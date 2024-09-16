import { Prisma, Pet } from "@prisma/client";
import { FindMany, PetsRepository } from "../pets-repository";
import { prisma } from "../../lib/prisma";

export class PrismaPetsRepository implements PetsRepository {
  async  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
        const pet = await prisma.pet.create({
            data
        })
        return pet
    }
   async findManyPets(findMany: FindMany): Promise<Pet[] | null> {
        const pets = await prisma.pet.findMany({
            where: {
                age: findMany.age,
                size: findMany.size,
                energy_level: findMany.energy_level,
                org: {
                    city: {
                        contains: findMany.city
                    },
                },
            },
        })
        return pets
    }

}
