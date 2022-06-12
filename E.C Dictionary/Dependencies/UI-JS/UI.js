/**
 * @class UI generates client memory files.
 */
class UI {
    constructor(UI, { options }) {
        this.view = new Blob([UI], { type: options });
    }

    /**
     * generates link to the file.
     */
    get file() {
        return self.URL.createObjectURL(this.view)
    }
}

export default UI;