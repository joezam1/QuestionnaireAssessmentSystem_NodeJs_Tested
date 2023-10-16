'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Category extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here			
			Category.belongsToMany(models.Subcategory,{
				through:models.CategorySubcategory,
				foreignKey:"CategorySubcategoryId"
			});
		}
	}
	Category.init({
		CategoryId: {
			type: DataTypes.UUID,
			primaryKey:true,
			allowNull:false,
			value:undefined
		},		
		Name:{
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
			allowNull:false,
			value:undefined
		},
		UTCDateUpdated:{
			type:DataTypes.DATE,
			allowNull:true,
			value:undefined
		},
		UTCDateArchived:{
			type:DataTypes.DATE,
			allowNull:true,
			value:undefined
		}
	}, {
		sequelize,
		modelName: 'Category',
	});
	return Category;
};