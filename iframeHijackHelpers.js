/*
    All IFrames are initially removed from the document.
    This is to ensure they do not load anything until the
    async service confirms the domain is trusted.
*/

const iframeToPlaceholder = new Map()

const createPlaceholderElem = () => {
    const elem = document.createElement("div");
    elem.classList.add('iframe-buster-placeholder')

    return elem
}

const replaceIFrame = function(iframe) {
    if (iframe instanceof HTMLIFrameElement) {
        const placeholderElem = createPlaceholderElem()
        iframe.parentNode.insertBefore(placeholderElem, iframe)
        iframe.remove();
        iframeToPlaceholder.put(iframe, placeholderElem)
    }
}

const reinstateIFrame = function(iframe) {
    if (iframe instanceof HTMLIFrameElement) {
        const iframePlaceholderElem = iframeToPlaceholder.get(iframe)
        if (iframePlaceholderElem && iframePlaceholderElem.childElementCount) {
            iframePlaceholderElem.appendChild(iframe)
        }
    }
}

const getIFrameSrc = function(htmlNode) {
    if (htmlNode instanceof HTMLIFrameElement) {
        const iframeSrc = node.getAttribute('src')
        if (iframeSrc) {
            try {
                const srcUrl = new URL(iframeSrc)
                const srcDomain = srcUrl.hostname
                if (srcDomain) return srcDomain
            } catch (e) {}
        } else {
            htmlNode.remove()
        }
    }
    return null
}
