
const domainsAllowedByPageDomain = new Map();

const isString = function(domain) {
	return typeof domain === 'string'
}

function pullDataFromStorage() {
     chrome.storage.local.get('AllowedDomains', (allowedDomainsByPageDomain) => {
         if (allowedDomainsByPageDomain) {
             allowedDomainsByPageDomain = allowedDomainsByPageDomain['AllowedDomains']
         } else {
			 allowedDomainsByPageDomain  = {}
		 }

		 for (let [pageDomain, allowedDomainsList] of Object.entries(allowedDomainsByPageDomain)) {
			 const allowedDomainsSet = new Set()
			 if (allowedDomainsList) {
				 allowedDomainsList = Array.from(allowedDomainsList)
				 allowedDomainsList = allowedDomainsList.filter(isString)
				 allowedDomainsList.forEach(d => allowedDomainsSet.add(d))

				 domainsAllowedByPageDomain.set(pageDomain, allowedDomainsSet)
			 }
		 }
     })
}

function updateStorage () {
	const basicData = {}
	for (let [pageDomain, allowedDomains] of domainsAllowedByPageDomain.entries()) {
		if (allowedDomains) {
			allowedDomains = Array.from(allowedDomains)
			allowedDomains = allowedDomains.filter(isString)

			basicData[pageDomain] = allowedDomains
		}

	}

    chrome.storage.local.set({'AllowedDomains': basicData})
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
