const { Schema, model } = require('mongoose');

const courseSchema = new Schema({
 courseName: {
        type: String,
        require: true
    },
    courseSulg:{
        type: String,
        require: true
    },
    courseDescription: {
        type: String,
        require: true
    },
   
}, { timeseries: true })


model.exports = model('course',courseSchema)