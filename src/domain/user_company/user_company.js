
class User_Company {
    constructor(connection) {
        this.connection = connection;
    }

    async insertNewRelation(userId, companyId, role) {

        let validate = Joi.validate({ userId, companyId, role }, {
            userId: Joi.string().required(),
            companyId: Joi.string().required(),
            role: Joi.string()
        });

        if (validate.error) {
            return [null, validate.error];
        }

        if (!role) role = 'member';
        let error = null;

        const rowsFields = await this.connection.query('INSERT INTO user_company(userId, companyId, role) VALUES(?,?,?)',
            [userId, companyId, role]).catch((err) => {
                error = err;
            });

        if (error) return [null, error];
        const [rows, fields] = rowsFields;
        return [rows[0], error];
    }

    async checkCreateJobPermission(userId, companyId){
        let validate = Joi.validate({ userId, companyId }, {
            userId: Joi.string().required(),
            companyId: Joi.string().required()
        });

        if (validate.error) {
            return [null, validate.error];
        }

        let error = null;

        const rowsFields = await this.connection.query('SELECT * FROM user_company where user_id = ? and company_id = ?',
            [userId, companyId]).catch((err) => {
                error = err;
            });

        if (error) return [null, error];
        const [rows, fields] = rowsFields;
        return [rows[0], error];
    }

}