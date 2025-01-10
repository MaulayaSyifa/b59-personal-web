const { Sequelize, QueryTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const config = require("../config/config.json");
const { Project, User } = require("../models");

const saltRounds = 10;

const sequelize = new Sequelize(config.development);

async function authRegister(req, res) {
	const { username, email, password, re_password } = req.body;

	console.log("Password:", password);
	console.log("Repassword:", re_password);

	if (password !== re_password) {
		req.flash("error", "Password confirmation is incorrect.");
		res.redirect("/register");
	} else {
		try {
			const hashedPassword = await bcrypt.hash(password, saltRounds);
			const user = await User.create({
				username,
				email,
				password: hashedPassword,
			});
			req.flash("success", "Registration successful.");
			res.redirect("/login");
		} catch (error) {
			console.error(error);
			req.flash("error", "Oops!, username or email already exist");
			res.redirect("/register");
		}
	}
}

async function authLogin(req, res) {
	const { email, password } = req.body;

	// check if user exist
	const user = await User.findOne({
		where: {
			email: email,
		},
	});

	if (!user) {
		req.flash("error", "Cannot find username or email.");
		return res.redirect("/register");
	}

	// check if password is correct
	const isValidated = await bcrypt.compare(password, user.password);

	if (!isValidated) {
		req.flash("error", "Password does not match.");
		return res.redirect("/login");
	}

	let loggedInUser = user.toJSON();

	delete loggedInUser.password;

	req.session.user = loggedInUser;

	req.flash("success", "Login successful.");
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

	console.log("Active user : ", user);

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
		res.render("404", { message: "Project not found." });
	} else {
		console.log("Project detail :", projectDetail);

		res.render("project-detail", { data: projectDetail, user });
	}
}

function renderProjectAdd(req, res) {
	let { user } = req.session;

	if (!user) {
		req.flash("error", "Please login");
		return res.redirect("/login");
	}

	res.render("project-add", { user });
}

async function addProject(req, res) {
	console.log("Request body", req.body);
	console.log("File information :", req.file);
	let { user } = req.session;
	console.log("Form submitted");
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

	console.log("Create project result : ", result);

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
		res.render("404", { message: "Project not found" });
	} else {
		console.log("Data to edit :", dataToEdit); // array

		res.render("project-update", { data: dataToEdit, user });
	}
}

async function updateProject(req, res) {
	try {
		const { id } = req.params;
		// const { title, content, start, end, check1, check2, check3, check4 } = req.body;
		const { title, content, start, end } = req.body;

		const check1 = req.body.check1 ? "Javascript" : "";
		const check2 = req.body.check2 ? "Node" : "";
		const check3 = req.body.check3 ? "React" : "";
		const check4 = req.body.check4 ? "Postgre" : "";

		const existingProject = await Project.findByPk(id);
		if (!existingProject) {
			return res.status(404).json({ message: "Project not found" });
		}

		let image = existingProject.image;
		if (req.file) {
			image = "http://localhost:5500/" + req.file.path;
		}

		const result = await Project.update(
			{
				title,
				content,
				image,
				start,
				end,
				check1,
				check2,
				check3,
				check4,
				updatedAt: new Date(),
			},
			{
				where: { id },
			}
		);

		console.log("Update result:", result);
		res.redirect("/project");
	} catch (error) {
		console.error("Error updating project:", error);
		res.status(500).redirect("/project?error=update-failed");
	}
}

async function deleteProject(req, res) {
	const { id } = req.params;

	const result = await Project.destroy({
		where: {
			id,
		},
	});

	console.log("Query delete result :", result);

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
	res.send(`Page cannot be found!`);
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
