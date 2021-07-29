chrome.runtime.onInstalled.addListener(() => {
    console.log('Initialized')
})

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    console.log(tab)
    if (tab.url.includes('livechat.com') && tab.status == "complete") {
        console.log('success')
    }
})

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.text == "execute") {
        chrome.scripting.executeScript({
            target: {
                tabId: sender.tab.id
            },
            function: function removeWidget() {
                try {
                    document.getElementById('chat-widget-container').innerHTML = ''
                } catch (e) {
                    setTimeout(() => {
                        console.log('Disabling chat widget...')
                        removeWidget()
                    }, 1000);
                }
            },
        })
    }
    sendResponse({
        message: "test"
    })
})