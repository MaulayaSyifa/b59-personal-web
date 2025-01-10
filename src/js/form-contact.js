var formContact = document.getElementById("formContact");

formContact.addEventListener("submit", (e) => {
	e.preventDefault();

	var form = e.target;
	var formData = new FormData(form);
	var data = Object.fromEntries(formData.entries());
	var link = document.createElement("a");

	link.href = `mailto:maulayasyifa.mail@gmail.com?subject=${data.subject}
    &body=Selamat siang, nama saya ${data.name}.%0D%0A
    Silahkan hubungi saya di ${data.email} atau ${data.phone}. Saya adalah seorang ${data.skill} developer.%0D%0A
    %0D%0A
    Berikut pesan saya : %0D%0A
    ${data.message}`;

	link.click();
});
