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
	let selisih = now - targetDate;
	let diffInSeconds = Math.floor((now - targetDate) / 1000);

	if (diffInSeconds < 60) {
		return `${diffInSeconds} second${diffInSeconds > 1 ? "s" : ""} ago`;
	}

	let diffInMinutes = Math.floor(diffInSeconds / 60);
	if (diffInMinutes < 60) {
		return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
	}

	let diffInHours = Math.floor(diffInMinutes / 60);
	if (diffInHours < 24) {
		return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
	}

	let diffInDays = Math.floor(diffInHours / 24);
	if (diffInDays < 30) {
		return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
	}

	let diffInMonth = Math.floor(diffInDays / 30);
	return `${diffInMonth} month${diffInMonth > 1 ? "s" : ""} ago`;
}

function hitungDurasi(tanggalAwal, tanggalAkhir) {
	const date1 = new Date(tanggalAwal);
	const date2 = new Date(tanggalAkhir);

	const selisih = date2.getTime() - date1.getTime();
	const totalHari = Math.floor(selisih / (1000 * 60 * 60 * 24));

	// Hitung bulan dan sisa hari
	const bulan = Math.floor(totalHari / 30);
	const sisaHari = totalHari % 30;

	return {
		totalHari,
		bulan,
		sisaHari,
	};
}

// Fungsi untuk memformat output menjadi teks yang mudah dibaca
function getDurationTime(tanggalAwal, tanggalAkhir) {
	const durasi = hitungDurasi(tanggalAwal, tanggalAkhir);

	if (durasi.totalHari < 30) {
		return `${durasi.totalHari} days`;
	} else {
		let hasil = `${durasi.bulan} month`;
		if (durasi.sisaHari > 0) {
			hasil += ` ${durasi.sisaHari} days`;
		}
		return hasil;
	}
}

// Contoh penggunaan
// const tanggal1 = "2025-01-18";
// const tanggal2 = "2025-03-20";

// console.log(hitungDurasi(tanggal1, tanggal2));
/*
Output akan berbentuk object:
{
    totalHari: 61,
    tahun: 0,
    bulan: 2,
    hari: 1
}
*/

// console.log(formatDurasi(tanggal1, tanggal2));
/*
Output akan berbentuk teks:
Durasi antara 2025-01-18 dan 2025-03-20:
    Total hari: 61 hari
    0 tahun, 2 bulan, 1 hari
*/

module.exports = {
	formatDateToWIB,
	getRelativeTime,
	getDurationTime,
};
