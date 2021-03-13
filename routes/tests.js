const Student = require('../db/models/student');
const Test = require('../db/models/test');

const router = require('express').Router();


//get all test routes

router.get("/", async (req, res, next) => {
   try {
    const tests = await Test.findAll();

    res.send(tests)
   } 
   catch (error) {
       next(error)
   }
})

module.exports = router;

router.get("/:id", async (req, res, next) => {
    try {
        const individualTest = await Test.findByPk(req.params.id);

        if (individualTest) {
            res.status(200).send(individualTest)
        }
        else {
            res.status(404).send("TEST NOT FOUND'")
        }
        
    } catch (error) {
        next(error)
    }
})

router.post("/student/:studentId", async (req, res, next) => {
    try {
        //create a test
        let test = await Test.create(req.body)
        //create a student
        const student = await Student.findByPk(req.params.studentId)
        //set test on to student
        let studentTest = await test.setStudent(student)
        res.status(201).send(studentTest)
    } catch (error) {
        next(error)
    }

})

router.delete('/:id', async (req, res, next) => {
    try {
      await Test.destroy({ where: { id: req.params.id } })
      res.status(204).send()
    } catch (error) {
      next(error)
    }
  })

