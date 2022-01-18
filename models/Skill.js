const {Model, DataTypes } = require('sequelize');
const sequelize = require('../database')

class Skill extends Model {}
Skill.init({
    label:DataTypes.STRING
},{
    sequelize,
    tableName: "skill"
  });

module.exports=Skill;
