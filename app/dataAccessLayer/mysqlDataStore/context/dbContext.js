const Sequelize = require('sequelize');
const sequelizeConfig = require('../../../../configuration/sequelizeORM/sequelizeConfig.js');


const Category = require('../sequelizeORM/models/category.js');
const CategorySubcategory = require('../sequelizeORM/models/categorysubcategory.js');
const Choice = require('../sequelizeORM/models/choice.js');
const Question = require('../sequelizeORM/models/question.js');
const QuestionChoice = require('../sequelizeORM/models/questionchoice.js');
const Questionnaire = require('../sequelizeORM/models/questionnaire.js');
const Response = require('../sequelizeORM/models/response.js');
const ResponseStatement = require('../sequelizeORM/models/responsestatement.js');
const Section = require('../sequelizeORM/models/section.js');
const Subcategory = require('../sequelizeORM/models/subcategory.js');
const User = require('../sequelizeORM/models/user.js');



let sequelizeConnection = null;
let allSequelizeDtoModels = null;

const getActiveDatabaseName = function(){
    const databaseName = sequelizeConfig.emptyConnection.database;
    return databaseName;
}

const getSequelizeContext = function(){
    if(allSequelizeDtoModels === null){
        const sequelize = getSequelizeConnection();
        const allDataTypes = Sequelize.DataTypes;

        const CategoryDtoModel = Category(sequelize,allDataTypes);
        const CategorySubcategoryDtoModel = CategorySubcategory(sequelize, allDataTypes);
        const ChoiceDtoModel = Choice(sequelize, allDataTypes);
        const QuestionDtoModel = Question(sequelize, allDataTypes);
        const QuestionChoiceDtoModel = QuestionChoice(sequelize, allDataTypes);
        const QuestionnaireDtoModel = Questionnaire(sequelize,allDataTypes);
        const ResponseDtoModel = Response(sequelize, allDataTypes);
        const ResponseStatementDtoModel = ResponseStatement(sequelize, allDataTypes);
        const SectionDtoModel = Section(sequelize, allDataTypes);
        const SubcategoryDtoModel = Subcategory(sequelize, allDataTypes);
        const UserDtoModel = User(sequelize, allDataTypes);

        
        allSequelizeDtoModels = {
            CategoryDtoModel : CategoryDtoModel,
            CategorySubcategoryDtoModel : CategorySubcategoryDtoModel,
            ChoiceDtoModel : ChoiceDtoModel,
            QuestionDtoModel : QuestionDtoModel,
            QuestionChoiceDtoModel : QuestionChoiceDtoModel,
            QuestionnaireDtoModel : QuestionnaireDtoModel,
            ResponseDtoModel : ResponseDtoModel,
            ResponseStatementDtoModel : ResponseStatementDtoModel,
            SectionDtoModel : SectionDtoModel,
            SubcategoryDtoModel : SubcategoryDtoModel,
            UserDtoModel : UserDtoModel
        }

        return allSequelizeDtoModels;
    }
    
    return allSequelizeDtoModels;
}

const dbContext = Object.freeze({
    getActiveDatabaseName: getActiveDatabaseName,
    getSequelizeContext : getSequelizeContext
});

module.exports = dbContext;

//#REGION Private Functions
function getSequelizeConnection(){
    if(sequelizeConnection == null){
        const database = sequelizeConfig.emptyConnection.database;
        const username = sequelizeConfig.emptyConnection.username;
        const password = sequelizeConfig.emptyConnection.password;
        const options = sequelizeConfig.emptyConnection.options;
        sequelizeConnection = new Sequelize(database, username, password, options)
    }
    return sequelizeConnection;
}

//#ENDREGION Private Functions