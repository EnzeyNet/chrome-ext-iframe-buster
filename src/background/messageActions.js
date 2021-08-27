
import allowedDomains from './allowedDomainsStore'

const actionsMap = new Map()

actionsMap.set('DomainCheck', (sendResponse, domainName) => {
    sendResponse(allowedDomains.has(domainName))
})

const noop = () => {}
export const getAction = (actionName) => {
    const action = actionsMap.get(actionName)
    if (action) {
        return action
    }
    return noop
}
