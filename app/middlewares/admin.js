const { request } = require("express");

module.exports = {
  checkPermission: (request, response, next) => {
      if (request.user.role !== 'admin') {
          return res.status(401).send({
              message: "You are not allowed to access this. Please login",
              data: null,
          });
      }
      next();
  },
};
