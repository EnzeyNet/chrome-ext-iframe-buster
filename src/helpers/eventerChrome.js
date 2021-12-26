import Eventer from './eventer'

const rejectAfterDelay = (rejectFn) => {
    const delay = 1000/*ms*/ * 1/*seconds*/
    setTimeout(delay, () => {
        rejectFn()
    })
}

class ChromeEventer extends Eventer {
    constructor() {
        super()
    }

    enableActionsListener() {
        chrome.runtime.onMessage.addListener(async (msg, sender, sendResponse) => {
            const action = this.getAction(msg.action)
            action(sendResponse)
        })
    }

    async sendMessageToContentScript(message) {
        // Auto reject after 2 seconds
        return new Promise(function(resolve, reject) {
            //rejectAfterDelay(reject)
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                if (tabs && tabs[0] && tabs[0].id) {
                    chrome.tabs.sendMessage(tabs[0].id, message, (res) => {
                        console.error(res)
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
                console.error(res)
                resolve(res)
            });
        })
    }

}

export default ChromeEventer