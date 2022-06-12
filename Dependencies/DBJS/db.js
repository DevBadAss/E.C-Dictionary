/**
 *A LightWeight library for creating, reading, storing and deleting a database on the client side without any server side dependencies.
 */
class DB {
    /**
     * 
     * @param {String} name name of database.
     * @param {Object} param
     * @param {String} param.type database type i.e session or local.
     * @returns database name.
     */
    constructor(name, { type }) {
        const Data = encodeURIComponent(JSON.stringify({}));
        this.dbName = name;
        this.type = type;
        if (this.type === "local") {
            if (window.localStorage.getItem(name)) {
                return this.dbName;
            } else {
                const Db = window.localStorage.setItem(this.dbName, Data);
            }
        }
        if (this.type === "session") {
            if (window.sessionStorage.getItem(name)) {
                return this.dbName;
            } else {
                const Db = window.sessionStorage.setItem(this.dbName, Data);
            }
        }
        return this.dbName;
    }

    /**
     * Gets and returns the database and it's data
     * @returns The database and it's contents.
     */

    getDb() {
        if (this.type === "local") {
            this.db = decodeURIComponent(window.localStorage.getItem(this.dbName));
        }
        if (this.type === "session") {
            this.db = decodeURIComponent(window.sessionStorage.getItem(this.dbName));
        }
        return JSON.parse(this.db)
    }

    /**
     * 
     * @param {String} key query key
     * @returns the queried data.
     */

    query(key) {
        const data = this.getDb();
        return data[key];
    }

    /**
     * Inserts data into the database.
     * @param {Object} data data to be inserted.
     */
    insert(data) {
        const Data = this.getDb();
        const newdata = {
            ...Data,
            ...data
        }
        const update = encodeURIComponent(JSON.stringify(newdata));
        if (this.type === "local") {
            window.localStorage.setItem(this.dbName, update);
        }
        if (this.type === "session") {
            window.sessionStorage.setItem(this.dbName, update);
        }
    }
}

export default DB;