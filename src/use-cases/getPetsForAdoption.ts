import { Pet } from "@prisma/client"
import { PetsRepository } from "../repositories/pets-repository"

interface GetPetsByCityUseCaseRequest{
    city: String
    age?: String;
    size?: String;
    energy_level?: String;
}
interface GetPetsByCityUseCaseResponse {
    pets: Pet[] | null
}

export class GetPetsForAdoptionUseCase {
    constructor(private petsRepository: PetsRepository){}
    async execute(params: GetPetsByCityUseCaseRequest): Promise<GetPetsByCityUseCaseResponse> {
        const pets = await this.petsRepository.findManyPets(params)
        return {pets}
    }
}