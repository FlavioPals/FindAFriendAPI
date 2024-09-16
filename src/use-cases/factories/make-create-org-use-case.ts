import { PrismaOrgsRepository } from "../../repositories/prisma/prisma-org-repository";
import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository";
import { AuthenticateUseCase } from "../authenticate";
import { CreateOrgUseCase } from "../createORG";

export function makeCreateOrgUseCase() {
    const ORGRepository = new PrismaOrgsRepository()
    const useCase = new CreateOrgUseCase(ORGRepository)
    return useCase
}