import Request from "../Dependencies/ReqJS/Request.js";
import JSON_STORE from "../Dependencies/JSON-STORE/json.store.js";
import DB from "../Dependencies/DBJS/db.js";
import SQL from "../Dependencies/DBJS/sql.js";
import { router } from "../app/index.js";
import Routes from "./routes.js";

function Search(word) {
    // const endpoint = "https://api.dictionaryapi.dev/api/v2/entries/en/<wor;
    const endpoint = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const WordRequest = new Request({ url: endpoint, method: "GET", res: "text", type: "application/json", data: null });
    WordRequest.pull((data) => {
        const res = JSON.parse(WordRequest.decipher(data, { options: "string" }));
        if (res.title === "No Definitions Found") {
            confirm("No Definitions Found");
        } else {
            const Result = WordRequest.decipher(data, { options: "string" });
            const ResultFile = new JSON_STORE(word + ".json", "../../DictionaryFiles/", "../Dependencies/JSON-STORE/");
            ResultFile.addContent(Result, res => {
                if (res === "SUCCESS") {
                    const search_words = new DB("Search", { type: "session" });
                    search_words.insert({ word: word });
                    const history = new SQL("../../History/History");
                    const command = {
                        db: history.dbName,
                        command: history.insertIn("History", `'${word}'`, { options: "Words" })
                    }
                    const historyRequest = new Request({ url: "https://e-c-dictionary.herokuapp.com/Dependencies/DB-API/run.php", method: "POST", res: "text", type: "text/plain", data: command });
                    historyRequest.push(resp => {
                        document.querySelector(".dictionary").innerHTML = `    <center>
                                                                                    <div class="loader fas fa-spin"></div>
                                                                                </center>`;
                        const status = {
                            ...JSON.parse(historyRequest.decipher(resp, { options: "string" }))
                        }
                        if (status.result === "SUCCESS") {
                            router.get(Routes["result"]);
                            return true;
                        }
                    });
                }
            });
        }

    });
}

export default function SearchWord() {
    const word = document.querySelector(".search");
    word.addEventListener("keyup", e => {
        if (e.key === "Enter") {
            Search(word.value);
            return false;
        }
    });
}

export function getHistory() {
    const history = new SQL("../../History/History");
    const command = {
        db: history.dbName,
        query: history.query("History", { options: "DISTINCT *" })
    }
    const historyRequest = new Request({ url: "https://e-c-dictionary.herokuapp.com/Dependencies/DB-API/query.php", method: "POST", res: "text", type: "text/plain", data: command });
    historyRequest.push(res => {
        const response = JSON.parse(historyRequest.decipher(res, { options: "object" }));
        const data = [];
        response.result.map(words => {
            data.push(words.Words);
            const sessionHistory = new DB("Search-History", { type: "session" });
            const HIST = {
                history: []
            }
            HIST.history.push(data)
            for (let i = 0; i < data.length; i++) {
                HIST[data[i]] = data[i];
            }
            sessionHistory.insert(HIST);
            stop();
        });
    });
}

export function showHistory() {
    const sessionHistory = new DB("Search-History", { type: "session" });

    const history = sessionHistory.query("history");
    if (history !== null) {
        for (let i = 0; i < history.length; i++) {
            if (history[i] !== null) {
                for (let o = 0; o < history[i].length; o++) {
                    const RECENT = document.createElement("SPAN");
                    RECENT.className = "recent-word";
                    RECENT.innerHTML = sessionHistory.query(history[i][o]);
                    document.querySelector(".home--app-history-words").append(RECENT);
                    RECENT.addEventListener("click", () => {
                        const search_words = new DB("Search", { type: "session" });
                        search_words.insert({ word: RECENT.innerHTML });
                        document.querySelector(".dictionary").innerHTML = `    <center>
                                                                            <div class="loader fas fa-spin"></div>
                                                                        </center>`;
                        router.get(Routes["result"]);
                    });
                }
            }
        }
    }
}
