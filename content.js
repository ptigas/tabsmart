function createOverlay(text) {
  $("#hocus_modal_editor").html(text);
  $("#hocus_modal_editor").modal();
}

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    var selection = window.getSelection();
    console.log(selection);
    var data = {}
    data['url'] = ""
    data['selection'] = String(selection);    
    $('<script>', {
      src: "http://localhost:8000/bookmarklet/"+btoa(document.URL),
      id:  'hocus_modal_editor'
    }).appendTo('head');
});

var port = chrome.extension.connect({
      name: "page to background channel"
 });