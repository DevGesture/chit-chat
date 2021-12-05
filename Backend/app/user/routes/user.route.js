import userController from '../controllers/user.controller';
module.exports = async (router) => {
    router.get('/user', await userController.getUser);
    router.get('/user/:id', await userController.getUserById);
    router.post('/user', await userController.addUser);
    router.put('/user/:id', await userController.updateUser);
    router.put('/user/:id/follow', await userController.followUser);
    router.put('/user/:id/unfollow', await userController.unFollowUser);
    router.delete('/user/:id', await userController.deleteUser);
    router.post('/login', await userController.logIn);
}