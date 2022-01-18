const express = require('express');

const router = express.Router();


const {mainController,userController, projectController, skillController} = require('../controllers');
const {tokenMiddleware, ownerMiddleware}= require('../middlewares');


//User
router.get('/',mainController.homePage);
router.post('/login',userController.login);
router.post('/user/create', userController.signUp);

router.get('/me', tokenMiddleware.authenticate, userController.getMe);
router.post('/logout' ,tokenMiddleware.authenticate, userController.logout)
router.get('/users' ,tokenMiddleware.authenticate ,userController.getAll);

router.get('/user/:id' ,tokenMiddleware.authenticate ,userController.getOne);
router.put('/user/:id',tokenMiddleware.authenticate ,userController.updateOne);
router.delete('/user/:id' ,tokenMiddleware.authenticate ,userController.deleteOne);

router.get('/user/:id/myprojects',tokenMiddleware.authenticate ,userController.getMyCreatedProject);
//router.get('/user/:id/skills',tokenMiddleware.authenticate ,userController.getUserSkills);

//Projects
router.get('/projects', projectController.getAll);
router.post('/project/create', tokenMiddleware.authenticate ,projectController.create);
router.get('/project/:id', projectController.getOne);
router.put('/project/:id', tokenMiddleware.authenticate, ownerMiddleware.isOwner, projectController.updateOne);
router.delete('/project/:id', tokenMiddleware.authenticate, ownerMiddleware.isOwner, projectController.deleteOne);

//delete participant of my project 
router.delete('/project/:id/deleteparticipant/:user', tokenMiddleware.authenticate, ownerMiddleware.isOwner, projectController.removeFromMyProject )

router.delete('/project/:id/deleteparticipant', tokenMiddleware.authenticate, projectController.removeFromTeam);
router.get('/project/:id/addparticipant', tokenMiddleware.authenticate, projectController.addToTeam);


//Skills
router.post('/skill/:id',tokenMiddleware.authenticate,skillController.addSkill);
router.delete('/skill/:id',tokenMiddleware.authenticate,skillController.deleteSkill);
router.get('/myskills', tokenMiddleware.authenticate,skillController.getMySkills);
router.get('/skills',tokenMiddleware.authenticate,skillController.getAll);
router.get('/user/:id/skills',tokenMiddleware.authenticate,skillController.getUserSkills);


//Search

router.get('/projects/:search',tokenMiddleware.authenticate ,projectController.search);
router.get('/users/:search',tokenMiddleware.authenticate ,userController.searchUser);
//router.get('/project/:query', projectController.searchProject)

//Token
//router.post("/token", tokenMiddleware.refreshToken);

module.exports=router
