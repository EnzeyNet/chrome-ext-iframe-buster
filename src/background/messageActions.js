import allowedDomains from './allowedDomainsStore'

const actionsMap = new Map()

actionsMap.set('isDomainAllowed', (sendResponse, domainName) => {
    sendResponse(allowedDomains.has(domainName))
})

actionsMap.set('DomainBlock', (sendResponse, domainName) => {
    sendResponse(allowedDomains.delete(domainName))
})

actionsMap.set('DomainUnblock', (sendResponse, domainName) => {
    sendResponse(allowedDomains.add(domainName))
})

export default actionsMap
