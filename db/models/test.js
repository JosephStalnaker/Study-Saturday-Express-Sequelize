const Sequelize = require('sequelize');
const db = require('../db');
const Student = require('./student');

//create test model first arg is the file name and the second is the object model
const Test = db.define('test', {
    subject: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    grade: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
});

//create association test belongs to student
Test.belongsTo(Student);

module.exports = Test;
