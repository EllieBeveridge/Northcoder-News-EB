const ENV = process.env.NODE_ENV || 'development';

const config = {
    development: {
        DB_URL: 'url',
        PORT: 9090
    },
    test: {
        DB_URL: 'url'
    }
}

module.exports = config[ENV];