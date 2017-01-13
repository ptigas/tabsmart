function log(data) {
  console.log(data);
  $.post( "http://localhost/tabsmart/save.php", {data: JSON.stringify(data)}, function( data ) {    
  }, "json");    
}

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  console.log(changeInfo.status + " " + tabId)
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