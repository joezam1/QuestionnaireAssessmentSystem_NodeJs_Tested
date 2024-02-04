'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Roles', {
			RoleId: {
				type: Sequelize.UUID,
				primaryKey: true,
				allowNull: false
			},
			RoleIndex: {
				type: Sequelize.INTEGER,
				primaryKey: false,
				allowNull: false,
				unique: true
			},
			Name: {
				type: Sequelize.STRING,
				allowNull: false
			},
			Description: {
				type: Sequelize.STRING,
				allowNull: false
			},
			IsActive: {
				type: Sequelize.BOOLEAN,
				allowNull: false
			},
			UTCDateCreated: {
				allowNull: false,
				type: Sequelize.DATE
			},
			UTCDateUpdated: {
				type: Sequelize.DATE,
				allowNull: true
			}
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Roles');
	}
};