import { PrismaOrgsRepository } from "../../repositories/prisma/prisma-org-repository";
import { PrismaPetsRepository } from "../../repositories/prisma/prisma-pets-repository";
import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository";
import { AuthenticateUseCase } from "../authenticate";
import { CreateOrgUseCase } from "../createORG";
import { CreatePetUseCase } from "../createPet";

export function makeCreatePetUseCase() {
    const PetsRepository = new PrismaPetsRepository()
    const useCase = new CreatePetUseCase(PetsRepository)
    return useCase
}