'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Categories', {
			CategoryId: {
				type: Sequelize.UUID,
				primaryKey:true,
				allowNull:false
			},		
			Name:{
				type: Sequelize.STRING,
				allowNull:false
			},
			Description:{
				type:Sequelize.TEXT,
				allowNull:false
			},
			UTCDateCreated:{
				type:Sequelize.DATE,
				allowNull:false
			},
			UTCDateUpdated:{
				type:Sequelize.DATE,
				allowNull:true
			},
			UTCDateArchived:{
				type:Sequelize.DATE,
				allowNull:true
			}
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Categories');
	}
};