function formatDateToWIB(date) {
	let months = [
		"Jan", // 0
		"Feb", // 1
		"Mar", // 2
		"Apr", // 3
		"Mei", // 4
		"Jun", // 5
		"Jul", // 6
		"Aug", // 7
		"Sep", // 8
		"Okt", // 9
		"Nov", // 10
		"Des", // 11
	];

	let day = date.getDate().toString().padStart(2, "0");
	let month = months[date.getMonth()]; // ===>>> bukan nama bulan, bukan angka bulan, tapi index dari bulan tersebut
	let year = date.getFullYear();

	let hours = date.getHours().toString().padStart(2, "0"); // ===> "2"

	let minutes = date.getMinutes().toString().padStart(2, "0");

	let formattedDate = `${day} ${month} ${year} ${hours}:${minutes} WIB`;

	return formattedDate;
}

function getRelativeTime(targetDate) {
	let now = new Date();
	let diffInSeconds = Math.floor((now - targetDate) / 1000); // satuan dari ms ke detik

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
	// Mengubah input tanggal menjadi objek Date
	var date1 = new Date(startDate);
	var date2 = new Date(endDate);

	// Menghitung selisih waktu dalam milidetik
	var deadline = Math.abs(date2 - date1);

	// Menghitung jumlah hari, jam, menit, dan detik
	var day = Math.floor(deadline / (1000 * 60 * 60 * 24));
	var hour = Math.floor((deadline % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	var minute = Math.floor((deadline % (1000 * 60 * 60)) / (1000 * 60));
	var second = Math.floor((deadline % (1000 * 60)) / 1000);

	if (day > 30) {
		var month = Math.floor(day / 30); // Anggap 1 bulan = 30 hari
		return month + " months";
	}

	// Menampilkan hasil rentang waktu
	// return day + " days, " + hour + " hours, " + minute + " minutes, " + second + " seconds";
	return day + " days";
}

module.exports = {
	formatDateToWIB,
	getRelativeTime,
	getDeadline,
};
