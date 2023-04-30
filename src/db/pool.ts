import { Pool } from 'pg'
import { loadEnv } from "vite";
const env = loadEnv(import.meta.env.MODE, process.cwd(), "" );

const pool = new Pool({
    user: env.PGUSER,
    host: env.PGHOST,
    database: env.PGDATABASE,
    password: env.PGPASSWORD
} 
);

export default pool;