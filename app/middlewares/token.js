const { jwt } = require("../utils");
const { errorMessage } = require('../constants')
const { User, Project, Skill} = require("../models");

//le token est a mettre dans le header/BEARER lors d'une requete

module.exports={
  //isLogged
  authenticate : (request, response,next) => {
    const authHeader = request.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if (token === "undefined" || !token) {
        return response.status(401).send({
            message: errorMessage.MISSING_TOKEN
        });
    }

    jwt.verifyAccessToken(token, (err, user) => {
        if (err) {
            return response.status(401).send({
                message: errorMessage.TOKEN_AUTH_FAILED,
            });
        }
        console.log('Je suis bien auth en tant que : ', user.email)
        request.user = user;
        next();
    });
  },
  
  

  refreshToken: (req, res) => {
    const refreshToken = req.body.token;

    if (!refreshToken) {
      return res.status(400).json({ message: errorMessage.MISSING_TOKEN });
    }

    const token = Token.findOne({
      where: {
        token: refreshToken,
      },
    });

    if (!token) {
      return res.status(400).json({ message: errorMessage.INVALID_TOKEN });
    }

    jwt.verifyRefreshToken(refreshToken, (err, user) => {
      if (err) return res.status(400).json({ message: errorMessage.INVALID_TOKEN });
      const accessToken = jwt.generateAccessToken({
        name: user.name,
      });
      res.json({
        accessToken,
      });
    });
  },

}
