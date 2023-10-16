'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class CategorySubcategory extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			CategorySubcategory.hasMany(models.Question,{
				foreignKey:"CategorySubcategoryId"
			});
			CategorySubcategory.hasMany(models.Choice,{
				foreignKey:"CategorySubcategoryId"
			});
		}
	}
	CategorySubcategory.init({
		CategorySubcategoryId: {
			type: DataTypes.UUID,
			primaryKey: true,
			allowNull: false,
			value: undefined
		},
		CategoryId: {
			type: DataTypes.UUID,
			allowNull: false,
			value: undefined

		},
		SubcategoryId: {
			type: DataTypes.UUID,
			allowNull: false,
			value: undefined
		}
	}, {
		sequelize,
		modelName: 'CategorySubcategory',
	});
	return CategorySubcategory;
};