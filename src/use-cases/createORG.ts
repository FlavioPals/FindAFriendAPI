import { hash } from "bcryptjs"
import { UsersRepository } from "../repositories/users-repository"
import { UserAlreadyExistsError } from "../errors/user-already-exists"
import { Org, Pet, User } from "@prisma/client"
import { ORGRepository } from "../repositories/ORGRepository"
import { OrgAlreadyExistsError } from "../errors/org-already-exists"

interface CreateOrgUseCaseRequest{
    name: string;
    email: string;
    whatsapp: string;
    password: string;
    state: string;
    city: string;
    pets?: Pet[]
}
interface CreateOrgUseCaseResponse{
    org:Org
}

export class CreateOrgUseCase {
    constructor(private ORGRepository: ORGRepository){}

    async execute({
        name, email, whatsapp, password, state, city
        }: CreateOrgUseCaseRequest):Promise<CreateOrgUseCaseResponse>{

        const password_hash = await hash(password, 2)
        const ORGWithSameEmail = await this.ORGRepository.findByEmail(email)
        if(ORGWithSameEmail){
            throw new OrgAlreadyExistsError()
            }
     const org = await this.ORGRepository.create({
            name,
            email,
            password:password_hash,
            whatsapp,
            state,
            city
        })

        return {org}
    }
}
