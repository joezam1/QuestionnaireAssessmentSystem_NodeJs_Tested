'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Questions', {
			QuestionId: {
				type: Sequelize.UUID,
				primaryKey: true,
				allowNull: false
			},
			QuestionNumber:{
				type:Sequelize.INTEGER,	
				allowNull:false
			  },
			Text: {
				type: Sequelize.TEXT,
				allowNull: false
			},
			SectionId: {
				type: Sequelize.UUID,
				allowNull: false,
				references:{
					model:"Sections",
					key:"SectionId"
				}
			},
			CategorySubcategoryId: {
				type: Sequelize.UUID,
				allowNull: false,
				references:{
					model:"CategorySubcategories",
					key:"CategorySubcategoryId"
				}
			},
			Value: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			UTCDateCreated: {
				type: Sequelize.DATE,
				allowNull: false
			},
			UTCDateUpdated: {
				type: Sequelize.DATE,
				allowNull: true
			},
			UTCDateArchived: {
				type: Sequelize.DATE,
				allowNull: true
			}
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Questions');
	}
};