import { getAction } from './messageActions'

chrome.runtime.onMessage.addListener(async function(msg, sender, sendResponse) {
    const action = getAction(msg.action)
    action(sendResponse, msg.value)
})
