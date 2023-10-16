'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			User.hasMany(models.ResponseStatement,{
				foreignKey:"UserId"
			})
			User.hasMany(models.Response,{
				foreignKey:"UserId"
			});
		}
	}
	User.init({
		UserId: {
			type: DataTypes.UUID,
			primaryKey: true,
			allowNull: false,
			value: undefined
		},
		UserIndex:{
			type:DataTypes.INTEGER,
			primaryKey:false,
			allowNull:false,
			value:undefined
		},
		FirstName:{
			type:DataTypes.STRING,
			allowNull:false,
			value:undefined
		},
		MiddleName:{
			type:DataTypes.STRING,
			allowNull:true,
			value:undefined
		},
		LastName:{
			type:DataTypes.STRING,
			allowNull:false,
			value:undefined
		},
		Username:{
			type:DataTypes.STRING,
			allowNull:false,
			value:undefined
		},
		Email:{
			type:DataTypes.STRING,
			allowNull:false,
			value:undefined
		},
		Password:{
			type:DataTypes.STRING,
			allowNull:false,
			value:undefined
		},		
		Sex:{
			type:DataTypes.STRING,
			allowNull:false,
			value:undefined
		},
		IsActive:{
			type:DataTypes.BOOLEAN,
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
		modelName: 'User',
	});
	return User;
};