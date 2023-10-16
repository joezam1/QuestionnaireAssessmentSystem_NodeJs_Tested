'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class QuestionChoice extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	QuestionChoice.init({
		QuestionChoiceId: {
			type: DataTypes.UUID,
			primaryKey: true,
			allowNull: false,
			value: undefined
		},
		QuestionId: {
			type: DataTypes.UUID,
			allowNull: false,
			primaryKey: false,
			value: undefined
		},
		ChoiceId: {
			type: DataTypes.UUID,
			primaryKey: false,
			allowNull: false,
			value:undefined
		}
	}, {
		sequelize,
		modelName: 'QuestionChoice',
	});
	return QuestionChoice;
};