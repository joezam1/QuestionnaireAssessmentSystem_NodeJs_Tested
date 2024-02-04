'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Session extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Session.belongsTo(models.User, {
				foreignKey: 'UserId'
			});
		}
	}
	Session.init({
		SessionId: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			allowNull: false,
			value: undefined
		},
		UserId: {
			type: DataTypes.UUID,
			allowNull: false,
			value: undefined

		},
		SessionToken: {
			type: DataTypes.TEXT,
			allowNull: false,
			value: undefined
		},
		Expires: {
			type: DataTypes.INTEGER,
			allowNull: false,
			value: undefined
		},
		Data: {
			type: DataTypes.TEXT,
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
		UTCDateExpired: {
			type: DataTypes.DATE,
			allowNull: true,
			value: undefined
		}
	}, {
		sequelize,
		modelName: 'Session',
	});
	return Session;
};