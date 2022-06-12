/**
 * @class SQL A lightweight library with dynamic stored sql procedures to be used on th client side. These stored procedures can be executed by using http POST requests to communicate with the server.
 */
class SQL {
    /**
     * @param {String} name name of database.
     * @returns database name.
     */
    constructor(name) {
        this.dbName = name;
        return this.dbName;
    }

    /**
     * Returns stored procedure for the table to created.
     * @param {String} table Table to be created.
     * @param {Object} param
     * @param {String} param.schema schema of the table to be created.
     * @returns the encoded stored procedure.
     */
    create(table, { schema }) {
        return encodeURIComponent(`CREATE TABLE ${table}(${schema});`);
    }

    /**
     * Returns stored procedure for the data to be inserted and their respective columns.
     * @param {String} table table to be queried.
     * @param {String} values values to be inserted
     * @param {Object} param
     * @param {String} param.options columns where data are to be inserted.
     * @returns the encoded stored procedure.
     */
    insertIn(table, values, { options }) {
        if (options !== null || options !== "" || options !== undefined) {
            return encodeURIComponent(`INSERT INTO ${table}(${options}) VALUES(${values});`);
        }
    }

    /**
     * Returns stored procedure for the data to be inserted..
     * @param {String} table table to be queried.
     * @param {String} values values to be inserted
     * @returns the encoded stored procedure.
     */
    insert(table, values) {
        return encodeURIComponent(`INSERT INTO ${table} VALUES(${values});`);
    }

    /**
     * Returns stored procedure for the data to be queried and their respective columns.
     * @param {String} table table to be queried.
     * @param {Object} param
     * @param {String} param.options columns to be queried .
     * @returns the encoded stored procedure.
     */

    query(table, { options }) {
        return encodeURIComponent(`SELECT ${options} FROM ${table};`);
    }

    /**
     * Returns stored procedure for the data to be queried where conditions are met.
     * @param {String} table table to be queried.
     * @param {Object} param
     * @param {String} param.options columns to be queried.
     * @param {String} param.condition condition to be met.
     * @returns the encoded stored procedure.
     */
    querywhere(table, { options, condition }) {
        return encodeURIComponent(`SELECT ${options} FROM ${table} WHERE ${condition};`);
    }

    /**
     * Returns stored procedure for the columns to be updated.
     * @param {String} table table to be queried.
     * @param {Object} param
     * @param {String} param.options columns to be updated .
     * @returns the encoded stored procedure.
     */

    update(table, { options }) {
        return encodeURIComponent(`UPDATE ${table} SET ${options};`);
    }

    /**
     * Returns stored procedure for the columns to be updated where conditions are met.
     * @param {String} table table to be queried.
     * @param {Object} param
     * @param {String} param.options columns to be updated.
     * @param {String} param.condition condition to be met.
     * @returns the encoded stored procedure.
     */
    updatewhere(table, { options, condition }) {
        return encodeURIComponent(`UPDATE ${table} SET ${options} WHERE ${condition};`);
    }

    /**
     * Returns stored procedure for the table whose data is to be deleted.
     * @param {String} table table to be queried.
     * @returns the encoded stored procedure.
     */

    delete(table) {
        return encodeURIComponent(`DELETE FROM ${table}`);
    }

    /**
     * Returns stored procedure for the data to be deleted where conditions are met.
     * @param {String} table table to be queried.
     * @param {Object} param
     * @param {String} param.condition condition to be met.
     * @returns the encoded stored procedure.
     */

    deletewhere(table, { condition }) {
        return encodeURIComponent(`DELETE FROM ${table} WHERE ${condition}`);
    }

    /**
     * Returns stored procedure for the table to be altered.
     * @param {String} table table to be queried.
     * @param {Object} param
     * @param {String} param.options columns to be altered and their values e.g user=JohnDoe.
     * @returns the encoded stored procedure.
     */
    alter(table, { options }) {
        return encodeURIComponent(`ALTER TABLE ${table} ADD ${options}`);
    }

    /**
     * Returns stored procedure for database to be dropped (deleted).
     * @returns the encoded stored procedure.
     */
    dropDB() {
        return encodeURIComponent(`DROP DATABASE ${this.dbName}`);
    }

    /**
     * Returns stored procedure for table to be dropped (deleted).
     * @param {String} table table to be dropped.
     * @returns the encoded stored procedure.
     */

    drop(table) {
        return encodeURIComponent(`DROP TABLE ${table}`);
    }
}

export default SQL;