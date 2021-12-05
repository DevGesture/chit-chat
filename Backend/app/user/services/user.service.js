import mongoose from 'mongoose';
const USER = mongoose.model('user');

class UserService {
    constructor() { }

    async getUser(request) {
        let response = await USER.find();
        return response;
    }

    async getUserById(request) {
        let response = await USER.findById(request.params.id);
        if (response) {
            return await this.userResponseObject(response);
        } else {
            return false;
        }
    }

    async addUser(request) {
        let userData = request.body;
        let user = new USER();
        user.username = userData.username;
        user.email = userData.email;
        user.profilePicture = userData.profilePicture;
        user.coverPicture = userData.coverPicture;
        user.followers = userData.followers;
        user.followings = userData.followings;
        user.isAdmin = userData.isAdmin;
        user.description = userData.description;
        user.city = userData.city;
        user.from = userData.from;
        user.relationship = userData.relationship;
        user.setPassword(userData.password);
        let response = await user.save(user);
        if (response) {
            return await this.userResponseObject(response);
        } else {
            return false;
        }
    }

    async updateUser(request) {
        let userData = request.body;
        let user = await USER.findById(request.params.id);
        user.username = userData.username;
        user.email = userData.email;
        user.profilePicture = userData.profilePicture;
        user.coverPicture = userData.coverPicture;
        user.followers = userData.followers;
        user.followings = userData.followings;
        user.isAdmin = userData.isAdmin;
        user.description = userData.description;
        user.city = userData.city;
        user.from = userData.from;
        user.relationship = userData.relationship;
        if (userData.password) {
            user.setPassword(userData.password);
        }
        let response = await user.save(user);
        if (response) {
            return await this.userResponseObject(response);
        } else {
            return false;
        }
    }

    async deleteUser(request) {
        let user = await USER.findByIdAndDelete(request.params.id);
        if (user) {
            return await this.userResponseObject(user);
        } else {
            return false;
        }
    }

    async followUser(request) {
        let user = await USER.findById(request.params.id);
        if (!user.followers.includes(request.body.userId)) {
            await user.updateOne({ $push: { followers: request.body.userId } });
            let updatedCurrentUser = await USER.findByIdAndUpdate(request.body.userId, { $push: { followings: request.params.id } }, { new: true });
            return await this.userResponseObject(updatedCurrentUser);
        } else {
            return false;
        }
    }

    async unFollowUser(request) {
        let currentUser = await USER.findById(request.body.userId);
        let user = await USER.findById(request.params.id);
        if (user.followers.includes(request.body.userId)) {
            await user.updateOne({ $pull: { followers: request.body.userId } });
            await currentUser.updateOne({ $pull: { followings: request.params.id } }, { new: true });
            let updatedCurrentUser = await USER.findById(request.body.userId);
            return await this.userResponseObject(updatedCurrentUser);
        } else {
            return false;
        }
    }

    async logIn(request) {
        let userData = request.body;
        let user = await USER.findOne({ email: userData.email });
        if (user) {
            if (user.validatePassword(userData.password)) {
                return await this.userResponseObject(user);
            } else {
                return "incorrect password"
            }
        } else {
            return "Not found";
        }
    }

    async userResponseObject(userObject) {
        let cloned = (await userObject).toObject();
        delete cloned.hash;
        delete cloned.salt;
        return cloned;
    }
}
export default new UserService