import UI from "../UI.js";

// const home = new UI("<h2>This is UI-JS</h2>", { options: "application/x-httpd-php" });
// const home = new UI("<h2>This is UI-JS</h2>", { options: "application/php" });

// window.open(home.file)
const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    document.body.innerHTML = this.response
}
xhr.responseType = "text"
xhr.open("GET", home.file, true);
xhr.send()