'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class ResponseStatement extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			ResponseStatement.belongsTo(models.User, {
				foreignKey: "UserId"
			});
			ResponseStatement.belongsTo(models.Questionnaire,{
				foreignKey: "QuestionnaireId"
			});
			ResponseStatement.hasMany(models.Response,{
				foreignKey:"ResponseStatementId"
			});
		}
	}
	ResponseStatement.init({
		ResponseStatementId: {
			type: DataTypes.UUID,
			primaryKey: true,
			allowNull: false,
			value: undefined
		},		
		Name:{
			type:DataTypes.TEXT,
			allowNull:false,
			value:undefined
		},
		QuestionnaireId: {
			type: DataTypes.UUID,
			primaryKey: false,
			allowNull: false,
			value: undefined
		},
		UserId: {
			type: DataTypes.UUID,
			primaryKey: false,
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
		modelName: 'ResponseStatement',
	});
	return ResponseStatement;
};