import { Pet } from "@prisma/client"
import { PetsRepository } from "../repositories/pets-repository"

interface GetPetsByCityUseCaseRequest{
    city: string
    age?: string;
    size?: string;
    energy_level?: string;
}
interface GetPetsByCityUseCaseResponse {
    pets: Pet[] | null
}

export class GetPetsByCityUseCase {
    constructor(private petsRepository: PetsRepository){}
    async execute(params: GetPetsByCityUseCaseRequest): Promise<GetPetsByCityUseCaseResponse> {
        const pets = await this.petsRepository.findManyPets(params)
        return {pets}
    }
}