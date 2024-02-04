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
			ResponseIndex: {
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
			QuestionChoiceId: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: "QuestionChoices",
					key: "QuestionChoiceId"
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
			ChoiceId: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: "Choices",
					key: "ChoiceId"
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
			QuestionAsked: {
				type: Sequelize.TEXT,
				allowNull: false
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