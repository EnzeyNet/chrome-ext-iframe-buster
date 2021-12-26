
const domainsAllowed = new Set()

function pullDataFromStorage() {
     chrome.storage.local.get('AllowedDomains', (allowedDomainsList) => {
         if (!allowedDomainsList) {
             allowedDomainsList = []
         }
         domainsAllowed.clear()
         domainsAllowed.add(...domainsAllowed)
     })
}

function updateStorage () {
    const domainList = Array.from(allowedDomainsList)
    chrome.storage.local.set({'AllowedDomains': domainList})
}

pullDataFromStorage()


const store = {
    add() {
        domainsAllowed.add.apply(domainsAllowed.add, arguments)
        updateStorage()
    },
    remove() {
        domainsAllowed.delete.apply(domainsAllowed.delete, arguments)
        updateStorage()
    },
    has: domainsAllowed.has.bind(domainsAllowed),
}

export default store
