'use strict';
const {
	Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Section extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Section.belongsTo(models.Questionnaire,{
				foreignKey:'QuestionnaireId'
			});
			Section.hasMany(models.Question,{
				foreignKey: "SectionId"
			});
		}
	}
	Section.init({
		SectionId: {
			type: DataTypes.UUID,
			primaryKey: true,
			allowNull: false,
			value: undefined
		},
		SectionIndex: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: false,
			unique: true,
			value: undefined
		},
		Name: {
			type: DataTypes.STRING,
			allowNull: false,
			value: undefined
		},
		Description: {
			type: DataTypes.TEXT,
			allowNull: false,
			value: undefined
		},
		QuestionnaireId: {
			type: DataTypes.UUID,
			allowNull: false,
			value: undefined
		},
		UTCDateCreated: {
			type: DataTypes.DATE,
			allowNull: false,
			value: undefined
		},
		UTCDateUpdated: {
			type: DataTypes.DATE,
			allowNull: true,
			value: undefined
		}
	}, {
		sequelize,
		modelName: 'Section',
	});
	return Section;
};