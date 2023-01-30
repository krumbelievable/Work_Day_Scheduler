//Global variable for the current day, aslo calls in moment.
var currentDay = moment().format('MMM Do, YYYY');
$('#currentDay').text(currentDay);

$('.saveBtn').on('click', function () {
	//save button uses local storage to save text
	var textInfo = $(this).siblings('.description').val();
	var timeInfo = $(this).parent().attr('id');
	localStorage.setItem(timeInfo, textInfo);
	console.log(textInfo);
});

for (i = 9; i <= 17; i++) {
	//Grabs content from localstorage
	let data;
	if (i < 12) {
		data = localStorage.getItem(i + 'am');
		$('#' + i + 'am')
			.children()
			.eq(1)
			.append(data);
	}
	if (i === 12) {
		data = localStorage.getItem(i + 'pm');
		$('#' + i + 'pm')
			.children()
			.eq(1)
			.append(data);
	}
	if (i > 12) {
		var key = i - 12;
		var itemEl = JSON.stringify(key) + 'pm';
		data = localStorage.getItem(itemEl);
		$('#' + key + 'pm')
			.children()
			.eq(1)
			.append(data);
	}
}

function trackTime() {
	// Used to track time.
	var currentHour = moment().hour();
	var timeBlockArray = $('.time-block');

	for (let x = 0; x < timeBlockArray.length; x++) {
		// Converts standard time to military.
		const textareaEl = timeBlockArray[x].children[1];
		var currentBlockTime = timeBlockArray[x].getAttribute('id');

		var standardTime = parseInt(currentBlockTime.replace(/\D/g, ''));
		if (standardTime < 9) {
			standardTime += 12;
		}
		if (standardTime < currentHour) {
			//Changes colors based on time of day
			textareaEl.classList.add('past');
		}
		if (standardTime === currentHour) {
			textareaEl.classList.add('present');
		}
		if (standardTime > currentHour) {
			textareaEl.classList.add('future');
		}
	}
}
trackTime();
