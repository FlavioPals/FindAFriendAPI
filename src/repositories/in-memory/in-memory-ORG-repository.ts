import { Prisma, Org } from "@prisma/client";
import { ORGRepository } from "../ORGRepository";

export class InMemoryORGRepository implements ORGRepository{
    public items:Org[] = []
   async create(data: Prisma.OrgCreateInput): Promise<Org> {
        const org = {
            id: 'org-1',
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

}

