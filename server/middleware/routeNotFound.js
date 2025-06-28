const routeNotFound = (req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
};

module.exports = routeNotFound;
