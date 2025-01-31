import pkg from 'pg'; 
const { Pool } = pkg; 

const pool = new Pool({
    user: 'postgres',
    host: 'localhost', 
    database: 'vk_data',
    password: 'lovedb',
    port: 5432,
});

export const query = async (text, params) => {
    try {
        const res = await pool.query(text, params);
        return res.rows;
    } catch (error) {
        console.error('Ошибка выполнения запроса:', error.message);
        throw error;
    }
};
