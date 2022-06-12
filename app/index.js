import MVC from "../Dependencies/MVC-JS/MVC.js";
import Router from "../Dependencies/MVC-JS/Router.js";
import Render from "../Dependencies/ReqJS/Render.js";
import Routes from "../Controllers/routes.js";
import Preload from "../Controllers/preload.js";
import IsLoaded, { Load } from "../Controllers/IsLoadedUp.js";
import SearchWord, { getHistory, showHistory } from "../Controllers/search.js";
import getResult, { showResult } from "../Controllers/result.js";

const View = new Worker("../View/App.js", { type: "module" });
const app = new MVC("dictionary");
export const router = new Router(app);
IsLoaded();


app.addView({
    name: "splash",
    model: {},
    view(model) {
        View.addEventListener("message", views => {
            Render("dictionary", views.data.splash_screen, {
                datatype: "text",
                id: 0,
                resolve: (res) => {
                    Preload(3000);
                }
            }, true);
        });
        return " ";
    },
    controller(model) {
        Load();
    }
});


app.addView({
    name: "home",
    model: {},
    view(model) {
        View.addEventListener("message", views => {
            Render("dictionary", views.data.home, {
                datatype: "text",
                id: 0,
                resolve: (res) => {
                    SearchWord();
                    showHistory();

                }
            }, true);
        });
        return " ";
    },
    controller(model) {
        Load();
        getHistory();
    }
});


app.addView({
    name: "result",
    model: {},
    view(model) {
        View.addEventListener("message", views => {
            Render("dictionary", views.data.result, {
                datatype: "text",
                id: 0,
                resolve: (res) => {
                    showResult(views)
                }
            }, true);
        });
        return " ";
    },
    controller(model) {
        Load();
        getResult();
    }
});


router.addRoute("splash", Routes["splash"]);
router.addRoute("home", Routes["home"]);
router.addRoute("result", Routes["result"]);