// Wraps an async controller function to catch errors and pass them to next()
const asyncWrap = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncWrap;
