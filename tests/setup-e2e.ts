import 'dotenv/config';
import { Prisma, PrismaClient } from "@prisma/client";
import { after } from 'node:test';
import { execSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';

const prisma = new PrismaClient();

function generateUniqueDatabaseId(schemaId: string) {
  if(!process.env.DATABASE_URL) 
    throw new Error('DATABASE_URL is not defined');
  
  const url = new URL(process.env.DATABASE_URL);

  url.searchParams.set('schema', schemaId);

  return url.toString();
}

const schemaId = randomUUID()

beforeAll(async () => {
   const databaseUrl = generateUniqueDatabaseId(schemaId);

   process.env.DATABASE_URL = databaseUrl;

   execSync('pnpm prisma migrate deploy');
})

afterAll(async () => {
   await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`);
   await prisma.$disconnect();
})
