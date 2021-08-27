
const currentTab = {active: true, currentWindow: true}
const sendMessageToActiveTab = (msg, cb) => {
    chrome.tabs.query(currentTab, function(tabs) {
        if (tabs && tabs[0]) {
            const activeTab = tabs[0].id
            chrome.tabs.sendMessage(activeTab, msg, cb)
        }
    });
}

const getDomainsAllowed = async function() {
    return new Promise(function(resolve, reject) {
        sendMessageToActiveTab(
            { action: 'DomainsAllowed' },
            (domainList) => {
                if (domainList) {
                    resolve(new Set(domainList))
                } else {
                    console.error('invalid domain list returned')
                    resolve(new Set())
                }
            }
        )
    })
}

const getDomainsBlocked = async function() {
    return new Promise(function(resolve, reject) {
        sendMessageToActiveTab(
            { action: 'DomainsBlocked' },
            (domainList) => {
                if (domainList) {
                    resolve(new Set(domainList))
                } else {
                    console.error('invalid domain list returned')
                    resolve(new Set())
                }
            }
        )
    })
}

export { getDomainsAllowed, getDomainsBlocked }
