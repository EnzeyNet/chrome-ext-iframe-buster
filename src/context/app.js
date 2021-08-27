import { domainsAllowed } from './domainStore'
import {
   replaceIFrame,
   reinstateIFrame,
   getIFrameSrc,
} from './iframeHijackHelper'

import { getAction } from './messageActions'

const purgeIFramesOfDisallowedDomains = function(htmlNode) {
    if (htmlNode instanceof HTMLIFrameElement) {
        const iframeSrcDomain = getIFrameSrc(htmlNode)
        if (!iframeSrcDomain) {
            htmlNode.remove()
        } else if (iframeSrcDomain && !domainsAllowed.has(iframeSrcDomain)) {
            chrome.runtime.sendMessage({
                value: iframeSrcDomain,
                action: 'DomainCheck'
            }, (isAllowed) => {
                if (isAllowed) {
                    console.log(htmlNode)
                    reinstateIFrame(htmlNode)
                }
            })

            replaceIFrame(htmlNode)
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

chrome.runtime.onMessage.addListener(async function(msg, sender, sendResponse) {
    const action = getAction(msg.action)
    action(sendResponse)
})

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
