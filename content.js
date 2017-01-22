var scrolled = false;
window.addEventListener('scroll', function() {	
	if (!scrolled) {
		chrome.runtime.sendMessage({event: "scrolled"}, function(response) {
  			console.log(response);
		});
		scrolled = true;
	}	
});