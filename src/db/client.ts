import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

// Use pooled connection for server-side queries
const connectionString = process.env.DATABASE_URL_POOLED ?? process.env.DATABASE_URL!

const client = postgres(connectionString, { max: 10 })
export const db = drizzle(client, { schema })
