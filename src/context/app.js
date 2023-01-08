import {
	domainsAllowed,
	domainsBlocked,
} from './domainStore'

import {
   replaceIFrame,
   reinstateIFrame,
   getIFrameSrc,
} from './iframeHijackHelper'

import extEventer from './eventer'

const pageLoction = window.location.hostname

const storedAllowedDomains = new Set()

const purgeIFramesOfDisallowedDomains = async function(htmlNode) {
    if (htmlNode instanceof HTMLIFrameElement) {
		if (htmlNode.nodeName && htmlNode.nodeName.toUpperCase() === 'IFRAME') {
	        const iframeSrcDomain = getIFrameSrc(htmlNode)
	        if (!iframeSrcDomain) {
	            htmlNode.remove()
	        } else if (iframeSrcDomain) {
	            const isAllowed = storedAllowedDomains.has(iframeSrcDomain)
	            if (isAllowed) {
	                domainsAllowed.add(iframeSrcDomain)
	            } else {
		            replaceIFrame(htmlNode)
	                domainsBlocked.add(iframeSrcDomain)
	            }
	        }
	    }
	}
}

var removeFrames = function() {
	var existingFrames = window.document.querySelectorAll('iframe');
	existingFrames.forEach(node => {
        purgeIFramesOfDisallowedDomains(node)
    });
}


// Options for the observer (which mutations to observe)
var config = { attributes: false, childList: true, subtree: true };
var callback = function(mutationsList, observer) {
	if (mutationsList) {
	    for (var mutation of mutationsList) {
	        if (mutation.type == 'childList' && mutation.addedNodes.length) {
				for (var node of mutation.addedNodes) {
	                purgeIFramesOfDisallowedDomains(node)
				}
	        }
		}
	}
}

// Create an observer instance linked to the callback function
var observer = new MutationObserver(callback);



/*
    All IFrames are initially removed from the document.
    This is to ensure they do not load anything until the
    async service confirms the domain is trusted.
*/
const init = async () => {
	const domains = await extEventer.sendMessageToBackgroundScript({
		action: 'DomainsAllowedHere',
		value: pageLoction,
	})
	if (domains) {
		domains.forEach(d => storedAllowedDomains.add(d))
	}
	removeFrames();

	// Start observing the target node for configured mutations
	observer.observe(window.document, config);
}
init()
