'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('ResponseCategoryReports', {

			ResponseCategoryReportId: {
				type: Sequelize.UUID,
				primaryKey: true,
				allowNull: false
			},
			ResponseStatementId: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: "ResponseStatements",
					key: "ResponseStatementId",
				}
			},
			UserId: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: "Users",
					key: "UserId"
				}
			},
			CategoryId: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: "Categories",
					key: "CategoryId"
				}
			},
			CategoryName: {
				type: Sequelize.STRING,
				allowNull: false
			},
			TotalPoints: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			ObtainedPoints: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			UTCDateCreated: {
				type: Sequelize.DATE,
				allowNull: false
			}



		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('ResponseCategoryReports');
	}
};