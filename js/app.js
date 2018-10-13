function getMonth(d) {
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July", 
		"August",
		"September",
		"October",
		"November",
		"December"
	];
	const monthIndex = d.getMonth();
	return monthString = months[monthIndex];

}

function getFirstDayOfMonthDate(d = new Date()) {
	const firstDayOfMonth = new Date(d.getTime());
	firstDayOfMonth.setDate(1);

	return firstDayOfMonth;
}

function getLastDayOfMonthDate(d = new Date()) {
	const lastDayOfMonth = new Date(d.getTime());
	lastDayOfMonth.setMonth(lastDayOfMonth.getMonth() + 1);
	lastDayOfMonth.setDate(0);

	return lastDayOfMonth;
}

function getDateKey(d) {
	return d.getMonth() + "-" + d.getDate() + "-" + d.getFullYear()
}


function getIndexOfMaxArr(arr) {
	let max;
	let maxIndex;
	for(let i = 0; i < arr.length; i++) {
		if (i === 0) {
			max = arr[i];
			maxIndex = 0;
			continue;
		}

		if (arr[i] > max) {
			max = arr[i];
			maxIndex = i;
		}
	}


	return maxIndex;

}

function drawCal(firstDay, lastDay) {
	// get INDEX of cell to start with, this corresponds to
	// the DAY of first day of month
	const firstDayOfMonth = firstDay.getDay();
	console.log(firstDayOfMonth);

	// get the last DAY of month(28, 29, 30, 31) - this is
	// where the for loop ends
	const lastDayOfMonth = lastDay.getDate();
	console.log(lastDayOfMonth)

	// hide optional row, only show if the IF statement in
	// for loop triggers it
	$('.js-optional').css('display', 'none')

	// if date is not part of the current month = no day
	// as well as no color ('white')
	const dateCells = $('.flex-container:not(.js-weekdays) .col-25');
	dateCells.empty();
	(dateCells || []).each(function() {
		$(this).css('background-color', 'white')
	})
	for (let i = 1; i <= lastDayOfMonth; i++) {
		const cell = $(dateCells[firstDayOfMonth + i - 1]);

		//adding data for the current day
		//if no data defined, color is empty
		const cellDate = new Date(firstDay.getTime());
		cellDate.setDate(i);
		const today = data[getDateKey(cellDate)] || [];
		let index = getIndexOfMaxArr(today);
		const colors = ["green", "lightgreen", "yellow", "lightred", "red"];

		
		if (typeof index !== "undefined") {
			cell.css('background-color', colors[index]);
		}
		//if last week row is needed (based on month's length), display it
		if (cell.parent().is('.js-optional')) {
			$('.js-optional').css('display', 'flex')
		}
		cell.text(i)
	}
}

function render(offset = 0) {
	// today's date obj
	const d = new Date();
	d.setMonth(d.getMonth() + offset)

	// date obj for first day of month
	const firstDay = getFirstDayOfMonthDate(d);
	// date obj for last day of month
	const lastDay = getLastDayOfMonthDate(d);

	drawCal(firstDay, lastDay)
	$('.js-month').text(`${getMonth(d)} ${d.getFullYear()}`)
}


const data = {
	"9-13-2018": [
		0,
		0,
		0,
		0,
		0,
	],
	"9-15-2018": [
		4,
		0,
		1,
		0,
		0,
	],
	"10-1-2018": [
		5,
		0,
		0,
		0,
		0
	]
}

let offset = 0;
render(offset);

$('.js-next').on('click', function() {
	offset++;
	render(offset)
});

$('.js-prev').on('click', function(){
	offset--;
	render(offset)
})


const buttons = $(".js-button");
buttons.on('click', function(e) {
	const button = $(e.target);
	const d = new Date();
	console.log(button, button.index()-1)

	const today = data[getDateKey(d)];
	today[button.index()-1]++;
	render(offset);

	console.log(today)
})

