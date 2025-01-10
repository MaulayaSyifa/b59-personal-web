"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Project extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Project.belongsTo(models.User, {
				foreignKey: "user_id",
				as: "user",
				onDelete: "SET NULL",
				onUpdate: "CASCADE",
			});
		}
	}
	Project.init(
		{
			title: DataTypes.STRING,
			content: DataTypes.STRING,
			image: DataTypes.STRING,
			start: DataTypes.DATE,
			end: DataTypes.DATE,
			check1: DataTypes.STRING,
			check2: DataTypes.STRING,
			check3: DataTypes.STRING,
			check4: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Project",
		}
	);
	return Project;
};
