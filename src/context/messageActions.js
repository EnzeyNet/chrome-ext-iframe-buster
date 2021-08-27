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

const noop = () => {}
export const getAction = (actionName) => {
    const action = actionsMap.get(actionName)
    if (action) {
        return action
    }
    return noop
}
