
class Eventer {
    #actionsMap = new Map()
    #noop = () => {}

	isSupported() { return false; }

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

const createAPI = () => {
	const impls = [
		eventerChrome,
		eventerEdge,
		eventerFirefox,
		eventerOpera,
	].filter(impl => impl.isSupported());

	const ValidImpl = impls[0];
	return ValidImpl;
}

export default Eventer
