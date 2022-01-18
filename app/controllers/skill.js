const { Op } = require("sequelize");
const { Project, User, Skill} = require("../models");
const errorMessage = require('../constants/error');

module.exports={

    //fonctionne !! 
    getAll: async (request, response, next) => {
      try {
        const skills = await Skill.findAll();
        response.json(skills);
      } catch (error) {
          console.log(error);
          response.json({"message": error})
      }
    },

    getMySkills: async (request, response, next) => {
      const { user } = request;
  
      try {
          const findUser = await User.findByPk(user.id,{
            include:{all:true},
          });
          if(!findUser){
            return response.status(404).json({
              "message":"user Not Found !"
            });
          }
          const result = findUser.users_skills;
          return response.json(result)
      } catch (error) {
          console.log(error);
          response.json({"message": error})
      }
    },


    addSkill : async (request, response, next) => {

      try { 
            const { id } = request.params;
            const user_id  = request.user.id;
            const user = await User.findByPk(user_id, {
              include: ["users_skills"],
            });
            const skill = await Skill.findByPk(id, {
          include: ["users"],
        });
        const newArr = [];
        user.users_skills.map( (skill) => {
          newArr.push(skill.id)
        })
        if ( !newArr.includes(parseInt(id, 10)) == true ){
            await user.addUsers_skill(skill);
            return response.json({"message": "you just add a skill"});
        } else {
            return response.json({"message": "you already have this skill"});
          }
        } catch (error) {
            console.error(error);
            return response.status(500).json({
              message: errorMessage.INTERNAL_ERROR,
            });
        }
    },

    deleteSkill : async (request, response, next) => {
        try {
            const { id } = request.params;
            const user_id  = request.user.id;
            const user = await User.findByPk(user_id);
            const skill = await Skill.findByPk(id, {
          include: ["users"],
        });

        await user.removeUsers_skill(skill);
        response.json({"message": "you just remove a skill"})
        } catch (error) {
            console.error(error);
            return response.status(500).json({
              message: errorMessage.INTERNAL_ERROR,
            });
        }
    },

    getUserSkills : async (request,response)=>{
      try {
        //ici on récupere l'id du user dans l'url si on veut dans un input on passe par request.body
        const user= request.params.id;
        console.log(user)
        const mySkills = await User.findOne({
          include : ['users_skills'],
          where : {id : user}
        });

        response.json(mySkills)

      } catch (error) {
        console.log(error)
      }
    },


    
}
