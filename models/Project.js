const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database')

class Project extends Model{}
Project.init({
    name:DataTypes.STRING,
    is_available:DataTypes.BOOLEAN,
    description:DataTypes.STRING,
    need_of_the_project:DataTypes.STRING,
    beginning_date:DataTypes.DATE,
    icon:DataTypes.STRING,
    owner_id:DataTypes.INTEGER
},{
    sequelize,
    tableName: "project"
  });

module.exports=Project;
