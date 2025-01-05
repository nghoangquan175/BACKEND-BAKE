import 'dotenv/config'

const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    server: '127.0.0.1',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: true, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
}

const connectDB = async (sql) => {
    try {
        await sql.connect(sqlConfig)
        console.log("Connect Successfully!!!")
    } catch (err) {
        console.log("Connect Failure!!!", err)
    }
}

export default connectDB