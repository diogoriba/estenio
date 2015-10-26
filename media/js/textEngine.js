// data-ttd: time-to-display - amount of time it waits before displaying a text node
// data-content: simply show the content of this node without doing the typewriter effect
// data-display-after: display after node number N
var typeInterval = 28;
var skip = window.location.hash === "#skip";
var timers = [];
function skipButton() {
	skip = true;
	timers.forEach(clearTimeout);
	var gameText = $("#content p");
	showNext(gameText, -1);
}
function scrollToBottom() {
	var body = $("body");
	body.scrollTop(body.height());
}
function showNext(elements, current, preventDisplayAfter) {
	current += 1;
	if (current < elements.length) {
		var line = $(elements[current]);
		var displayAfter = $("p[data-display-after=" + current +"]");
		var time = line.data("ttd") || 0;
		var secret = line.data("secret") || false;
		var skippable = skip && !secret;
		var timer;
		if (skippable) {
			time = 0;
		}
		if (time >= 0) {
			if (line.data("content") || skippable) {
				timer = setTimeout(function () {
					line.show();
					if (!preventDisplayAfter) {
						showNext(displayAfter, -1, true);
					}
					showNext(elements, current);
					scrollToBottom();
				}, time);
			} else {
				timer = setTimeout(function () {
					var typingTime = 0;
					var text = line.text();
					line.empty();
					line.show();
					var charTimers = [];
					text.split('').forEach(function (ch) {
						charTimers.push(setTimeout(function () { 
							line.append(ch);
							scrollToBottom();

							if (skip && !secret) {
								charTimers.forEach(clearTimeout);
								line.text(text);
								scrollToBottom();
							}
						}, typingTime));
						typingTime += typeInterval;
					});
					timers.push(setTimeout(function () {
						if (!preventDisplayAfter) {
							showNext(displayAfter, -1, true);
						}
						showNext(elements, current);
					}, typingTime + 1));
				}, time);
			}
			timers.push(timer);
		}
	}
}
$(document).ready(function () {
	var gameText = $("#content p");
	showNext(gameText, -1);

	$(document).keyup(function (e) {
		var key = e.keyCode || e.which;
		if (key === 27) {
			skipButton();
		}
	});

	$(".skip").click(skipButton);
});