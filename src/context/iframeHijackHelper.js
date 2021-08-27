import {
    domainsAllowed,
    domainsBlocked,
} from './domainStore'

const iframeToPlaceholder = new Map()

const createPlaceholderElem = () => {
    const elem = document.createElement("div");
    elem.classList.add('iframe-buster-placeholder')

    return elem
}

const replaceIFrame = function(iframe) {
    if (iframe instanceof HTMLIFrameElement) {
        const iframeSrc = getIFrameSrc(iframe)
        if (iframeSrc) {
            domainsBlocked.add( iframeSrc )
        }

        const placeholderElem = createPlaceholderElem()
        iframe.parentNode.insertBefore(placeholderElem, iframe)
        iframe.remove();
        iframeToPlaceholder.set(iframe, placeholderElem)
    }
}

const reinstateIFrame = function(iframe) {
    if (iframe instanceof HTMLIFrameElement) {
        const iframeSrc = getIFrameSrc(iframe)
        if (iframeSrc) {
            domainsBlocked.delete( iframeSrc )
            domainsAllowed.add( iframeSrc )
        }

        const iframePlaceholderElem = iframeToPlaceholder.get(iframe)
        console.log(iframePlaceholderElem)
        if (iframePlaceholderElem && !iframePlaceholderElem.childElementCount) {
            iframePlaceholderElem.appendChild(iframe)
        }
    }
}

const getIFrameSrc = function(htmlNode) {
    if (htmlNode instanceof HTMLIFrameElement) {
        const iframeSrc = htmlNode.getAttribute('src')
        if (iframeSrc) {
            try {
                const srcUrl = new URL(iframeSrc)
                const srcDomain = srcUrl.hostname
                if (srcDomain) return srcDomain
            } catch (e) {}
        }
    }
    return null
}

export {
    replaceIFrame,
    reinstateIFrame,
    getIFrameSrc,
}
