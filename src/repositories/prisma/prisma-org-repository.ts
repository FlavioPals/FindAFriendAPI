import { Org, Prisma } from "@prisma/client";
import { ORGRepository } from "../ORGRepository";
import { prisma } from "../../lib/prisma";

export class PrismaOrgsRepository implements ORGRepository {
   async create(data: Prisma.OrgCreateInput): Promise<Org> {
        const org = await prisma.org.create({
            data
        })
        return org
    }
   async findByEmail(email: string): Promise<Prisma.OrgCreateInput | null> {
        const org = await prisma.org.findUnique({
            where: {
                email: email
            }
        })

        return org
    }

}