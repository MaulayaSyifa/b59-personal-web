function formatDateToWIB(date) {
	let months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Des"];

	let day = date.getDate().toString().padStart(2, "0");
	let month = months[date.getMonth()];
	let year = date.getFullYear();
	let hours = date.getHours().toString().padStart(2, "0");
	let minutes = date.getMinutes().toString().padStart(2, "0");
	let formattedDate = `${day} ${month} ${year} ${hours}:${minutes} WIB`;

	return formattedDate;
}

function getRelativeTime(targetDate) {
	let now = new Date();
	let diffInSeconds = Math.floor((now - targetDate) / 1000);
	console.log(diffInSeconds);
	if (diffInSeconds < 60) {
		return `${diffInSeconds} second${diffInSeconds > 1 ? "s" : ""} ago`;
	}
	let diffInMinutes = Math.floor(diffInSeconds / 60);
	if (diffInMinutes < 60) {
		return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
	}
}

function getDeadline(startDate, endDate) {
	var date1 = new Date(startDate);
	var date2 = new Date(endDate);
	var deadline = Math.abs(date2 - date1);
	var day = Math.floor(deadline / (1000 * 60 * 60 * 24));
	var hour = Math.floor((deadline % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	var minute = Math.floor((deadline % (1000 * 60 * 60)) / (1000 * 60));
	var second = Math.floor((deadline % (1000 * 60)) / 1000);

	if (day > 30) {
		var month = Math.floor(day / 30);
		return month + " months";
	}

	return day + " days";
}

module.exports = {
	formatDateToWIB,
	getRelativeTime,
	getDeadline,
};
