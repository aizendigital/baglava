module.exports.truncateDb = async (connection, table) => {

    if (!table) return;
    let error = null;
    const rowsFields = await connection.query('DELETE FROM ??',
        [table]).catch((err) => {
            error = err;
        });
    if (error) return [null, error];
    const [rows, fields] = rowsFields;
    return [rows[0], error];
}

module.exports.withLogin = async (request) => {
    await request(server)
        .post('/login')
        .send({
            email: 'valid',
            password: 'valid_password',
        });
}