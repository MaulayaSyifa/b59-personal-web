const { Sequelize, QueryTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const config = require("../config/config.json");
const { Project, User } = require("../models");
const Swal = require("sweetalert2");
const { showSuccessAlert } = require("../utils/alert");

const saltRounds = 10;

const sequelize = new Sequelize(config.development);

async function authRegister(req, res) {
	const { username, email, password, repassword } = req.body;

	const hashedPassword = await bcrypt.hash(password, saltRounds);

	if (password === repassword) {
		const user = await User.create({
			username,
			email,
			password: hashedPassword,
		});

		req.flash("success");
		res.redirect("/login");
	} else {
		req.flash("error", "Konfirmasi password salah.");
		return res.redirect("/login");
	}
}

async function authLogin(req, res) {
	Swal.fire("SweetAlert2 is working!");
	const { email, password } = req.body;

	// check if user exist
	const user = await User.findOne({
		where: {
			email: email,
		},
	});

	if (!user) {
		req.flash("error", "User tidak ditemukan.");
		return res.redirect("/register");
	}

	// check if password is correct
	const isValidated = await bcrypt.compare(password, user.password);

	if (!isValidated) {
		req.flash("error", "Password mismatch.");
		return res.redirect("/login");
	}

	let loggedInUser = user.toJSON();

	delete loggedInUser.password;

	req.session.user = loggedInUser;

	req.flash("success", "Berhasil login");
	res.redirect("/");
}

function authLogout(req, res) {
	req.session.user = null;

	res.redirect("/login");
}

function renderIndex(req, res) {
	const user = req.session.user;
	res.render("index", { user });
}

function renderLogin(req, res) {
	const user = req.session.user;

	if (user) {
		res.redirect("/", { showAlert: true });
	} else {
		res.render("auth-login");
	}
}

function renderRegister(req, res) {
	const user = req.session.user || null;

	if (user) {
		res.redirect("/");
	} else {
		res.render("auth-register");
	}
}

async function renderProject(req, res) {
	let { user } = req.session;

	console.log("user yg sedang login", user);

	const projects = await Project.findAll({
		include: {
			model: User,
			as: "user",
			attributes: { exclude: ["password"] },
		},
		order: [["createdAt", "DESC"]],
	});

	console.log(projects);

	res.render("project", { projects, user });
}

async function renderProjectDetail(req, res) {
	let { user } = req.session;
	const { id } = req.params;

	const projectDetail = await Project.findOne({
		include: {
			model: User,
			as: "user",
			attributes: { exclude: ["password"] },
		},
		where: {
			id: id,
		},
	});

	if (projectDetail === null) {
		res.render("404", { message: "Project tidak ditemukan" });
	} else {
		console.log("detail project :", projectDetail);

		res.render("project-detail", { data: projectDetail, user });
	}
}

function renderProjectAdd(req, res) {
	let { user } = req.session;

	if (!user) {
		req.flash("error", "Silahkan login.");
		return res.redirect("/login");
	}

	res.render("project-add", { user });
}

async function addProject(req, res) {
	console.log("request body", req.body);
	console.log("informasi file", req.file);
	let { user } = req.session;
	console.log("form submitted");
	const { title, content, start, end, check1, check2, check3, check4 } = req.body;

	const image = "http://localhost:5500/" + req.file.path;

	const result = await Project.create({
		title,
		content,
		image,
		start,
		end,
		check1,
		check2,
		check3,
		check4,
		user_id: user.id,
	});

	console.log("result creating project", result);

	res.redirect("/project");
}

async function renderProjectEdit(req, res) {
	let { user } = req.session;
	const { id } = req.params;

	const dataToEdit = await Project.findOne({
		where: {
			id: id,
		},
	});

	if (dataToEdit === null) {
		res.render("404", { message: "Project tidak ditemukan" });
	} else {
		console.log("data yang mau di edit :", dataToEdit); // array

		res.render("project-update", { data: dataToEdit, user });
	}
}

async function updateProject(req, res) {
	const { id } = req.params;
	const { title, content, start, end, check1, check2, check3, check4 } = req.body;

	const image = "http://localhost:5500/" + req.file.path;

	const result = await Project.update(
		{
			title: title,
			content: content,
			image: image,
			start: start,
			end: end,
			check1: check1,
			check2: check2,
			check3: check3,
			check4: check4,
			updatedAt: sequelize.fn("NOW"),
		},
		{
			where: {
				id: id,
			},
		}
	);

	console.log("result update :", result);

	res.redirect("/project");
}

async function deleteProject(req, res) {
	const { id } = req.params;

	const result = await Project.destroy({
		where: {
			id,
		},
	});

	console.log("result query delete :", result);

	res.redirect("/project");
}

// CONTACT

function renderContact(req, res) {
	let { user } = req.session;
	res.render("contact", { user });
}

function renderResume(req, res) {
	let { user } = req.session;
	res.render("resume", { user });
}

function renderTestimonial(req, res) {
	let { user } = req.session;
	res.render("testimonial", { user });
}

function render404(req, res) {
	let { user } = req.session;
	res.send(`halaman ini tidak ada!`);
}

module.exports = {
	renderLogin,
	authLogin,
	renderRegister,
	authRegister,
	authLogout,
	renderIndex,
	renderContact,
	renderProject,
	renderProjectDetail,
	addProject,
	updateProject,
	deleteProject,
	renderProjectAdd,
	renderProjectEdit,
	renderResume,
	renderTestimonial,
	render404,
};
