// data-ttd: time-to-display - amount of time it waits before displaying a text node
// data-content: simply show the content of this node without doing the typewriter effect
// data-display-after: display after node number N
var typeInterval = 25;
function showNext(elements, current) {
	current += 1;
	if (current < elements.length) {
		var line = $(elements[current]);
		var displayAfter = $("p[data-display-after=" + current +"]");
		var time = line.data("ttd") || 0;
		if (line.data("content")) {
			setTimeout(function () {
				line.show();
				showNext(displayAfter, -1);
				showNext(elements, current);
			}, time);
		} else {
			setTimeout(function () {
				var typingTime = 0;
				var text = line.text();
				line.empty();
				line.show();
				text.split('').forEach(function (ch) {
					setTimeout(function () { 
						line.append(ch);
					}, typingTime);
					typingTime += typeInterval;
				});
				setTimeout(function () {
					showNext(displayAfter, -1);
					showNext(elements, current);
				}, typingTime + 1);
			}, time);
		}
	}
}
$(document).ready(function () {
	var gameText = $("#content p");
	showNext(gameText, -1);
});