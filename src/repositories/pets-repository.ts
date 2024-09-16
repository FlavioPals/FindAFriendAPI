import { Pet, Prisma } from "@prisma/client";
export interface FindMany {
    city: string
    age?: string;
    size?: string;
    energy_level?: string;
}

export interface PetsRepository {
    create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
    findManyPets(findMany:FindMany): Promise<Pet[]| null>
}