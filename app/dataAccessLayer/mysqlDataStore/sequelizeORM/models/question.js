'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Question extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Question.belongsTo(models.Section,{
				foreignKey:"SectionId"
			});
			Question.belongsTo(models.CategorySubcategory,{
				foreignKey:"CategorySubcategoryId"
			});

			Question.belongsToMany(models.Choice,{
				through:models.QuestionChoice,
				foreignKey:"ChoiceId"
			});

			Question.hasMany(models.Response,{
				foreignKey:"QuestionId"
			});
		}
	}
	Question.init({
		QuestionId: {
			type: DataTypes.UUID,
			primaryKey: true,
			allowNull: false,
			value: undefined
		},				
		QuestionNumber:{
			type:DataTypes.INTEGER,	
			allowNull:false,
			value:undefined
		  },
		Text:{
			type: DataTypes.TEXT,
			allowNull:false,
			value:undefined
		},
		SectionId:{
			type:DataTypes.UUID,
			allowNull:false,
			value:undefined
		},
		CategorySubcategoryId: {
			type:DataTypes.UUID,
			allowNull:false,
			value:undefined
		},
		Value:{
			type:DataTypes.INTEGER,
			allowNull:false,
			value:undefined
		},
		UTCDateCreated: {
            type: DataTypes.DATE,
            allowNull: false,
            value: undefined
        },
        UTCDateUpdated: {
            type: DataTypes.DATE,
            allowNull: true,
            value: undefined
        },
		UTCDateArchived:{
			type: DataTypes.DATE,
            allowNull: true,
            value: undefined
		}

	}, {
		sequelize,
		modelName: 'Question',
	});
	return Question;
};