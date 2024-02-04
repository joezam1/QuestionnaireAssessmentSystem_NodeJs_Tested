'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Registers', {


			RegisterId: {
				type: Sequelize.UUID,
				primaryKey: true,
				allowNull: false
			},
			RegisterIndex: {
				type: Sequelize.INTEGER,
				primaryKey: false,
				unique: true,
				allowNull: false,
				autoIncrement: true
			},
			UserId: {
				type: Sequelize.UUID,
				allowNull: false,
				references:{
					model:'Users',
					key:'UserId'
				},
				onDelete:'CASCADE',
				onUpdate:'CASCADE',
			},
			IsActive: {
				type: Sequelize.BOOLEAN,
				allowNull: false
			},
			UTCDateCreated: {
				type: Sequelize.DATE,
				allowNull: false

			},
			UTCDateClosed: {
				type: Sequelize.DATE,
				allowNull: true
			}
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Registers');
	}
};