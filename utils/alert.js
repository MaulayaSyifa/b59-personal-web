const Swal = require("sweetalert2");

function sendAlert(message) {
	Swal.fire({
		title: "Oops!",
		text: message,
		icon: "error",
	});
}

// Alert Sukses
function showSuccessAlert() {
	Swal.fire({
		title: "Berhasil!",
		text: "Data telah berhasil disimpan",
		icon: "success",
		timer: 2000,
		showConfirmButton: false,
	});
}

// Alert Error
function showErrorAlert() {
	Swal.fire({
		title: "Error!",
		text: "Terjadi kesalahan saat memproses data",
		icon: "error",
		confirmButtonText: "Tutup",
	});
}

// Dialog Konfirmasi
function showConfirmDialog() {
	Swal.fire({
		title: "Apakah Anda yakin?",
		text: "Data yang dihapus tidak dapat dikembalikan!",
		icon: "warning",
		showCancelButton: true,
		confirmButtonColor: "#3085d6",
		cancelButtonColor: "#d33",
		confirmButtonText: "Ya, hapus!",
		cancelButtonText: "Batal",
	}).then((result) => {
		if (result.isConfirmed) {
			Swal.fire("Terhapus!", "Data telah berhasil dihapus.", "success");
		}
	});
}

// Dialog Input
function showInputDialog() {
	Swal.fire({
		title: "Input Nama",
		input: "text",
		inputLabel: "Masukkan nama Anda",
		inputPlaceholder: "Nama lengkap",
		showCancelButton: true,
		confirmButtonText: "Simpan",
		cancelButtonText: "Batal",
		inputValidator: (value) => {
			if (!value) {
				return "Nama tidak boleh kosong!";
			}
		},
	}).then((result) => {
		if (result.isConfirmed) {
			Swal.fire("Tersimpan!", `Halo, ${result.value}!`, "success");
		}
	});
}

// Custom Alert
function showCustomAlert() {
	Swal.fire({
		title: "Custom Style",
		text: "Alert dengan style kustom",
		imageUrl: "/api/placeholder/100/100",
		imageWidth: 100,
		imageHeight: 100,
		imageAlt: "Custom image",
		customClass: {
			container: "custom-swal",
		},
		showConfirmButton: true,
		confirmButtonText: "Cool!",
		backdrop: `
                    rgba(0,0,123,0.4)
                    url("/api/placeholder/100/100")
                    left top
                    no-repeat
                `,
	});
}

module.exports = {
	sendAlert,
	showSuccessAlert,
	showErrorAlert,
	showConfirmDialog,
	showInputDialog,
	showCustomAlert,
};
