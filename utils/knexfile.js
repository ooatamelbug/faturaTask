module.exports = {
    development: {
        client: 'pg',
        connection: 'postgree://localhost/faturatask',
        migrations: {
            directory: __dirname + '/databases/migrations'
        },
        seeds: {
            directory: __dirname + '/databases/seeds'
        }
    }
}