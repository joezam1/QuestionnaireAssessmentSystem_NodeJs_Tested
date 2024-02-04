'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class UserRole extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			UserRole.belongsTo(models.User, {
                foreignKey: 'UserId'
            });
            UserRole.belongsTo(models.Role, {
                foreignKey: 'RoleId'
            });
		}
	}
	UserRole.init({
		UserRoleId: {
			type: DataTypes.UUID,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			value: undefined
		},
		UserId: {
			type: DataTypes.UUID,
			allowNull: false,
			value: undefined
		},
		RoleId: {
			type: DataTypes.UUID,
			allowNull: false,
			value: undefined
		}
	}, {
		sequelize,
		modelName: 'UserRole',
	});
	return UserRole;
};