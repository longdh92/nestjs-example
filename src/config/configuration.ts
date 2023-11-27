import * as process from 'process';

export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
        url: process.env.DB_URL || 'mongodb://127.0.0.1:27017/test',
    },
});
