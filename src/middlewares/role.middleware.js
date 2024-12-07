export const userRole = (req, res, next) => {
  req.body.role = 'USER';
  next();
};

export const adminRole = (req, res, next) => {
  req.body.role = 'ADMIN';
  next();
};
