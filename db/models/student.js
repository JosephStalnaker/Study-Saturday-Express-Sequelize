const Sequelize = require('sequelize');
//const { SET_DEFERRED } = require('sequelize/types/lib/deferrable');
const db = require('../db');

//creating object takes two args name of link, then the object
const Student = db.define('students', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    }
});

//create hooks arg is the instance of student 2nd is a function before creating change case of first and last name
//often used for encryption
Student.beforeCreate((student) => {
    //get the name
    const fName = student.firstName;
    const lName = student.lastName;
    //set the name
    student.firstName = fName[0].toUpperCase() + fName.slice(1);
    student.lastName = lName[0].toUpperCase() + lName.slice(1);
});







module.exports = Student;
