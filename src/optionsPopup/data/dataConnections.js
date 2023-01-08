import extEventer from './eventer'

const getDomainsAllowed = async function() {
    const domainList = await extEventer.sendMessageToContentScript({
		action: 'DomainsAllowed'
	})
    if (domainList) {
        return ( new Set(domainList) )
    } else {
        console.error('invalid domain list returned')
        return ( new Set() )
    }
}

const getDomainsBlocked = async function() {
    const domainList = await extEventer.sendMessageToContentScript({
		action: 'DomainsBlocked'
	})
    if (domainList) {
        return ( new Set(domainList) )
    } else {
        console.error('invalid domain list returned')
        return ( new Set() )
    }
}

const setDomainAllowed = async function(pageDomain, domains) {
    const domainChanges = extEventer.sendMessageToBackgroundScript({
		action: 'DomainAllowed',
		value: {
			domain: domains,
			pageDomain: pageDomain,
		}
	})
    extEventer.sendMessageToContentScript({action: 'Reload'})

	return await domainChanges
}

const setDomainBlocked = async function(pageDomain, domains) {
    const domainChanges = extEventer.sendMessageToBackgroundScript({
		action: 'DomainBlocked',
		value: {
			domain: domains,
			pageDomain: pageDomain,
		}
	})
    extEventer.sendMessageToContentScript({action: 'Reload'})

	return await domainChanges
}

const getPageDomain = async function() {
    const pageDomain = await extEventer.sendMessageToContentScript({
		action: 'GetLocation'
	})
	return pageDomain
}

export {
	getDomainsAllowed,
	getDomainsBlocked,
	getPageDomain,
	setDomainAllowed,
	setDomainBlocked,
}
