import DB from "./db.js";
import SQL from "../sql.js";

const data = new SQL("tests");

console.log(data.create("first", { schema: "user varchar(255)" }))
console.log(data.insertIn("first", "'2', '23', '40'", { options: "user" }));
console.log(data.insert("first", "'2', '23', '40'"));
console.log(data.query("first", { options: "DISTINCT user" }))
console.log(data.querywhere("first", { options: "DISTINCT user", condition: "user='john'" }))
console.log(data.update("first", { options: "user='uthman'" }))
console.log(data.delete("first"))
console.log(data.updatewhere("first", { options: "user='uthman'", condition: "user='john'" }))
console.log(data.deletewhere("first", { condition: "user='john'" }))
console.log(data.alter("first", { options: "users text" }))
console.log(data.drop("first"))
console.log(data.dropDB())


// const local = new DB("using", { type: "session" });
// const name = {
//     "use": "Olawoore Emmanuel"
// }
// const school = {
//     "school": "Obafemi Awolowo University"
// }
// const academics = {
//         "Faculty": "Environmental Design and Management",
//         "Department": "Quantity Surveying",
//         "Course": "Quantity Surveying",
//         "Grades": {
//             "QTS311": "70A",
//             "BLD301": "90A",
//             "QTS317": "60B",
//             "BLD3307": "50C"
//         },
//         "CGPA": "3.72",
//         "Parts Done": ["Part 1", "Part 2", "Part 3"]
//     }
//     // local.insert(name);
// local.insert(school);
// // local.insert(academics);
// console.log(local.getDb())
//     // console.log(local.query("CGPA"));