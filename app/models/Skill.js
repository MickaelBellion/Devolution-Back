const {Model, DataTypes } = require('sequelize');
const sequelize = require('../database')

class Skill extends Model {}
Skill.init({
    label:{
      type: DataTypes.STRING,
    },
},{
    sequelize,
    tableName: "skill"
  });

module.exports=Skill;
