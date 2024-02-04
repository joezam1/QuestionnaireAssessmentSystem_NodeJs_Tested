const genericsqlQueryStatement = Object.freeze({
    selectWherePropertyEqualsAnd: 0,
    selectAllFromTable:1,
    insertIntoTableValues:2,
    deleteFromTableWhere:3,
    updateTableSetColumnValuesWhere:4,
    insertMultipleRowsIntoTableValues:5,
    0:'selectWherePropertyEqualsAnd',
    1:'selectAllFromTable',
    2:'insertIntoTableValues',
    3:'deleteFromTableWhere',
    4:'updateTableSetColumnValuesWhere',
    5:'insertMultipleRowsIntoTableValues'

});

module.exports = genericsqlQueryStatement;