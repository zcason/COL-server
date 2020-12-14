require('dotenv').config();

module.exports = {
    "migrationsDirectory": "migrations",
    "driver": "pg",
    "connectionString": (process.env.NODE_ENV === 'production')
        ? process.env.PRODUCTION_DATABASE_URL
        : process.env.DATABASE_URL,
    "ssl": true,
}