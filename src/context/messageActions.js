import {
    domainsAllowed,
    domainsBlocked,
} from './domainStore'

const actionsMap = new Map()

actionsMap.set('DomainsAllowed', (sendResponse) => {
    const data = Array.from(domainsAllowed)
    sendResponse(data)
})

actionsMap.set('DomainsBlocked', (sendResponse) => {
    const data = Array.from(domainsBlocked)
    sendResponse(data)
})

actionsMap.set('GetLocation', (sendResponse) => {
	sendResponse(window.location.hostname)
})

actionsMap.set('Reload', (sendResponse) => {
	sendResponse()
    window.location.reload()
})

export default actionsMap
