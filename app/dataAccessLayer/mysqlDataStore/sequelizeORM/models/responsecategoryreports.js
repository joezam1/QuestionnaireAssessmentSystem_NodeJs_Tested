'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class ResponseCategoryReports extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Response.belongsTo(models.ResponseStatement, {
				foreignKey: "ResponseStatementId"
			});
			Response.belongsTo(models.User, {
				foreignKey: "UserId"
			})
			Response.belongsTo(models.Category, {
				foreignKey: "CategoryId"
			});
		}
	}
	ResponseCategoryReports.init({
		ResponseCategoryReportId: {
			type: DataTypes.UUID,
			primaryKey: true,
			allowNull: false,
			value: undefined
		},
		ResponseStatementId: {
			type: DataTypes.UUID,
			allowNull: false,
			value: undefined
		},
		UserId: {
			type: DataTypes.UUID,
			allowNull: false,
			value: undefined
		},
		CategoryId: {
			type: DataTypes.UUID,
			allowNull: false,
			value: undefined
		},
		CategoryName: {
			type: DataTypes.STRING,
			allowNull: false,
			value: undefined
		},
		TotalPoints: {
			type: DataTypes.INTEGER,
			allowNull: false,
			value: undefined
		},
		ObtainedPoints: {
			type: DataTypes.INTEGER,
			allowNull: false,
			value: undefined
		},
		UTCDateCreated: {
			type: DataTypes.DATE,
			allowNull: false,
			value: undefined
		}

	}, {
		sequelize,
		modelName: 'ResponseCategoryReports',
	});
	return ResponseCategoryReports;
};