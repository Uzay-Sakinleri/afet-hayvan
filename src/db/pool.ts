import { Pool } from 'pg'

const pool = new Pool({
    user: 'bolkareren',
    host: 'localhost',
    database: 'afethayvan_test',
    port: 5432,
} 
);

export default pool;