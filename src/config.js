module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://col_admin@localhost:5432/cog_offloader',
    TEST_DB_URL: process.env.TEST_DB_URL || 'postgresql://col_admin@localhost:5432/cog_offloader-test',
    JWT_SECRET: process.env.JWT_SECRET || 'offloading-86531'
}