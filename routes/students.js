const { ne } = require('sequelize/types/lib/operators');
const Student = require('../db/models/student');

const router = require('express').Router();


//create route to get all students
router.get("/", async (req, res, next) => {
    try {
        const students = await Student.findAll();
        if (students) (
            res.send(students) 
        )
        else {
            res.status(404).send('Students not found')
        }
    }
    catch (error) {
        next(error);
    }
});

//create route for single student id
router.get("/:id", async (req, res, next) => {
    try {
        const individualStudent = await Student.findByPk(req.params.id);
        //console.log(individualStudent)
        if (individualStudent) {
            res.send(individualStudent) 
        }
        else {
            res.status(404).send('Students does not exist')
        }
            }
    catch (error) {
        next(error);
    }
});

//create route post
router.post("/", async (req, res, next) => {
    try {
        const student = await Student.create(req.body)
        res.status(201).send(student)
    } catch (error) {
        next(error)
    }
});

//create route put
router.put("/:id", async (req, res, next) => {
    try {
        const id = req.params.id
        const updatedStudent = await Student.update(req.body, {
            where: {id: id},
            returning: true,
            plain: true
        });
        //console.log(updatedStudent)
        res.send(updatedStudent[1])
    } catch (error) {
        next(error)
    }
});

//delete a specific id
// router.delete("/:id", async (req, res, next) => {
//     try {
//         const id = req.params.id
//         await Student.destroy( { where: {id: id} })
//         res.sendStatus(204)
//     } catch (error) {
//         next(error)
//     }
// });



module.exports = router;
