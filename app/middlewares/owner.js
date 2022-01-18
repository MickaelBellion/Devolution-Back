const { jwt } = require("../utils");
const { errorMessage } = require('../constants')
const { Project } = require("../models");

//le token est a mettre dans le header/BEARER lors d'une requete

module.exports={

    isOwner :async (request, response, next) => {
        const { user } = request;
        try {
                const project = await Project.findByPk(request.params.id);
                if(!project){
                    return response.status(404).json({
                        "message":"Project Not Found !"
                    });
                }
                if (user.id === project.owner_id) {
                    console.log('Je suis bien le owner du projet : ', project.name)
                    next()
                } else {
                    return response.json({
                        "message":"you are not the owner"
                    })
                }
            } catch (error) {
            console.error(error);
            return response.status(500).send({
                message: "Internal server error. Please retry later",
            });
        }
    },
}