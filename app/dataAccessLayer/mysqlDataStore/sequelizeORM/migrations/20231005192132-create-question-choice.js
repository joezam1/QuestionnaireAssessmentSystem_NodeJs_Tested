'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('QuestionChoices', {
			QuestionChoiceId: {
				type: Sequelize.UUID,
				primaryKey: true,
				allowNull: false
			},
			QuestionId: {
				type: Sequelize.UUID,
				allowNull: false,
				primaryKey: false,
				references:{
					model: 'Questions',
					key:'QuestionId'
				}
			},
			ChoiceId: {
				type: Sequelize.UUID,
				primaryKey: false,
				allowNull: false,
				references: {
					model: "Choices",
					key: "ChoiceId"
				}
			}
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('QuestionChoices');
	}
};