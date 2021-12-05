import userService from '../services/user.service';
import Api from '../../../lib/api';

class UserController {
    constructor() { }

    async getUser(request, response) {
        try {
            let result = await userService.getUser(request);
            Api.ok(request, response, result);
        } catch (err) {
            Api.serverError(request, response, err);
        }
    }

    async getUserById(request, response) {
        try {
            let result = await userService.getUserById(request);
            if(result){
                Api.ok(request, response, result);
            } else {
                Api.notFound(request, response, "User not found")
            }
        } catch (err) {
            // console.log(err)
            Api.serverError(request, response, err);
        }
    }

    async addUser(request, response) {
        try {
            let result = await userService.addUser(request);
            if (result) {
                Api.created(request, response, result);
            } else {
                Api.serverError(request, response, "User not added")
            }
        } catch (err) {
            Api.serverError(request, response, err);
        }
    }

    async updateUser(request, response) {
        try {
            if (request.body.userId === request.params.id || request.body.isAdmin) {
                let result = await userService.updateUser(request);
                if (result) {
                    Api.updated(request, response, result);
                } else {
                    Api.serverError(request, response, "User not updated")
                }
            } else {
                Api.forbidden(request, response, "You can't update other user");
            }
        } catch (err) {
            console.log(err)
            Api.serverError(request, response, err);
        }
    }

    async deleteUser(request, response) {
        try {
            if (request.body.userId === request.params.id || request.body.isAdmin) {
                let result = await userService.deleteUser(request);
                if (result) {
                    Api.deleted(request, response, result);
                } else {
                    Api.notFound(request, response, "No user found");
                }
            } else {
                Api.forbidden(request, response, "You can't delete other user");
            }
        } catch (err) {
            console.log(err)
            Api.serverError(request, response, err);
        }
    }

    async followUser(request, response) {
        try {
            if (request.body.userId !== request.params.id) {
                let result = await userService.followUser(request);
                if (result) {
                    Api.ok(request, response, result);
                } else {
                    Api.forbidden(request, response, "You already following this user")
                }
            } else {
                Api.forbidden(request, response, "You can't follow youtself");
            }
        } catch (err) {
            console.log(err)
            Api.serverError(request, response, err);
        }
    }

    async unFollowUser(request, response) {
        try {
            if (request.body.userId !== request.params.id) {
                let result = await userService.unFollowUser(request);
                if (result) {
                    Api.ok(request, response, result);
                } else {
                    Api.forbidden(request, response, "You are not following this user")
                }
            } else {
                Api.forbidden(request, response, "You can't unfollow youtself");
            }
        } catch (err) {
            console.log(err)
            Api.serverError(request, response, err);
        }
    }

    async logIn(request, response) {
        try {
            let result = await userService.logIn(request);
            if (result == 'incorrect password') {
                Api.badRequest(request, response, "Password is not correct")
            } else if (result == 'Not found') {
                Api.notFound(request, response, 'User not found')
            } else {
                Api.ok(request, response, result);
            }
        } catch (err) {
            Api.serverError(request, response, err);
        }
    }
}

export default new UserController();