/**
 * @class JSON_STORE A module for creating and uploading a json file to the server.
 */
class JSON_STORE {
    /**
     * @param {String} name name of json file.
     */
    constructor(name, dir, root) {
        this.name = name;
        this.dir = dir;
        this.root = root;
        this.type = "application/json";
    }

    /**
     * Creates json file, add the content and upload to the server.
     * @param {String} content Stringified json object.
     */

    addContent(content, callback) {
        const jsonBlob = new Blob([content], { type: this.type });
        const file = new FormData();
        file.append("file", jsonBlob);
        file.append("name", this.name);
        file.append("dir", this.dir);
        const FileRequest = new XMLHttpRequest();
        FileRequest.open("POST", this.root + "json-store.php", true);
        FileRequest.responseType = "text";
        FileRequest.onreadystatechange = (res) => {
            callback(res.currentTarget.response);
        };
        FileRequest.send(file);
    }
}

export default JSON_STORE;