module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DB_URL: process.env.DB_URL || 'postgresql://col_admin@localhost:5432/cog_offloader',
    JWT_SECRET: process.env.JWT_SECRET || 'offloading-86531'
}