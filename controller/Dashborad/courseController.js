const courseModel = require('../../models/courseModel')

module.exports.course_add = async (req, res, next) => {
    const { courseName, courseDescription } = req.body;

    const error = {};
    if (!courseName) {
        error.courseName = 'please provide your  course Name'
    }
    if (!courseDescription) {
        error.courseDescription = 'please provide your course Description'
    }
    if (Object.keys(error).length === 0) {
        const courseSulg = courseName.trim().split(' ').join('-')
        try {
            const checkCourse = await courseModel.findOne({
                courseSulg
            })
            if (checkCourse) {
                res.status(400).json({
                    errorMessage:
                        { error: 'Already added course' }
                })

            } else {
                await courseModel.create({
                    courseName: courseName.trim(),
                    courseSulg,
                    courseDescription
                })
                res.status(200).json({
                    successMessage: 'Course added successfully'
                })
            }
        } catch (error) {
            res.status(500).json({
                errorMessage:
                    { error: 'Internal Error' }
            })
        }
    } else {
        res.status(400).json({ errorMessage: error })

    }
}

module.exports.course_get = async (req, res) => {
    const { page, searchValue } = req.query;
    const perPage = 3;
    const skipPage = parseInt(page - 1) * perPage;
    if (searchValue === 'undefined' || !searchValue) {
        try {
            const courseCount = await courseModel.find({}).countDocuments();
            const getCourse = await courseModel.find({}).skip(skipPage).limit(perPage).sort({ cateatedAt: 1 })
            res.status(200).json({
                allCourse: getCourse,
                perPage,
                courseCount
            })

        } catch (error) {
            res.status(500).json({
                errorMessage:
                    { error: 'Internal Error' }
            })
        }
    } else {
        try {
            const courseCount = await courseModel.find({})
            let getCourse = await courseModel.find({})
            getCourse = getCourse.filter(course => course.courseName.toUpperCase().indexOf(searchValue.toUpperCase() > 1)
            )
            res.status(200).json({
                allCourse: getCourse,
                perPage,
                courseCount
            })

        } catch (error) {
            res.status(500).json({
                errorMessage:
                    { error: 'Internal Error' }
            })
        }
    }
}
module.exports.course_delete = async (req, res) => {
    const courseId = req.params.courseId
    try {
        const courseDelete = await courseModel.findByIdAndDelete(courseId);
        res.status(200).json({
            successMessage: 'Course deleted successfully'
        })
    } catch (error) {
        res.status(500).json({
            errorMessage:
                { error: 'Internal Error' }
        })
    }
}
module.exports.edit_course = async (req, res) => {

    const courseSulg = req.params.courseSulg

    try {
        const editCourse = await courseModel.findOne({ courseSulg });
        res.status(200).json({
            editCourse
        })
    } catch (error) {
        res.status(500).json({
            errorMessage:
                { error: 'Internal Error' }
        })
    }
}
module.exports.course_update = async (req, res) => {

    const { courseId } = req.params;
    const {courseName, courseDescription } = req.body;
    const error = {};

    if (!courseName) {
        error.courseName = 'Please provide course name';
    }
    if (!courseDescription) {
        error.courseDescription = 'Please provide course description'
    }
    if (Object.keys(error).length == 0) {
        const courseSlug = courseName.trim().split(' ').join('-');
        try {
            await courseModel.findByIdAndUpdate(courseId, {
                courseName: courseName.trim(),
                courseSlug,
                courseDescription
            })
            res.status(200).json({
                successMessage: 'Course update successfull'
            })
        } catch (error) {
            res.status(500).json({
                errorMessage: {
                    error: 'Internal server error'
                }
            })
        }
    } else {
        res.status(400).json({ errorMessage: error });
    }
}
