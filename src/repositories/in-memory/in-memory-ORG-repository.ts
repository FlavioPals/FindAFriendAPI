import { Prisma, Org, Pet } from "@prisma/client";
import { ORGRepository } from "../ORGRepository";
import { randomUUID } from "crypto";

export class InMemoryORGRepository implements ORGRepository{
    public items:Org[] = []
   async create(data: Prisma.OrgCreateInput): Promise<Org> {
        const org = {
            id: randomUUID(),
            name: data.name,
            email: data.email,
            password: data.password,
            state: data.state,
            city: data.city,
            whatsapp: data.whatsapp,
            pets: data.pets,
        }
        this.items.push(org)
        
        return org
    }
    async findByEmail(email: string): Promise<Prisma.OrgCreateInput | null> {
        const org = this.items.find((item) => item.email === email)
        if(!org){
            return null
        }
        return org
    }
}

