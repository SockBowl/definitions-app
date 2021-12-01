const mongoose = require('mongoose');
const AppError = require('./AppError');

//basically just a try/catch
module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      //catches invalid ObjectID's
      if (err instanceof mongoose.Error.CastError) {
        err = new AppError('Data not found', 404);
      }
      next(err);
    });
  };
};
