const {  Model, DataTypes } = require('sequelize');
const sequelize = require('../database')

class User extends Model{}
//supprimer le password de toutes lesdonnées renvoyés au front!
User.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  delete values.password;
  return values;
};

User.init({
  email:{
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  pseudo:{
    type: DataTypes.STRING,
  },
  description:{
    type: DataTypes.STRING,
  },
  image_url:{
    type: DataTypes.STRING,
  },
  user_status:{
    type: DataTypes.STRING,
  },
  user_function:{
    type: DataTypes.STRING,
  },
  lastname:{
    type: DataTypes.STRING,
  },
  firstname:{
    type: DataTypes.STRING,
  },

  phone:{
    type: DataTypes.STRING,
  },
  city:{
    type: DataTypes.STRING,
  },
  linkedin: {
    type: DataTypes.TEXT,
  },
  github: {
    type: DataTypes.TEXT,
  },
  twitter: {
    type: DataTypes.TEXT,
  },
  portfolio:{
    type: DataTypes.TEXT,
  },
  facebook: {
    type: DataTypes.TEXT,
  },
  experience: {
    type: DataTypes.STRING,
  },
    role_id: {
      type: DataTypes.INTEGER
    }
  },{
    sequelize,
    tableName: "user"
  });

module.exports=User
