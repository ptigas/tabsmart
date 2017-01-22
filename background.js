function log(data) {
  console.log(data);
  $.post( "http://localhost/tabsmart/save.php", {data: JSON.stringify(data)}, function( data ) {    
  }, "json");    
}

log({
  time: Date.now(),
  event: "extension_loaded"
});

chrome.tabs.onCreated.addListener(function(tab){
    var data = {
      time: Date.now(),
      windowId: tab.windowId,
      tabId: tab.id,
      parentTab: (tab.openerTabId || -1),
      url: tab.url,
      event: 'created'
    }
    log(data);
});

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'loading') {
    var entry = {
      time: Date.now(),
      windowId: tab.windowId,
      tabId: tabId,
      parentTab: (tab.openerTabId || -1),
      url: tab.url,
      event: 'open'
    }
    log(entry);        
  }
})

chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {
  var entry = {
    time: Date.now(),
    tabId: tabId,
    windowId: removeInfo.windowId,
    event: 'close'
  }
  log(entry);   
})

chrome.windows.onCreated.addListener(function (window) {
  console.log(window);
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  var entry = {
      time: Date.now(),
      windowId: sender.tab.windowId,
      tabId: sender.tab.id,      
      url: sender.tab.url,
      event: 'scrolled'
    }
    log(entry);  
});