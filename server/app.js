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
  '/definitions',
  catchAsync(async (req, res) => {
    const defs = await Definition.find({}).populate('course', 'title');
    res.send(defs);
  })
);

//get route to find all courses stored in the DB
app.get(
  '/courses',
  catchAsync(async (req, res) => {
    const courses = await Course.find({});
    res.send(courses);
  })
);

//get route to find a specific definition by the ID
app.get(
  '/definitions/:id',
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const def = await Definition.findById(id).populate('course', 'title');
    //in some cases mongoose will consider invalid ObjectID's valid. (https://stackoverflow.com/questions/13850819/can-i-determine-if-a-string-is-a-mongodb-objectid)
    //This will catch the valild invalid ObjectID
    if (!def) {
      throw new AppError('Data not found', 404);
    }
    res.send(def);
  })
);

//get route to find all definitions from a specified course
//definitions are stored as references in the courses collection
app.get(
  '/courses/:id',
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const course = await Course.findById(id).populate({
      path: 'definitions',
      populate: { path: 'course', select: 'title' }
    });
    if (!course) {
      throw new AppError('Data not found', 404);
    }
    res.send(course.definitions);
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

//post route to save a new definition to the DB
app.post(
  '/definitions',
  catchAsync(async (req, res) => {
    const newDef = new Definition(req.body);
    const updatedCourse = await Course.findByIdAndUpdate(
      { _id: req.body.course },
      { $push: { definitions: newDef._id } }
    );

    if (!updatedCourse) {
      throw new AppError('Data not found', 404);
    }

    await newDef.save();
    res.send(newDef);
  })
);

//post route to save a new course to the DB
app.post(
  '/courses',
  catchAsync(async (req, res) => {
    const newCourse = new Course(req.body);
    await newCourse.save();
    res.send(newCourse);
  })
);

//put route to update a definition using id
app.put(
  '/definitions/:id',
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const { courseId, oldCourseId } = req.body;
    const updatedDef = await Definition.findByIdAndUpdate(id, {
      ...req.body,
      course: courseId
    });

    if (!updatedCourse) {
      throw new AppError('Data not found', 404);
    }

    if (courseId !== oldCourseId) {
      const oldCourse = await Course.findByIdAndUpdate(
        { _id: oldCourseId },
        { $pull: { definitions: updatedDef._id } }
      );
      const updatedCourse = await Course.findByIdAndUpdate(
        { _id: courseId },
        { $addToSet: { definitions: updatedDef._id } }
      );

      if (!oldCourse || !updatedCourse) {
        throw new AppError('Data not found', 404);
      }
    }
    res.send(updatedDef);
  })
);

//Update route for course title
app.put(
  '/courses/:id',
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const updatedCourse = await Course.findByIdAndUpdate(id, {
      ...req.body
    });

    if (!updatedCourse) {
      throw new AppError('Data not found', 404);
    }

    res.send(updatedCourse);
  })
);

//delete route to delete definition using id
app.delete(
  '/definitions/:id',
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const deletedDef = await Definition.findByIdAndDelete(id);

    if (!deletedDef) {
      throw new AppError('Data not found', 404);
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      { _id: deletedDef.course },
      { $pull: { definitions: deletedDef._id } }
    );

    if (!updatedCourse) {
      throw new AppError('Data not found', 404);
    }

    res.send(deletedDef);
  })
);

//delete route to delete course using id
app.delete(
  '/courses/:id',
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
      throw new AppError('Data not found', 404);
    }

    const unassignedCourse = await Course.findOneAndUpdate(
      { title: 'unassigned' },
      { $addToSet: { definitions: { $each: deletedCourse.definitions } } },
      { new: true, upsert: true }
    );

    await Definition.updateMany(
      { course: deletedCourse._id },
      { $set: { course: unassignedCourse._id } }
    );

    res.send(unassignedCourse);
  })
);

app.all('*', (req, res, next) => {
  next(new AppError('Not Found', 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = 'Something went wrong' } = err;
  res.status(statusCode).send(message);
});

app.listen(5000, () => {
  console.log('Serving on port 5000');
});
