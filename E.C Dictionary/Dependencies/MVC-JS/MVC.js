/**
 * LightWeight MVC Framework
 * @author Olawoore Emmanuel Collins
 */

class MVC {
    /**
     * @param {String} app name of app renderer.
     */
    constructor(app) {
        this.app = document.querySelector("." + app) || document.querySelector("#" + app);
        this.ViewRegistry = {};
    }

    /**
     * Adds View To ViewRegistry
     * @param {Object} param
     * @param {String} param.name View Name
     * @param {Object} param.model View Model
     * @param {Function} param.view View UI
     * @param {Function} param.controller View Controller
     */
    addView({ name, model, view, controller }) {
        this.ViewRegistry[name] = { name: name, model: model, view: view, controller: controller };
        this.ViewRegistry[name].model = this.Proxify(model);
    }

    RenderView(name) {
        this.currentView = this.ViewRegistry[name];
        this.updateView();
        if (this.currentView) {
            this.currentView.controller(this.currentView.model);
            return false;
        }
    }

    /**
     * Updates View
     */

    updateView() {
        if (this.currentView) {
            this.app.innerHTML = this.currentView.view(this.currentView.model);
        }
    }

    /**
     * Monitors changes in View models
     * @param {Object} model currentView model
     */
    Proxify(model) {
        return new Proxy(model, {
            set: (target, property, value) => {
                target[property] = value;
                this.updateView();
                return true;
            }
        });
    }
}

export default MVC;