const { formatDateToWIB } = require("../utils/time");
const { getDeadline } = require("../utils/time");
const { Sequelize, QueryTypes } = require("sequelize");

const config = require("../config/config.json");
const sequelize = new Sequelize(config.development);

function renderIndex(req, res) {
	res.render("index");
}

function renderResume(req, res) {
	res.render("resume");
}

function renderContact(req, res) {
	res.render("contact");
}

async function renderProject(req, res) {
	const query = `SELECT * FROM public."projects"`;
	const projects = await sequelize.query(query, { type: QueryTypes.SELECT });
	res.render("project", { projects: projects });
	console.log(projects);
}

function renderAdd(req, res) {
	res.render("project-add");
}

async function renderUpdate(req, res) {
	const { id } = req.params;
	const query = `SELECT * FROM public."projects" WHERE id = ${id}`;
	const projectDetail = await sequelize.query(query, { type: QueryTypes.SELECT });
	res.render("project-update", { data: projectDetail[0] });
	console.log(projectDetail);
}

async function renderDetail(req, res) {
	const { id } = req.params;
	const query = `SELECT * FROM public."projects" WHERE id = ${id}`;
	const projectDetail = await sequelize.query(query, { type: QueryTypes.SELECT });
	res.render("project-detail", { data: projectDetail[0] });
	console.log(projectDetail);
}

function renderTestimonial(req, res) {
	res.render("testimonial");
}

function renderLogin(req, res) {
	res.render("auth-login");
}

function renderRegister(req, res) {
	res.render("auth-register");
}

function render404(req, res) {
	res.render("404");
}

async function addProject(req, res) {
	console.log("form submited");
	const { title, content, start_date, end_date, check1, check2, check3, check4 } = req.body;
	const image = "https://picsum.photos/id/0/300/200";
	console.log(req.body);

	const query = `INSERT INTO public."projects"
	(title, content, image, start_date, end_date, check1, check2, check3, check4)
	VALUES
	('${title}','${content}','${image}','${start_date}','${end_date}','${check1}','${check2}','${check3}','${check4}')`;
	const result = await sequelize.query(query, { type: QueryTypes.INSERT });
	res.redirect("/project");
}

async function updateProject(req, res) {
	console.log("form submited");
	const { id } = req.params;
	const { title, content, start_date, end_date, check1, check2, check3, check4 } = req.body;
	const image = "https://picsum.photos/id/0/300/200";

	const query = `UPDATE public."projects"
	SET
	title='${title}',
	content='${content}',
	start_date='${start_date}',
	end_date='${end_date}',
	check1='${check1}',
	check2='${check2}',
	check3='${check3}',
	check4='${check4}'
	WHERE id = ${id}`;
	const result = await sequelize.query(query, { type: QueryTypes.UPDATE });
	console.log;
	res.redirect("/project");
}

async function deleteProject(req, res) {
	const { id } = req.params;
	const query = `DELETE FROM public."projects" WHERE id = ${id}`;
	const projectDetail = await sequelize.query(query, { type: QueryTypes.DELETE });
	res.redirect("/project");
}

module.exports = {
	renderIndex,
	renderResume,
	renderContact,
	renderProject,
	renderAdd,
	renderUpdate,
	renderDetail,
	renderTestimonial,
	addProject,
	updateProject,
	deleteProject,
	renderLogin,
	renderRegister,
	render404,
};
