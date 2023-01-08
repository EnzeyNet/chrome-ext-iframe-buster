import allowedDomains from './allowedDomainsStore'

const actionsMap = new Map()

actionsMap.set('DomainBlocked', (sendResponse, data) => {
    sendResponse(allowedDomains.remove(data.pageDomain, data.domain))
})

actionsMap.set('DomainAllowed', (sendResponse, data) => {
    sendResponse(allowedDomains.add(data.pageDomain, data.domain))
})

actionsMap.set('DomainsAllowedHere', (sendResponse, pageDomain) => {
    sendResponse(allowedDomains.list(pageDomain))
})

export default actionsMap
