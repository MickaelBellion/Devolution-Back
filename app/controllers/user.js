const {
  User,
  Project,
  Skill
} = require("../models");
const Token = require('../models/Token');
const nodeMailer = require('../mail/nodeMailer');
const bcrypt = require('bcrypt');
const {
  Op
} = require("sequelize");
const sequelize = require("../database")
const {
  jwt
} = require('../utils')
const errorMessage = require('../constants/error');
const userSchema = require("../validations_schema/userSchema");

const userController = {

  login: async (request, response) => {
    try {
      //dans l'objet request.body je veux le login et le password stocker dans une const.
      const {
        login,
        password
      } = request.body;

      if (!login || !password) {
        return response.status(400).json({
          message: errorMessage.MISSING_CREDENTIALS,
        });
      }
      const user = await User.findOne({
        where: {
          [Op.or]: {
            pseudo: {
              [Op.iLike]: login,
            },
            email: {
              [Op.iLike]: login,
            },
          },
        },
      });
      if (!user) {
        return response.status(404).json({
          message: errorMessage.EMAIL_NOT_FOUND,
        });
      };
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return response.status(400).json({
          message: errorMessage.PASSWORD_NOT_MATCH,
          login,
        });
      }

      const userData = user.toJSON();
      const accessToken = jwt.generateAccessToken(userData);
      const refreshToken = jwt.generateRefreshToken(userData);


      // const tokenToSave = await Token.create({
      //   user_id: user.id,
      //   token: refreshToken,
      // });

      // await tokenToSave.save();

      return response.json({
        ...userData,
        accessToken,
        refreshToken,
      });

    } catch (error) {
      console.log(error)
      response.status(500).json({
        "message": "Veuillez tentez de vous reconnecter, créer un compte si vous n'en avez pas"
      })
    }
  },

  signUp: async (request, response) => {

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(request.body.password, salt);
    try {
      const {
        email,
        pseudo,
        lastname,
        firstname
      } = request.body;
      const result = await userSchema.validateAsync(request.body);

      const newUser = await User.create({
        email: email,
        password: encryptedPassword,
        pseudo: pseudo,
        lastname: lastname,
        firstname: firstname,
        // image_url:image_url,
        // description:description,
        // city,

      });

      if (newUser) {
        const transporter = await nodeMailer.createTransport();
        const configEmail = await nodeMailer.createOptionMail(email);

        if (configEmail) await nodeMailer.sendEmail(transporter, configEmail);

        const message = `Merci ${firstname}, Votre compte a été créé. Vous pouvez dès à présent vous connecter!`
        return response.json({
          "message": message
        });
      }

    } catch (error) {
      console.log(error);
      return response.status(422).json(error.errors)
    }
  },

  logout: async (request, response) => {
    try {
      return response.status(200).json({
        token: null
      });
    } catch (error) {
      console.log(error)
    }
  },


  searchUser: async (request, response) => {
    try {

      //mettre dans cette forme pour le TP !!! recherche dans les query !
      // const {search} = request.params;
      // console.log(request.query);


      const search = request.params.search;

      const request = {
        text: `SELECT *
        FROM "user"
        WHERE "id" IN
        (
          SELECT DISTINCT "user"."id"
          FROM "user" 
          JOIN "user_has_skills" 
          ON "user_has_skills"."user_id" = "user"."id" 
          JOIN "skill"  on "skill"."id" = "user_has_skills"."skill_id"
          WHERE "user"."firstname" 
          ILIKE '%${$1}%' 
          OR "user"."lastname"
          ILIKE '%${$1}%' 
          OR "user"."email" 
          ILIKE '%${$1}%' 
          OR "user"."pseudo" 
          ILIKE '%${$1}%' 
          OR "skill"."label" 
          ILIKE '%${$1}%'
        );`,
        values: [search]
      }
      // console.log(request.params);
      // console.log(sequelize)
      const find = await sequelize.query(request);
       find[0].password===null;
      response.json(find[0]);
    } catch (error) {
      console.log(error)
    }
  },


  getMe: async (request, response) => {
    const {
      user
    } = request;

    try {
      const findUser = await User.findByPk(user.id, {
        include: {
          all: true
        },
      });
      const findProject = await Project.findAll({
        where: {
          owner_id: user.id
        }
      })

      if (!findUser) {
        return response.status(404).json({
          "message": "user Not Found !"
        });
      }

      return response.json({
        findUser,
        findProject
      })
    } catch (error) {
      console.error(error);
      return response.status(500).send({
        message: "Internal server error. Please retry later",
      });
    }

  },

  getAll: async (request, response, next) => {
    try {
      const users = await User.findAll();
      response.json(users);
    } catch (error) {
      console.log(error)
    }
  },

  getOne: async (request, response) => {
    try {
      const user = await User.findByPk(request.params.id);
      console.log(user);
      if (!user) {
        return response.status(404).json({
          "message": "user Not Found !"
        });
      }

      return response.json({
        user
      })
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        message: "Internal server error. Please retry later",
      });
    }

  },


  updateOne: async (request, res, next) => {
    console.log('je passe par le updateOne')
    try {
      const userToUpdate = await User.findByPk(request.params.id);
      console.log(userToUpdate)
      if (!userToUpdate) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      await userToUpdate.update({
        ...request.body,
      });
      //const result = {...request.body} cibler le champ qui a été modifier .
      return res.status(200).json({
        message: `Informations updated `
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        message: "Internal server error. Please retry later",
      });
    }
    next()
  },

  deleteOne: async (request, response) => {
    try {
      const userToDelete = await User.findByPk(request.params.id);
      console.log(userToDelete);
      if (!userToDelete) {
        return response.status(404).json({
          "message": "user Not Found !"
        });
      }
      await userToDelete.destroy()
      return response.json({
        "message": "Your user is deleted"
      })
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        message: "Internal server error. Please retry later",
      });
    }

  },



  getMyCreatedProject: async (request, response, next) => {
    try {
      const owner = request.params.id
      const myProject = await Project.findAll({
        where: {
          owner_id: owner
        }
      });
      response.json({
        "My Created Projects": myProject
      })
    } catch (error) {
      console.log(error);
      response.status(500).json({
        errorMessage: UNAUTHORIZED
      })
    }
  },


}

module.exports = userController