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
		$(this).css('background-color', 'rgba(255,255,255,0.8')
	})
	for (let i = 1; i <= lastDayOfMonth; i++) {
		const cell = $(dateCells[firstDayOfMonth + i - 1]);

		//adding data for the current day
		//if no data defined, color is empty
		const cellDate = new Date(firstDay.getTime());
		cellDate.setDate(i);
		const today = data[getDateKey(cellDate)] || [];
		let index = getIndexOfMaxArr(today);
		const colors = ["#00ab64", "#7bef77", "#fff288", "#ffbb43", "#fd6c4e"];

		
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


const data = { // pre-populated samples
	//october
	"9-1-2018": [0,0,0,0,5,],
	"9-2-2018": [0,0,0,0,5,],
	"9-3-2018": [0,0,0,3,1,],
	"9-4-2018": [0,3,0,0,0,],
	"9-3-2018": [0,0,0,3,1,],
	"9-7-2018": [0,6,1,0,0,],
	"9-10-2018": [0,0,1,0,0,],
	"9-13-2018": [3,0,1,0,0,],
	"9-15-2018": [0,0,1,3,0,],
	"9-16-2018": [1,3,0,0,0],
	"9-17-2018": [5,0,0,0,0,],

	//september
	"8-1-2018": [0,3,0,0,0,],
	"8-3-2018": [0,0,0,3,1,],
	"8-4-2018": [0,3,0,0,0,],
	"8-5-2018": [0,0,0,0,1,],
	"8-7-2018": [0,0,6,0,0,],
	"8-9-2018": [0,0,1,0,0,],
	"8-15-2018": [3,0,1,0,0,],
	"8-16-2018": [0,0,1,3,0,],
	"8-19-2018": [5,0,0,0,0,],
	"8-20-2018": [0,0,3,1,2,],
	"8-21-2018": [0,5,0,0,3,],
	"8-25-2018": [0,3,0,3,1,],
	"8-26-2018": [0,2,5,0,0,],
	"8-27-2018": [0,0,0,3,1,],
	"8-28-2018": [0,6,1,0,0,],
	"8-29-2018": [3,0,1,0,0,],
	"8-30-2018": [3,0,1,0,0,],

	//august
	"7-1-2018": [0,0,0,2,0,],
	"7-4-2018": [0,0,0,3,1,],
	"7-5-2018": [0,3,0,0,0,],
	"7-6-2018": [0,0,0,0,1,],
	"7-7-2018": [0,0,6,0,0,],
	"7-13-2018": [0,0,1,0,0,],
	"7-15-2018": [3,0,1,0,0,],
	"7-18-2018": [0,0,1,3,0,],
	"7-19-2018": [5,0,0,0,0,],
	"7-20-2018": [0,0,3,1,2,],
	"7-22-2018": [0,5,0,0,3,],
	"7-25-2018": [0,3,0,3,1,],
	"7-28-2018": [0,2,5,0,0,],
	"7-29-2018": [0,0,0,3,1,],
	"7-31-2018": [0,6,1,0,0,],
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

	let today = data[getDateKey(d)];
	if (!today) {
		data[getDateKey(d)] = [
			0,
			0,
			0,
			0,
			0
		]
		today = data[getDateKey(d)]
	}
	today[button.index()]++;
	render(offset);

	console.log(today)
})