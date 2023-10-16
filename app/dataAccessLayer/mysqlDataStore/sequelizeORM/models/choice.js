'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Choice extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Choice.belongsToMany(models.Question,{
				through:models.QuestionChoice,
				foreignKey: "QuestionId"
			});
			Choice.belongsTo(models.CategorySubcategory,{
				foreignKey:"CategorySubcategoryId"
			});
		}
	}
	Choice.init({
		ChoiceId: {
			type: DataTypes.UUID,
			primaryKey: true,
			allowNull: false,
			value: undefined
		},
		Name: {
			type: DataTypes.TEXT,
			allowNull: false,
			value: undefined
		},
		Value: {
			type: DataTypes.INTEGER,
			allowNull: false,
			value: undefined
		},
		CategorySubcategoryId: {
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
		modelName: 'Choice',
	});
	return Choice;
};