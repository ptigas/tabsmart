var port = chrome.extension.connect({
      name: "Sample Communication"
 });

var url ="";
port.onMessage.addListener(function(msg) {	
  if (msg.data.revisions.length > 0) {
  	//alert("hoax")
  	document.querySelector("#editForm").style.display = ""
  	document.querySelector("#addForm").style.display = "none"
  	document.querySelector("#content").innerHTML = msg.data.content.substring(0, 200);
  	document.querySelector("#revisions").innerHTML = msg.data.revisions.length;
  } else {
  	//alert("not a hoax")
  	document.querySelector("#editForm").style.display = "none"
  	document.querySelector("#addForm").style.display = ""
  }

  	var x = document.querySelectorAll(".edit");
	var i;	
	for (i = 0; i < x.length; i++) {
    	x[i].onclick = function () {
    		window.open("https://hocus.io/edit/url/" + btoa(url));
    	}    		
	}
});

chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {    
    console.log(request);
  });

chrome.tabs.getSelected(null, function(tab){
    port.postMessage(tab.url);
    url = tab.url
});