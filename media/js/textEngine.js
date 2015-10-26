var typeInterval = 15;
function showNext(elements, current) {
	current += 1;
	if (current < elements.length) {
		var line = $(elements[current]);
		var time = line.data("ttd");
		if (line.data("content")) {
			setTimeout(function () {
				line.show();
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
					showNext(elements, current);
				}, typingTime + 1);
			}, time);
		}
	}
}
$(document).ready(function () {
	var gameText = $("#content p");
	showNext(gameText, -1);

	var options = $("#options p");
	showNext(options, -1);
});