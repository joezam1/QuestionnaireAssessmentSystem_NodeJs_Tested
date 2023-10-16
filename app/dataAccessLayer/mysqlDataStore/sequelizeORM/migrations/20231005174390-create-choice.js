'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Choices', {
			ChoiceId: {
				type: Sequelize.UUID,
				primaryKey: true,
				allowNull: false
			},
			Name: {
				type: Sequelize.TEXT,
				allowNull: false
			},
			Value: {
				type: Sequelize.INTEGER,
				allowNull: false
			},			
			CategorySubcategoryId: {
				type: Sequelize.UUID,
				allowNull: false,
				references:{
					model:"CategorySubcategories",
					key:"CategorySubcategoryId"
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
		await queryInterface.dropTable('Choices');
	}
};