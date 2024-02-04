'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('UserRoles', {
			UserRoleId: {
				type: Sequelize.UUID,
				allowNull: false,
				primaryKey: true
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
			RoleId: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: 'Roles',
					key: 'RoleId'
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE'
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('UserRoles');
	}
};