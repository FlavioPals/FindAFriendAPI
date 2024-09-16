import { Org, Pet, User } from "@prisma/client"
import { PetsRepository } from "../repositories/pets-repository"

interface CreatePetUseCaseRequest{
    name: string | null | undefined;
    description: string | null | undefined;
    age: string | null | undefined;
    size: string;
    energy_level: string | null | undefined;
    org_id: string;
    userId?: string | null | undefined;
}
interface CreatePetUseCaseResponse{
    pet:Pet
}

export class CreatePetUseCase {
    constructor(private PetsRepository: PetsRepository){}

    async execute({
        name, description, age, size, energy_level, org_id, userId
        }: CreatePetUseCaseRequest):Promise<CreatePetUseCaseResponse>{

     const pet = await this.PetsRepository.create({
            name,
            description,
            age,
            size,
            energy_level,
            org_id,
            userId
        })

        return {pet}
    }
}
