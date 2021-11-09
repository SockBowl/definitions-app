const mongoose = require('mongoose');
const Definition = require('../models/definition');
const Course = require('../models/course');
const { seedData } = require('./seedData');

mongoose.connect('mongodb://localhost:27017/definitionsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const seedDB = async () => {
  await Definition.deleteMany({});
  await Course.deleteMany({});
  await seedData.map((course) => {
    const courseArr = [];
    const newCourse = new Course({
      title: course.title,
      definitions: []
    });

    course.definitions.map((def) => {
      const newDef = new Definition({ courseId: newCourse._id, ...def });
      console.log(newDef);
      courseArr.push(newDef._id);
      newDef.save();
    });

    newCourse.definitions = courseArr;
    newCourse.save();
  });
};

const showDefs = async () => {
  const definitions = await Definition.find({});
  console.log(definitions);
};

// showDefs();
seedDB();
