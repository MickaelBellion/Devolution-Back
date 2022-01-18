const {
  Project,
  User
} = require("../models");
const {
  Op
} = require("sequelize");
const {
  errorMessage
} = require('../constants');
const projectSchema = require("../validations_schema/projectSchema");




module.exports = {


  getAll: async (request, response, next) => {
    try {
      const projects = await Project.findAll();
      response.json(projects);
    } catch (error) {
      console.log(error)
    }
  },

  getOne: async (request, response) => {

    try {

      const project = await Project.findByPk(request.params.id, {
        include: ['participants']
      });
      if (!project) {
        return response.status(404).json({
          "message": "Project Not Found !"
        });
      }

      return response.json({
        project
      })
    } catch (error) {
      console.error(error);
      return response.status(500).send({
        message: "Internal server error. Please retry later",
      });
    }

  },

  search: async (request, response) => {
    try {
      const search = request.params.search;
      console.log(request.params.search)
      const project = await Project.findAll({
        include:{all:true},
        where: {
          name: {

            [Op.iLike]: `%${search}%`
          },
        }
      });
      response.json(project);
    } catch (error) {
      console.log(error)
    }
  },
  create: async (request, response) => {
    try {
      const {
        name,
        is_available,
        description,
        need_of_the_project,
        beginning_date,
        icon
      } = request.body;
      const result = await projectSchema.validateAsync(request.body);
      console.log(result)
      console.log(request)

      const newProject = await Project.create({
        name: name,
        is_available: is_available,
        description: description,
        need_of_the_project: need_of_the_project,
        beginning_date: beginning_date,
        icon: icon,
        owner_id: request.user.id
      });
      console.log(newProject);
      if (newProject) {
        return response.json({
          "message": "Votre projet a été créer!"
        });
      }
    } catch (error) {
      console.log(error);
      return response.status(422).json(error.details)
    }
  },
  updateOne: async (req, res, next) => {
    try {
      const projectToUpdate = await Project.findByPk(req.params.id);
      console.log(projectToUpdate)
      if (!projectToUpdate) {
        return res.status(404).json({
          message: "project not found",
        });
      }

      await projectToUpdate.update({
        ...req.body,
      });

      return res.status(200).json({
        message: "Informations updated",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        message: "Internal server error. Please retry later",
      });
    }
    next()
  },

  teamInProject: async (request, response) => {
    try {
      const user = request.params.id;
      const participatedAt = await Project.findAll({
        include: ['participants'],
        where: {
          id: user
        }
      });
      response.json({
        participatedAt
      })
    } catch (error) {
      console.log(error);
      response.status(500).json({
        errorMessage: UNAUTHORIZED
      })
    }
  },

  deleteOne: async (request, response, next) => {
    try {
      const projectToDelete = await Project.findByPk(request.params.id);
      console.log(projectToDelete);
      if (!projectToDelete) {
        return response.status(404).json({
          "message": "Project Not Found !"
        });
      }
      await projectToDelete.destroy()
      return response.json({
        "message": "Your project is deleted"
      })
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        message: "Internal server error. Please retry later",
      });
    }

  },

  addToTeam: async (request, response) => {
    try {
      const {
        id
      } = request.params;
      const user_id = request.user.id;

      const user = await User.findByPk(user_id);
      const project = await Project.findByPk(id, {
        include: ["participants"],
      });

      await project.addParticipant(user);

      response.status(200).json({
        message: errorMessage.SUBSCRIBE_SUCCESS,
      });
    } catch (error) {
      console.error(error);
      return response.status(500).json({
        message: errorMessage.INTERNAL_ERROR,
      });
    }
  },

  removeFromTeam: async (request, response) => {
    try {
      const {
        id
      } = request.params;
      const user_id = request.user.id;
      const user = await User.findByPk(user_id);

      const project = await Project.findByPk(id, {
        include: ["participants"],
      });

      await project.removeParticipant(user);

      response.status(200).json({
        message: errorMessage.REMOVE_SUCCESS,
      });
    } catch (error) {
      console.error(error);
      return response.status(500).json({
        message: errorMessage.INTERNAL_ERROR,
      });
    }
  },

  removeFromMyProject: async (request, response) => {
    try {
      const {
        id,
        user
      } = request.params;
      const user_id = request.user.id;
      const userExist = await User.findByPk(user);
      if (!userExist) {
        return response.status(404).json({
          message: "Ressource (user) non trouvée",
        });
      };
      const project = await Project.findByPk(id, {
        include: ["participants"],
      });
      // Si on est pas le OWNER
      if (user_id != user) {
        const test = await project.removeParticipant(user);
        return response.status(200).json({
          message: errorMessage.REMOVE_FROM_MY_TEAM_SUCCESS,
        });
      } else {
        return response.status(203).json({
          message: "Vous ne pouvez pas vous supprimez vous-même de votre projet !",
        });
      }
    } catch (error) {
      console.error(error);
      return response.status(500).json({
        message: errorMessage.INTERNAL_ERROR,
      });
    }
  }


}