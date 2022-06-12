import Request from "./ReqJS/Request.js";
import Sql from "./DBJS/sql.js";

const db = new Sql("test");

// const command = {
//         db: db.dbName,
//         command: db.delete("user")
//     }
// const command = {
//     db: db.dbName,
//     query: db.query("user", { options: "*" })
// }

const req = new Request({ url: "run.php", method: "POST", res: "text", type: "text/plain", data: command });
req.push((response) => {
    console.log(decodeURIComponent(response))
    console.log(response)
});