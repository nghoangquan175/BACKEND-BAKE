import 'dotenv/config'

const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    server: 'LAPTOP-JI4A2VU3\\SQLEXPRESS01',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: false, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
}

const connectDB = async (sql) => {
    try {
        // await sql.connect(sqlConfig)

        const pool = new sql.ConnectionPool(sqlConfig);
        const poolConnect = pool.connect();
        await poolConnect;
        console.log("Connect Successfully!!!")
        return pool;
    } catch (err) {
        console.log("Connect Failure!!!", err)
        process.exit(1)
    }
}

export default connectDB