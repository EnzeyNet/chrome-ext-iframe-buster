import Eventer from '../EventerClass'

const rejectAfterDelay = (rejectFn) => {
    const delay = 1000/*ms*/ * 1/*seconds*/
    setTimeout(delay, () => {
        rejectFn()
    })
}

class ChromeEventer extends Eventer {
    constructor() {
        super()
		if (!this.isSupported()) {throw 'Chrome APIs not supported'};
    }

	isSupported() {
		return this.isSupportedInContext() || this.isSupportedOutsideContext();
	}
	isSupportedInContext() {
		return !!chrome
			&& !!chrome.runtime
			&& !!chrome.runtime.onMessage
	}
	isSupportedOutsideContext() {
		return !!chrome
			&& !!chrome.tabs
			&& !!chrome.tabs.query
	}

    enableActionsListener() {
        chrome.runtime.onMessage.addListener(async (msg, sender, sendResponse) => {
            const action = this.getAction(msg.action)
            action(sendResponse, msg.value)
        })
    }

    async sendMessageToContentScript(message) {
        // Auto reject after 2 seconds
        return new Promise(function(resolve, reject) {
            //rejectAfterDelay(reject)
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                if (tabs && tabs[0] && tabs[0].id) {
                    chrome.tabs.sendMessage(tabs[0].id, message, (res) => {
                        resolve(res)
                    });
                }
            })
        })
    }

    async sendMessageToBackgroundScript(message) {
        return new Promise(function(resolve, reject) {
            //rejectAfterDelay(reject)
            chrome.runtime.sendMessage(message, (res) => {
                resolve(res)
            });
        })
    }

    async getStoredData(key) {
        return new Promise(function(resolve, reject) {
            //rejectAfterDelay(reject)
			chrome.storage.local.get(key, (rawData) => {
				const data = rawData ? rawData[key] : {}
            });
        })
    }

    async setStoredData(key, data) {
        return new Promise(function(resolve, reject) {
            //rejectAfterDelay(reject)
			const res = chrome.storage.local.set({key: data})
            resolve(res)
        })
    }

}

export default ChromeEventer
