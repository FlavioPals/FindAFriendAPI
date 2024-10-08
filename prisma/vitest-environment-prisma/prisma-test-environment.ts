import 'dotenv/config'
import { randomUUID } from "crypto";
import { Environment } from "vitest";
import { execSync } from 'child_process';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

function generateDatebaseUrl(schema: string) {
    if(!process.env.DATABASE_URL) {
        throw new Error('DATABASE_URL env variable is not defined')
    }
    const url = new URL(process.env.DATABASE_URL)
    url.searchParams.set('schema', schema)

    return url.toString()
}

export default <Environment> {
    name: 'prisma',
    async setup() {
      const schema = randomUUID()
      const databaseURL = generateDatebaseUrl(schema)
      process.env.DATABASE_URL = databaseURL

      execSync(`npx prisma migrate deploy`)



       return {
      async  teardown() {
            await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`)
        }
       }
    }
} 