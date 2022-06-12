import { router } from "../app/index.js";
import DB from "../Dependencies/DBJS/db.js";
import Routes from "./routes.js";


export function Load() {
    const IsLoadedUp = new DB("IsLoadedUp", { type: "session" });
    const Loaded = {
        "IsLoaded": "true"
    }
    IsLoadedUp.insert(Loaded);
}

export default function IsLoaded() {
    const IsLoadedUp = new DB("IsLoadedUp", { type: "session" });
    const { hash } = window.location;
    if (IsLoadedUp.query("IsLoaded") !== "true" || IsLoadedUp.query("IsLoaded") === null) {
        router.get(Routes["splash"]);
    }
    if (IsLoadedUp.query("IsLoaded") === "true") {
        router.get(hash);
    }
}