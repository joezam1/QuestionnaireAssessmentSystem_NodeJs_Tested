'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Sessions', {
			SessionId: {
				type: Sequelize.UUID,
				primaryKey: true,
				allowNull: false
			},
			UserId: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: 'Users',
					key: 'UserId'
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE'
			},
			SessionToken: {
				type: Sequelize.TEXT,
				allowNull: false
			},
			Expires: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			Data: {
				type: Sequelize.TEXT,
				allowNull: false
			},
			IsActive: {
				type: Sequelize.BOOLEAN,
				allowNull: false
			},
			UTCDateCreated: {
				type: Sequelize.DATE,
				allowNull: false
			},
			UTCDateExpired: {
				type: Sequelize.DATE,
				allowNull: true
			}
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Sessions');
	}
};