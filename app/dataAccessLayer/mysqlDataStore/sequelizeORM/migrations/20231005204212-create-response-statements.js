'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('ResponseStatements', {
			ResponseStatementId: {
				type: Sequelize.UUID,
				primaryKey: true,
				allowNull: false
			},				
			Name:{
				type:Sequelize.TEXT,
				allowNull:false,
				value:undefined
			},
			QuestionnaireId: {
				type: Sequelize.UUID,
				primaryKey: false,
				allowNull: false,
				references:{
					model:"Questionnaires",
					key: "QuestionnaireId"
				}
			},
			UserId: {
				type: Sequelize.UUID,
				primaryKey: false,
				allowNull: false,
				references:{
					model:"Users",
					key:"UserId"
				}
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
		await queryInterface.dropTable('ResponseStatements');
	}
};