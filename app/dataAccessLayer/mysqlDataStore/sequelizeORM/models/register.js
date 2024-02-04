'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Register extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Register.belongsTo(models.User);
		}
	}
	Register.init({

		RegisterId: {
			type: DataTypes.UUID,
			primaryKey: true,
			allowNull: false,
			value: undefined
		},
		RegisterIndex: {
			type: DataTypes.INTEGER,
			primaryKey:false,
			unique: true,			
			allowNull: false,
			autoIncrement: true,
			value: undefined
		},
		UserId: {
			type: DataTypes.UUID,
			allowNull: false,
			value: undefined
		},
		IsActive: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			value: undefined
		},
		UTCDateCreated: {
			type: DataTypes.DATE,
			allowNull: false,
			value: undefined

		},
		UTCDateClosed: {
			type: DataTypes.DATE,
			allowNull: true,
			value: undefined
		}
	}, {
		sequelize,
		modelName: 'Register',
	});
	return Register;
};