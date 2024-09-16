import { PrismaPetsRepository } from "../../repositories/prisma/prisma-pets-repository";
import { GetPetsByCityUseCase } from "../getPets";

export function makeGetPetsUseCase() {
    const petsRepository = new PrismaPetsRepository()
    const useCase = new GetPetsByCityUseCase(petsRepository)
    return useCase
}