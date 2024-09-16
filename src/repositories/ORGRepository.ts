import { Org, Pet, Prisma } from "@prisma/client";

export interface ORGRepository {
    create(data:Prisma.OrgCreateInput): Promise<Org>
    findByEmail(email:string): Promise<Prisma.OrgCreateInput | null>
}