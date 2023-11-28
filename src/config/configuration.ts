import * as process from 'process';
import * as dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
        url: process.env.DB_URL,
    },
});
