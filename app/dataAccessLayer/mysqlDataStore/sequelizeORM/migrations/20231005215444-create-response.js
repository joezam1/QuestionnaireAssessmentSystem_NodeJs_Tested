'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Responses', {
			ResponseId: {
				type: Sequelize.UUID,
				primaryKey: true,
				allowNull: false
			},
			ResponseNumber: {
				type: Sequelize.INTEGER,
				primaryKey: false,
				allowNull: false,
				value: undefined
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
			QuestionId: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: "Questions",
					key: "QuestionId"
				}
			},
			Answer: {
				type: Sequelize.TEXT,
				allowNull: false
			},
			Value: {
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
		await queryInterface.dropTable('Responses');
	}
};