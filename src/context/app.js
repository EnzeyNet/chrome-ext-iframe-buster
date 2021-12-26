import { domainsAllowed, domainsBlocked } from './domainStore'
import {
   replaceIFrame,
   reinstateIFrame,
   getIFrameSrc,
} from './iframeHijackHelper'

import extEventer from './eventer'

const purgeIFramesOfDisallowedDomains = async function(htmlNode) {
    if (htmlNode instanceof HTMLIFrameElement) {
        const iframeSrcDomain = getIFrameSrc(htmlNode)
        if (!iframeSrcDomain) {
            htmlNode.remove()
        } else if (iframeSrcDomain) {
            replaceIFrame(htmlNode)
            if (domainsBlocked.has(iframeSrcDomain)) {
                // Leave iFrame purged
            } else if (domainsAllowed.has(iframeSrcDomain)) {
                reinstateIFrame(htmlNode)
            } else {
                console.error(iframeSrcDomain)
                const isAllowed = await extEventer.sendMessageToBackgroundScript({
                    value: iframeSrcDomain,
                    action: 'isDomainAllowed'
                })
                if (isAllowed) {
                    domainsAllowed.add(iframeSrcDomain)
                    reinstateIFrame(htmlNode)
                } else {
                    domainsBlocked.add(iframeSrcDomain)
                }
            }
        }
    }
}

// Options for the observer (which mutations to observe)
var config = { attributes: false, childList: true, subtree: true };
var callback = function(mutationsList, observer) {
    for (var mutation of mutationsList) {
        if (mutation.type == 'childList' && mutation.addedNodes.length) {
			for (var node of mutation.addedNodes) {
                purgeIFramesOfDisallowedDomains(node)
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

// Create an observer instance linked to the callback function
var observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(window.document, config);

/*
    All IFrames are initially removed from the document.
    This is to ensure they do not load anything until the
    async service confirms the domain is trusted.
*/
removeFrames();
