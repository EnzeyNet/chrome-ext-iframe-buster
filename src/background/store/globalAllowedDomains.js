import extEventer from '../eventer'

const subdomainsAllowedByPageDomain = new Set()
const DATA_KEY = 'AllowedSubdomains'

const isString = function(domain) {
	return typeof domain === 'string'
}

async function pullDataFromStorage() {
	const data = await extEventer.getStoredData(DATA_KEY)

	subdomainsAllowedByPageDomain.clear()
	 for (let [key, val] of Object.entries(data)) {
		 subdomainsAllowedByPageDomain.add(key)
	 }
}

async function updateStorage () {
	const basicData = {}
	for (let [key, value] of domainsAllowedByPageDomain.entries()) {
		basicData[key] = true
	}

	return await extEventer.setStoredData(DATA_KEY, basicData)
}

pullDataFromStorage()


const store = {
    add(pageDomain, domains) {
		if (!domains || !pageDomain) return

		if (!domains.length) {
			domains = [domains]
		}
		domains = domains.filter(d => typeof d === 'string')

		let allowedDomains = domainsAllowedByPageDomain.get(pageDomain)
		if (!allowedDomains) {
			allowedDomains = new Set()
			domainsAllowedByPageDomain.set(pageDomain, allowedDomains)
		}
		domains.forEach(d => allowedDomains.add(d))

        updateStorage()
    },
    remove(pageDomain, domains) {
		if (!domains || !pageDomain) return

		if (!domains.length) {
			domains = [domains]
		}
		domains = domains.filter(d => typeof d === 'string')

		let allowedDomains = domainsAllowedByPageDomain.get(pageDomain)
		if (allowedDomains) {
			domains.forEach(d => allowedDomains.delete(d))

			if (!allowedDomains.size) {
				domainsAllowedByPageDomain.delete(pageDomain)
			}

	        updateStorage()
		}
    },
    list(pageDomain) {
		if (!pageDomain) return []

		let allowedDomains = domainsAllowedByPageDomain.get(pageDomain)
		if (!allowedDomains) {
			allowedDomains = new Set()
		}
		return Array.from(allowedDomains)
	}
}

export default store
