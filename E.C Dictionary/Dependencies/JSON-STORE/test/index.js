import JSON_STORE from "../json.store.js";

const json = new JSON_STORE("test.json", "../Test/", "../");

json.addContent(`{"id":"2","name":"Julius"}`, res => {
    console.log(res)
});