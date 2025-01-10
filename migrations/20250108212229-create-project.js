"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Projects", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			title: {
				type: Sequelize.STRING,
			},
			content: {
				type: Sequelize.TEXT,
			},
			image: {
				type: Sequelize.STRING,
			},
			start: {
				type: Sequelize.DATE,
			},
			end: {
				type: Sequelize.DATE,
			},
			check1: {
				type: Sequelize.STRING,
			},
			check2: {
				type: Sequelize.STRING,
			},
			check3: {
				type: Sequelize.STRING,
			},
			check4: {
				type: Sequelize.STRING,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.NOW,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.NOW,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Projects");
	},
};
