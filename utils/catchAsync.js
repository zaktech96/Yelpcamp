/**
 * Catch async errors with this middleware
 * @param {Function} func Middleware function to return an error
 * @returns 
 */
const catchAsync = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch(next);
  };
};

module.exports = catchAsync;