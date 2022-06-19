const router = require('express').Router();

const {course_add,course_get,course_delete,edit_course,course_update} = require('../../controller/Dashborad/courseController')


router.post('/add-course',course_add)
router.get('/get-course',course_get)
router.delete('/delete-course/:courseId',course_delete)
router.get('/edit-course/:courseSulg',edit_course);
router.patch('/update-course/:courseId', course_update);

module.exports = router;