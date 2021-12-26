
class Eventer {
    #actionsMap = new Map()
    #noop = () => {}

    addAction(eventName, action) {
        this.#actionsMap.set(eventName, action)
    }

    removeAction(eventName) {
        this.#actionsMap.delete(eventName)
    }

    getAction(actionName) {
        const action = this.#actionsMap.get(actionName)
        if (action) {
            return action
        }
        return this.#noop
    }

    async sendMessageToContentScript(message, callback) {}
    async sendMessageToBackgroundScript(message, callback) {}

}

export default Eventer
