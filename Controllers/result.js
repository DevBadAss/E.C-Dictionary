import { router } from "../app/index.js";
import DB from "../Dependencies/DBJS/db.js";
import Render from "../Dependencies/ReqJS/Render.js";
import Request from "../Dependencies/ReqJS/Request.js";
import Routes from "./routes.js";

export default function getResult() {
    const search_words = new DB("Search", { type: "session" });
    const word = search_words.query("word");
    const endpoint = "../DictionaryFiles/" + word + ".json";
    const WordRequest = new Request({ url: endpoint, method: "GET", res: "json", type: "application/json", data: null });
    WordRequest.pull(res => {
        const search_result = new DB("Search-Result", { type: "session" });
        const result = search_result.insert({ result: res });
    });
}

function GoBack() {
    router.get(Routes["home"]);
}

function Definition(data, number) {
    const list = document.querySelector(".def-list");
    const defs = document.createElement("LI");
    const def_num = document.createElement("SPAN");
    defs.className = "meaning-sub--definition";
    defs.innerText = data.definition;
    def_num.className = "number";
    def_num.innerHTML = number + ". ";
    defs.insertAdjacentElement("afterbegin", def_num);
    list.append(defs);
    return list;
}

function Synonyms(data) {
    for (let s = 0; s < data.length; s++) {
        const list = document.querySelector(".syn-list");
        const synonyms = document.createElement("LI");
        synonyms.className = "synonyms";
        synonyms.innerText = data[s] || "";
        list.append(synonyms);
        if (s === data.length) {
            break;
        }
        return list;
    }
}

function Antonyms(data) {
    for (let a = 0; a < data.length; a++) {
        const list = document.querySelector(".ant-list");
        const antonyms = document.createElement("LI");
        antonyms.className = "antonyms";
        antonyms.innerText = data[a] || "";
        list.append(antonyms);
        if (a === data.length) {
            break;
        }
        return list;
    }
}

function Meanings(view, result) {
    Render("meanings", view.data.meanings, {
        datatype: "text",
        id: 0,
        resolve: () => {
            result.map(data => {
                document.querySelector(".word-result--phonetics").innerHTML = data.phonetic || "";
                data.meanings.map(subs => {
                    Render("meaning-sub", view.data.meaning, {
                        datatype: "text",
                        id: 0,
                        resolve: () => {
                            document.querySelector(".part").innerHTML = subs.partOfSpeech;
                            document.querySelector(".syn_number").innerHTML = subs.synonyms.length;
                            Synonyms(subs.synonyms);
                            document.querySelector(".ant_number").innerHTML = subs.antonyms.length;
                            Antonyms(subs.antonyms);
                            for (let i = 0; i < subs.definitions.length; i++) {
                                Definition(subs.definitions[i], i + 1);
                                document.querySelector(".definition_number").innerHTML = subs.definitions.length;
                            }
                        }
                    }, false)

                });
            });
        }
    }, false);
}

export function showResult(view) {
    const search_result = new DB("Search-Result", { type: "session" });
    const result = search_result.query("result");
    const search_words = new DB("Search", { type: "session" });
    const word = search_words.query("word");

    document.querySelector(".back").addEventListener("click", () => {
        GoBack();
    });
    document.querySelector("#back").addEventListener("click", () => {
        GoBack();
    });

    document.querySelector(".word").innerHTML = word;


    Meanings(view, result)


}