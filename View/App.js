import UI from "../Dependencies/UI-JS/UI.js";

const splash_screen = new UI(`    <div class="preload">
        <center>
            <div class="preload--app-name">
                <span class="preload--app-name-name">Dictionary</span>
            </div>
        </center>
    </div>`, { type: "text/html" });


const home = new UI(`    <div class="home">
        <div class="home--app-controllers">
            <span class="app-name">Dictionary</span>
            <div class="home--app-controllers-search">
                <i class="fas fa-search" id="search-icon"></i>
                <input type="text" placeholder="search words here..." class="search">
            </div>
        </div>

        <div class="home--app-history">
            <span class="history">Recent</span>
            <div class="home--app-history-words">
            </div>
        </div>`, { type: "text/html" });

const result = new UI(`<div class="result">
        <div class="result--back">
            <i class="fas fa-arrow-left" id="back"></i>
            <span class="back">Search</span>
        </div>
        <div class="word-result">
            <span class="word">Dictionary</span>
            <div class="phonetics">
                <span class="word-result--phonetics">Lorem, ipsum.</span>
            </div>
            <div class="meanings">
            </div>
        </div>
    </div>`, { type: "text/html" });

const meanings = new UI(`<div class="meaning-sub">
                    <!--<span class="definition">DEFINITION</span>
                    <span class="definition_number">5</span>
                    <button class="part">noun</button>
                    <ol class="def-list">
                    </ol>
                    <div class="synonym">
                        <span class="syn">SYNONYMS</span>
                        <span class="syn_number">2</span>
                        <ul class="syn-list">
                        </ul>
                    </div>
                    <div class="antonym">
                        <span class="ant">ANTONYMS</span>
                        <span class="ant_number">2</span>
                        <ul class="ant-list">
                        </ul>
                    </div>-->
                </div>`, { type: "text/html" });


const meaning = new UI(`<span class="definition">DEFINITION</span>
                    <span class="definition_number">5</span>
                    <button class="part">noun</button>
                    <ol class="def-list">
                    </ol>
                    <div class="synonym">
                        <span class="syn">SYNONYMS</span>
                        <span class="syn_number">2</span>
                        <ul class="syn-list">
                        </ul>
                    </div>
                    <div class="antonym">
                        <span class="ant">ANTONYMS</span>
                        <span class="ant_number">2</span>
                        <ul class="ant-list">
                        </ul>
                    </div>`, { type: "text/html" });

const VIEWS = {
    "splash_screen": splash_screen.file,
    "home": home.file,
    "result": result.file,
    "meanings": meanings.file,
    "meaning": meaning.file
}

postMessage(VIEWS);