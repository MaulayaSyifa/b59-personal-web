const express = require("express");
var session = require("express-session");
var flash = require("express-flash");
var methodOverride = require("method-override");
const path = require("path");
const hbs = require("hbs");
require("dotenv").config();
const upload = require("./middlewares/upload-file");

const {
	renderLogin,
	authLogin,
	renderRegister,
	authRegister,
	authLogout,
	renderProject,
	renderProjectDetail,
	addProject,
	renderProjectEdit,
	updateProject,
	deleteProject,
	renderIndex,
	renderProjectAdd,
	renderContact,
	renderResume,
	renderTestimonial,
	render404,
} = require("./controllers/controllers-v2");

const { formatDateToWIB, getRelativeTime, getDurationTime } = require("./utils/time");
const { truncateText } = require("./utils/text");
const {
	sendAlert,
	showSuccessAlert,
	showErrorAlert,
	showConfirmDialog,
	showInputDialog,
	showCustomAlert,
} = require("./utils/alert");

const app = express();
const PORT = process.env.SERVER_PORT || 5550;

app.use(express.json());
app.use(flash());

app.use(
	session({
		name: "my-session",
		secret: process.env.SESSION_KEY,
		resave: false,
		saveUninitialized: true,
	})
);

app.use(express.urlencoded({ extended: true }));
app.use("/assets", express.static(path.join(__dirname, "./assets")));
app.use("/src/css", express.static(path.join(__dirname, "./src/css")));
app.use("/src/js", express.static(path.join(__dirname, "./src/js")));
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));
app.use(methodOverride("_method"));

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./views"));

hbs.registerPartials(__dirname + "/views/partials", function (err) {});
hbs.registerHelper("formatDateToWIB", formatDateToWIB);
hbs.registerHelper("getRelativeTime", getRelativeTime);
hbs.registerHelper("getDurationTime", getDurationTime);
hbs.registerHelper("truncateText", truncateText);
hbs.registerHelper("equal", function (a, b) {
	return a === b;
});
hbs.registerHelper("consolelog", function (log) {
	console.log(log);
});

hbs.registerHelper("ifEqualAndUserExist", function (user, userId, options) {
	if (user.id && user.id === userId) {
		return options.fn(this);
	} else {
		options.inverse(this);
	}
});

hbs.registerHelper("sendAlert", sendAlert);
hbs.registerHelper("showSuccessAlert", showSuccessAlert);
hbs.registerHelper("showErrorAlert", showErrorAlert);
hbs.registerHelper("showConfirmDialog", showConfirmDialog);
hbs.registerHelper("showInputDialog", showInputDialog);
hbs.registerHelper("showCustomAlert", showCustomAlert);

app.get("/login", renderLogin);
app.get("/register", renderRegister);
app.post("/login", authLogin);
app.post("/register", authRegister);
app.get("/logout", authLogout);
app.get("/", renderIndex);
app.get("/project", renderProject);
app.get("/project-detail/:id", renderProjectDetail);
app.post("/project", upload.single("image"), addProject);
app.get("/project-add", renderProjectAdd);
app.get("/project-update/:id", renderProjectEdit);
app.patch("/project-update/:id", upload.single("image"), updateProject);
app.delete("/project-delete/:id", deleteProject);
app.get("/contact", renderContact);
app.get("/resume", renderResume);
app.get("/testimonial", renderTestimonial);
app.get("*", render404);

app.listen(PORT, () => {
	console.log(`Server berjalan di port : ${PORT}`);
});
