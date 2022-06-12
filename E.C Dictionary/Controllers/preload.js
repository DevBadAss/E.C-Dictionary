import { router } from "../app/index.js";
import Routes from "./routes.js";

/**
 * Controller Module for App Preloads
 *@param {Number} speed Time frame for preload
 */

export default function Preload(speed) {
    window.setTimeout(() => {
        router.get(Routes["home"]);
    }, speed);
}