const mongoose = require('mongoose');
const Definition = require('../models/definition');
const Course = require('../models/course');
const { seedData } = require('./seedData');

mongoose.connect('mongodb://localhost:27017/definitionsDB', {
  useNewUrlParser: true, //MongoDB driver has deprecated their current string parser. useNewUrlParser allows users to fall back to the old parser. Should be true unless it's preventing connection.
  useUnifiedTopology: true //set to true to opt in to using MongoDB driver's new connection management engine. Should be true unless it prevents a stable connection.
});

const db = mongoose.connection;
//on any error, the error will print in the console.
db.on('error', (err) => {
  console.error('Error in MongoDb connection: ' + err);
  mongoose.disconnect(); // Trigger disconnect on any error
});

//when database is disconnected
db.on('disconnected', () => {
  console.info('MongoDb disconnected');
});

//when database connection is open
db.once('open', () => {
  console.log('MongoDb connected');
});

const insertSeeds = async () => {
  let defs = [];
  //iterate over seed data and create new definition/course documents
  const courses = seedData.map((course) => {
    const courseArr = [];
    const newCourse = new Course({
      title: course.title,
      definitions: []
    });

    const newDefs = course.definitions.map((def) => {
      const newDef = new Definition({ course: newCourse._id, ...def });
      courseArr.push(newDef._id);
      return newDef;
    });
    defs = [...defs, ...newDefs];
    newCourse.definitions = courseArr;
    return newCourse;
  });

  //Save new definitions to the db
  const storeDefs = Definition.insertMany(defs);

  //Save new courses to the db
  const storeCourses = Course.insertMany(courses);

  //combines both promises returned from the insertmany calls in to one promise
  return Promise.all([storeDefs, storeCourses]);
};

//called to remove old documents, then insert new documents, then close the database connection
const seedDB = async () => {
  await Definition.deleteMany({});
  await Course.deleteMany({});
  await insertSeeds()
    .then((docs) => {
      console.info('Database Successfully seeded');
      mongoose.disconnect();
    })
    .catch((err) => {
      console.error('Uh, oh something went wrong: ', err);
    });
};

seedDB();
