import sql from "mssql"

const handleLoginStaff = async (username, password) => {
    try {
        const user = await global.pool.request()
            .input('staff_name', sql.NVarChar, username)
            .input('staff_password', sql.VarChar, password)
            .execute('getStaffByUsernameAndPassword')

        return user
    } catch (error) {
        return {
            message: 'Lỗi server!',
            code: '-1',
        }
    }
}

module.exports = {
    handleLoginStaff
}