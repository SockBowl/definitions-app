const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  title: String,
  definitions: [{ type: Schema.Types.ObjectId, ref: 'Definition' }]
});

module.exports = mongoose.model('Course', CourseSchema);
