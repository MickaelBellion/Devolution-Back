const { Op } = require("sequelize");
const {
  Project,
  User
} = require("../models");


const mainController = {
  homePage: async (request, response, next) => {
    try {
      const projects = await Project.findAll({limit: 3,order: [['updatedAt', 'DESC']]});
      response.json(projects);
    } catch (error) {
      console.log(error)
    }
  },


};

module.exports=mainController
