const User = require('./User');
const Project = require ('./Project');
const Role = require ('./Role');
const Skill = require('./Skill');
const Token = require('./Token');



User.hasMany(Project,{
  foreignKey: "owner_id",
  as : "projects"
});

Project.belongsTo(User,{
  foreignKey:"owner_id",
  as : "owner"
})

User.belongsTo(Role, {
    foreignKey : {name:"role_id",allowNull : false , defaultValue : 1},
    as :"role"
});

Role.hasMany(User,{
    foreignKey:"role_id",
    as :"users"
});

Project.belongsToMany(User,{
    as : "participants",
    through: 'user_participate_projects',
    foreignKey: 'project_id',
    otherKey: 'user_id'
});

User.belongsToMany(Project,{
  as : "participated_projects",
  through: 'user_participate_projects',
  foreignKey: 'user_id',
  otherKey: 'project_id'
});


Skill.belongsToMany(User,{
    as:"users",
    through :"user_has_skills",
    foreignKey:'skill_id',
    otherKey:'user_id'
});

User.belongsToMany(Skill,{
  as:"users_skills",
  through :"user_has_skills",
  foreignKey:'user_id',
  otherKey:'skill_id'
});


module.exports = {User,Skill,Project,Role}







