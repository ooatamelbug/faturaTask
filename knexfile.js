module.exports = {
    development: {
        client: 'pg',
        connection: {
            host: '127.0.0.1',
            user : 'postgres',
            password : 'password',
            database : 'faturatask'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: __dirname + '/databases/migrations'
        },
        seeds: {
            directory: __dirname + '/databases/seeds'
        }
    }
}