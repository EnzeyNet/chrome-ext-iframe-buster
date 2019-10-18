
const getActiveTab = function() {
	return new Promise(function(resolve, reject) {
		chrome.tabs.query(
			{
				currentWindow: true,
				active: true
			},
			(tabArray) => resolve(tabArray[0].id)
		);
	})
}

const messageActiveTab = function(message) {
	return new Promise(async function(resolve, reject) {
		chrome.tabs.sendMessage(await getActiveTab(), message, function(response) {
			resolve(response);
		})
	})
}

const isActiveOnTab = async function() {
	return new Promise(async function(resolve) {
		let activeTabId = await getActiveTab();
		let isActive = sessionStorage.getItem(activeTabId);
		if (null === isActive || undefined === isActive) {
			isActive = true;
			sessionStorage.setItem(activeTabId, isActive)
		} else {
			isActive = isActive === true || isActive === 'true';
		}
		resolve(isActive)
	})
}

chrome.runtime.onMessage.addListener(async function(msg) {
	if (msg.action === 'READY') {
		messageActiveTab({
			active: await isActiveOnTab(),
		});
	}
})

chrome.browserAction.onClicked.addListener(async function(tab) {
	let isActive = await isActiveOnTab();
	isActive = !isActive;
	sessionStorage.setItem(await getActiveTab(), isActive)
	messageActiveTab({
		active: isActive,
	});
});