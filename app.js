const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const db = require('./db/db');

const students = require('./routes/students');
const tests = require('./routes/tests');

const app = express();


//middleware
app.use(bodyParser.json());//what does this really mean?? 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));//what does this really mean

//routes
app.use('/students', students);//click a button the arg goes to students route
app.use('/tests', tests);

//error handling of internal error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

//an async function sync database pulling from the db/db/
const init = async () => {
//what does this really mean
  if (require.main === module){
    //will only run when run with npm start and not with npm test to avoid db syncing in multiple threads when running tests
    try {
      await db.sync();
      app.listen(3000, () => {
        console.log('Server is listening on port 3000!');
      })
    } catch (err) {
      console.error(err);
    }
  }

}

init();

module.exports = app;
