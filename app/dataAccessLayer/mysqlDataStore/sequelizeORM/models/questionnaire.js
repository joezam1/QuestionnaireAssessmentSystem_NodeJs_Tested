'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Questionnaire extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Questionnaire.hasMany(models.Section,
			{
				foreignKey:'QuestionnaireId'
			});
			Questionnaire.hasMany(models.ResponseStatement,{
				foreignKey:"QuestionnaireId"
			});
		}
	}
	Questionnaire.init({
		QuestionnaireId:{
			type:DataTypes.UUID,
			primaryKey: true,
			allowNull:false,
			value:undefined
		},
		QuestionnaireIndex:{
			type: DataTypes.INTEGER,
			primaryKey: false,
			unique: true,
			allowNull:false,
			autoIncrement:true,
			value:undefined
		},		
		Name: {
			type: DataTypes.STRING,
			allowNull:false,
			value:undefined
		},
		Description:{
			type:DataTypes.TEXT,
			allowNull:false,
			value:undefined
		},
		UTCDateCreated:{
			type:DataTypes.DATE,
			allowNull: false,
			value:undefined
		},
		UTCDateUpdated:{
			type:DataTypes.DATE,
			allowNull:true,
			value: undefined
		},
		UTCDateArchived:{
			type:DataTypes.DATE,
			allowNull:true,
			value:undefined
		}

	}, {
		sequelize,
		modelName: 'Questionnaire',
	});
	return Questionnaire;
};