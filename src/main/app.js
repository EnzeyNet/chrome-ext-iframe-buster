

// Options for the observer (which mutations to observe)
var config = { attributes: false, childList: true, subtree: true };
var callback = function(mutationsList, observer) {
    for(var mutation of mutationsList) {
        if (mutation.type == 'childList' && mutation.addedNodes.length) {
			for(var node of mutation.addedNodes) {
				if (node instanceof HTMLIFrameElement) {
					console.log('burned iframe')
					node.remove();
				}
			}
        }
	}
}

var removeFrames = function() {
	var existingFrames = window.document.querySelectorAll('iframe');
	existingFrames.forEach(i => i.remove());
	console.log('striped frames from page: ' + existingFrames.length)
}

var isActive = false;
chrome.runtime.onMessage.addListener(function(msg) {
	if (isActive && !msg.active) {
		setTimeout(function() {
			window.location.reload()
		}, 100)
	} else if (msg.active) {
		isActive = msg.active;

		// Create an observer instance linked to the callback function
		var observer = new MutationObserver(callback);

		// Start observing the target node for configured mutations
		observer.observe(window.document, config);

		removeFrames();
	}
});

chrome.runtime.sendMessage({action: 'READY'})