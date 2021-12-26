import extEventer from './eventer'

const getDomainsAllowed = async function() {
    const domainList = await extEventer.sendMessageToContentScript({ action: 'DomainsAllowed' })
    if (domainList) {
        return (new Set(domainList))
    } else {
        console.error('invalid domain list returned')
        return (new Set())
    }
}

const getDomainsBlocked = async function() {
    const domainList = await extEventer.sendMessageToContentScript({ action: 'DomainsBlocked' })
    if (domainList) {
        return (new Set(domainList))
    } else {
        console.error(domainList)
        console.error('invalid domain list returned')
        return (new Set())
    }
}

export { getDomainsAllowed, getDomainsBlocked }
