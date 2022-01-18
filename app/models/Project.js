const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database')

class Project extends Model{}
Project.init({
    name:{
      type: DataTypes.STRING,
    },
    is_available:{
      type: DataTypes.BOOLEAN,
    },
    description:{
      type: DataTypes.STRING,
    },
    need_of_the_project:{
      type: DataTypes.STRING,
    },
    beginning_date:{
      type: DataTypes.STRING,
    },
    icon:{
      type: DataTypes.STRING,
    },
  },{
    sequelize,
    tableName: "project"
  },
);

module.exports=Project;
