'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Response extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Response.belongsTo(models.User,{
				foreignKey:"UserId"
			})
			Response.belongsTo(models.ResponseStatement,{
				foreignKey:"ResponseStatementId"
			});			
			Response.belongsTo(models.QuestionChoice,{
				foreignKey: "QuestionChoiceId"
			});
			Response.belongsTo(models.Question,{
				foreignKey: "QuestionId"
			});
			Response.belongsTo(models.Choice,{
				foreignKey: "ChoiceId"
			});
			Response.belongsTo(models.Category,{
				foreignKey: "CategoryId"
			});
		}
	}
	Response.init({
		ResponseId: {
			type: DataTypes.UUID,
			primaryKey: true,
			allowNull: false,
			value: undefined
		},
		ResponseNumber: {
			type: DataTypes.INTEGER,
			primaryKey: false,
			allowNull: false,
			value: undefined
		},
		ResponseIndex: {
			type: DataTypes.INTEGER,
			primaryKey: false,
			allowNull: false,
			value: undefined
		},
		ResponseStatementId:{
			type:DataTypes.UUID,
			allowNull:false,
			value: undefined
		},
		UserId:{
			type:DataTypes.UUID,
			allowNull:false,
			value:undefined
		},
		QuestionChoiceId:{
			type:DataTypes.UUID,
			allowNull:false,
			value:undefined
		},
		QuestionId:{
			type:DataTypes.UUID,
			allowNull:false,
			value:undefined
		},
		ChoiceId:{
			type:DataTypes.UUID,
			allowNull:false,
			value:undefined
		},
		CategoryId:{
			type:DataTypes.UUID,
			allowNull:false,
			value:undefined
		},
		QuestionAsked:{
			type: DataTypes.TEXT,
			allowNull:false,
			value:undefined
		},
		Answer:{
			type: DataTypes.TEXT,
			allowNull:false,
			value:undefined
		},
		Value:{
			type:DataTypes.INTEGER,
			allowNull:false,
			value:undefined
		},
		UTCDateCreated:{
			type:DataTypes.DATE,
			allowNull:false,
			value:undefined
		}


	}, {
		sequelize,
		modelName: 'Response',
	});
	return Response;
};