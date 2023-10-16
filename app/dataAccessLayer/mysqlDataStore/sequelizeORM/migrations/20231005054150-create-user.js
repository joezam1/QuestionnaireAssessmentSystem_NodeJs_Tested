'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      UserId: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false
      },
      UserIndex:{
        type:Sequelize.INTEGER,
        primaryKey: false,
        unique: true,
				allowNull:false,
				autoIncrement:true,
      },
      FirstName:{
        type:Sequelize.STRING,
        allowNull:false
      },
      MiddleName:{
        type:Sequelize.STRING,
        allowNull:true
      },
      LastName:{
        type:Sequelize.STRING,
        allowNull:false
      },
      Username:{
        type:Sequelize.STRING,
        allowNull:false
      },
      Email:{
        type:Sequelize.STRING,
        allowNull:false
      },
      Password:{
        type:Sequelize.STRING,
        allowNull:false
      },
      Sex:{
        type:Sequelize.STRING,
        allowNull:false
      },
      IsActive:{
        type:Sequelize.BOOLEAN,
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
    await queryInterface.dropTable('Users');
  }
};