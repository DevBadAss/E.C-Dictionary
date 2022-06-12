/**
 * @class Router A mini SPA router module for hash urls.
 */
class Router {
    /** 
     * @param {Object} app MVC app
     */
    constructor(app) {
        this.app = app;
        this.ROUTES = [];
        this.hashChange = this.hashChange.bind(this);
        window.addEventListener("hashChange", this.hashChange);
        window.addEventListener("DOMContentLoaded", this.hashChange);
    }

    /**
     * Adds Route.
     * @param {String} view page
     * @param {String} url route
     * @returns false
     */
    addRoute(view, url) {
        this.ROUTES.push({ view, url });
        this.hashChange();
        window.onpopstate = () => {
            window.location.reload();
        }
        return false;
    }


    /**
     * Monitors hashchange and load routes views respectively.
     */
    hashChange() {
        const { hash } = window.location;
        this.ROUTES.map(route => {
            if (route.url === hash) {
                this.app.RenderView(route.view);
                return true;
            }
        });
    }

    /**
     * Loads Route
     * @param {String} path route to load.
     */
    get(path) {
        window.location.hash = path;
    }
}

export default Router;