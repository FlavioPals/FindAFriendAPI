import { Org, Prisma } from "@prisma/client";

export interface ORGRepository {
    create(data:Prisma.OrgCreateInput): Promise<Org>
}