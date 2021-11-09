const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DefinitionSchema = new Schema({
  term: String,
  definition: String,
  courseId: { type: Schema.Types.ObjectId, ref: 'Course' }
});

module.exports = mongoose.model('Definition', DefinitionSchema);
