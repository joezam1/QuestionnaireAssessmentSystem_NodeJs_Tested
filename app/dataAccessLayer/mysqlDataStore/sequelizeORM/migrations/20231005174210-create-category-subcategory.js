'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('CategorySubcategories', {

			CategorySubcategoryId: {
				type: Sequelize.UUID,
				primaryKey: true,
				allowNull: false,
			},
			CategoryId: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: "Categories",
					key: "CategoryId"
				},
				onDelete: "CASCADE",
				onUpdate: "CASCADE"

			},
			SubcategoryId: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: "Subcategories",
					key: "SubcategoryId"
				},
				onDelete: "CASCADE",
				onUpdate: "CASCADE"
			}
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('CategorySubcategories');
	}
};