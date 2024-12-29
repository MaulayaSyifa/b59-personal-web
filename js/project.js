let projects = [];

function addProject(e) {
	e.preventDefault();

	let title = document.getElementById("pName").value;
	let content = document.getElementById("pDescription").value;
	let startDate = document.getElementById("startDate").value;
	let endDate = document.getElementById("endDate").value;
	let imageInput = document.getElementById("fileUpload");
	let check1 = document.getElementById("check1");
	let check2 = document.getElementById("check2");
	let check3 = document.getElementById("check3");
	let check4 = document.getElementById("check4");

	if (![title, content, startDate, endDate].every(Boolean) || imageInput.files.length === 0) {
		return alert("All input fields cannot be empty");
	}

	check1 = check1.checked ? "" : "display: none";
	check2 = check2.checked ? "" : "display: none";
	check3 = check3.checked ? "" : "display: none";
	check4 = check4.checked ? "" : "display: none";

	let image = URL.createObjectURL(imageInput.files[0]);
	let cardId = `blog-${Date.now()}`;

	let project = {
		title: title,
		content: content,
		image: image,
		startDate: startDate,
		endDate: endDate,
		postedAt: new Date(),
		check1: check1,
		check2: check2,
		check3: check3,
		check4: check4,
		cardId: cardId,
	};

	projects.push(project);

	renderProject();
}

function renderProject() {
	console.log(projects);

	let projectListElement = document.getElementById("projectGrid");

	projectListElement.innerHTML = firstProjectContent();

	for (let i = 0; i < projects.length; i++) {
		let formattedDate = formatDateToWIB(projects[i].postedAt);
		let deadline = getDeadline(projects[i].startDate, projects[i].endDate);
		// menampilkan projects yang sudah kita buat dengan mengisi form
		console.log(projects[i]);

		projectListElement.innerHTML += `
			<div id="${i}">
				<div class="card">
					<div class="list-image">
						<img src="${projects[i].image}" alt="article image" />
					</div>
					<div style="margin: 1rem auto">
						<h3>${projects[i].title}</h3>
						<p>
							Posted at : ${formattedDate}
							<br />
							Duration : ${deadline}
						</p>
					</div>
						<p class="list-content">
							${projects[i].content}
						</p>
					<div class="list-tech">
						<img src="./assets/icon/javascript-icon.svg" title="Javascript" style="${projects[i].check1}"/>
						<img src="./assets/icon/node-js-icon.svg" title="Node Js" style="${projects[i].check2}"/>
						<img src="./assets/icon/react-js-icon.svg" title="React Js" style="${projects[i].check3}"/>
						<img src="./assets/icon/postgresql-icon.svg" title="PostgreSQL" style="${projects[i].check4}"/>
					</div>
					<div style="display: flex; gap: 1rem">
						<input style="width: 100%" type="submit" value="EDIT" />
						<input style="width: 100%" type="submit" value="DELETE" />
					</div>
				</div>
			</div>
		`;
	}
}

function firstProjectContent() {
	return `
        <div class="card">
			<div class="list-image">
				<img src="./assets/image/blog-img.png" alt="article image" />
			</div>
			<div style="margin: 1rem auto">
				<h3>Title</h3>
				<p>
					Posted at :
					<br />
					Duration :
				</p>
			</div>
			<p class="list-content">
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime maiores voluptatum
				natus, voluptates iste earum harum sint vero dolorem inventore ipsa ipsam cupiditate in.
				Dolor sapiente perspiciatis placeat amet illum!
			</p>
			<div class="list-tech">
				<img src="./assets/icon/javascript-icon.svg" title="Javascript" />
				<img src="./assets/icon/node-js-icon.svg" title="Node Js" />
				<img src="./assets/icon/react-js-icon.svg" title="React js" />
				<img src="./assets/icon/postgresql-icon.svg" title="PostgreSQL" />
			</div>
			<div style="display: flex; gap: 1rem">
				<input style="width: 100%" type="submit" value="EDIT" />
				<input style="width: 100%" type="submit" value="DELETE" />
			</div>
		</div>
    `;
}

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

function openProject(cardId) {
	// Find the project by its unique cardId
	const project = projects.find((p) => p.cardId === cardId);

	if (!project) {
		alert("Project not found!");
		return;
	}

	// Create a new window/tab and populate it with project details
	const newWindow = window.open("", "_blank");

	if (newWindow) {
		newWindow.document.write(`
            <!DOCTYPE html>
			<html lang="en">
				<head>
					<meta charset="UTF-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1.0" />

					<link rel="icon" href="./assets/icon/colors-icon.svg" />
					<link rel="stylesheet" href="./css/style.css" />
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
					<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700;900&display=swap" />
					<script src="https://kit.fontawesome.com/85a4b6508c.js" crossorigin="anonymous"></script>

					<title>${project.title}</title>
				</head>
				<body>
					<!-- navbar -->
					<nav class="col-s-12">
						<div>
							<a href="index.html">
								<img src="./assets/icon/colors-icon.svg" alt="web logo" />
							</a>
							<ul>
								<li><a href="index.html">Home</a></li>
								<li><a href="project.html">Project</a></li>
							</ul>
						</div>
						<ul>
							<li><a href="contact.html">Contact me</a></li>
						</ul>
					</nav>
					<!-- navbar -->
					<div class="detail-container">
						<h1 class="detail-title">${project.title}</h1>
						<div id="detail-info">
							<div style="width: 60%">
								<img src="${project.image}" alt="Project image" />
							</div>
							<div>
								<h3>Duration</h3>
								<div class="text">
									<div>
										<i class="fas fa-calendar"></i>
										<span>${getDeadline(project.startDate, project.endDate)}</span>
									</div>
									<div>
										<i class="fas fa-clock"></i>
										<span>${formatDateToWIB(project.postedAt)}</span>
									</div>
								</div>
								<h3 style="margin-top: 2rem">Technologies</h3>
								<div class="text">
									<div class="technologies">
										<img src="./assets/icon/node-js.svg" style="${project.check1}; width: 40px;" />
										<img src="./assets/icon/next-js.svg" style="${project.check2}; width: 40px;" />
										<img src="./assets/icon/react-js.svg" style="${project.check3}; width: 40px;" />
										<img src="./assets/icon/typescript.svg" style="${project.check4}; width: 40px;" />
									</div>
								</div>
							</div>
						</div>
						<div class="detail-content">
							<p>${project.content}</p>
						</div>
					</div>
				</body>
			</html>
        `);
		newWindow.document.close();
	} else {
		alert("Unable to open a new tab. Please check your browser settings.");
	}
}

// Add event listener to the edit button to call openProject function
document.addEventListener("click", function (e) {
	if (e.target && e.target.id === "openButton") {
		const cardId = e.target.getAttribute("data-id");
		openProject(cardId);
	}
});
