const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Definition = require('./models/definition');
const Course = require('./models/course');
const catchAsync = require('./utils/catchAsync');
const AppError = require('./utils/AppError');

mongoose.connect('mongodb://localhost:27017/definitionsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());

app.get('/', (req, res) => {
  res.send('hello world');
});

//get route to find all definitions stored in the DB
app.get(
  '/alldefinitions',
  catchAsync(async (req, res) => {
    const defs = await Definition.find({});
    res.send(defs);
  })
);

//get route to find all courses stored in the DB
app.get(
  '/allcourses',
  catchAsync(async (req, res) => {
    const courses = await Course.find({});
    res.send(courses);
  })
);

//post route to save a new definition to the DB
app.post(
  '/alldefinitions',
  catchAsync(async (req, res) => {
    const newDef = new Definition(req.body);
    await newDef.save();
    await Course.findByIdAndUpdate(
      { _id: req.body.courseId },
      { $push: { definitions: newDef._id } }
    );
    res.send(newDef);
  })
);

//post route to save a new course to the DB
app.post(
  '/allcourses',
  catchAsync(async (req, res) => {
    const newCourse = new Course(req.body);
    await newCourse.save();
    res.send(newCourse);
  })
);

//get route to find a specific definition by the ID
app.get(
  '/alldefinitions/:id',
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const def = await Definition.findById(id);
    res.send(def);
  })
);

//put route to update a definition using id
app.put(
  '/alldefinitions/:id',
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const updatedDef = await Definition.findByIdAndUpdate(id, { ...req.body });
    res.send(updatedDef);
  })
);

//delete route to delete definition using id
app.delete(
  '/alldefinitions/:id',
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const deletedDef = await Definition.findByIdAndDelete(id);
    await Course.findByIdAndUpdate(
      { _id: deletedDef.courseId },
      { $pull: { definitions: deletedDef._id } }
    );
    res.send(deletedDef);
  })
);

//get route to find a definition by string search
//regex used to find terms similar to the searched term
app.get(
  '/search',
  catchAsync(async (req, res) => {
    const searchTerm = req.query.term;
    const foundDefs = await Definition.find({
      term: { $regex: new RegExp(searchTerm, 'i') }
    });
    res.send(foundDefs);
  })
);

//get route to find all definitions from a specified course
//definitions are stored as references in the courses collection
app.get(
  '/courses/:id',
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const response = await Course.findById(id).populate('definitions').exec();
    res.send(response.definitions);
  })
);

app.all('*', (req, res, next) => {
  next(new AppError('Page Not Found', 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = 'Something went wrong' } = err;
  res.status(statusCode).send(message);
});

app.listen(5000, () => {
  console.log('Serving on port 5000');
});
