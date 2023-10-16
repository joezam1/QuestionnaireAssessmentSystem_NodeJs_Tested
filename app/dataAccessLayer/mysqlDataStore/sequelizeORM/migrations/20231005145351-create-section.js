'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Sections', {
			SectionId: {
				type: Sequelize.UUID,
				primaryKey: true,
				allowNull: false
			},
			SectionIndex: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: false,
				unique: true,
				autoIncrement: true
			},
			Name: {
				type: Sequelize.STRING,
				allowNull: false
			},
			Description: {
				type: Sequelize.TEXT,
				allowNull: false
			},
			QuestionnaireId: {
				type: Sequelize.UUID,
				allowNull: false,
				references:{
					model:"Questionnaires",
					key:"QuestionnaireId"
				},
				onDelete:"CASCADE",
				onUpdate:"CASCADE"
			},
			UTCDateCreated: {
				type: Sequelize.DATE,
				allowNull: false
			},
			UTCDateUpdated: {
				type: Sequelize.DATE,
				allowNull: true
			}
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Sections');
	}
};