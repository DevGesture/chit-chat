import mongoose, { mongo } from 'mongoose';
const USER = mongoose.model('user');
const POST = mongoose.model('post');

class PostService {
    constructor() {}

    async getPost(request){
        let currentUser = await USER.findById(request.body.userId);
        let userPosts = await POST.find({userId: currentUser._id});
        let friendsPosts = await Promise.all(
            currentUser.followings.map(friendId => {
                return POST.find({ userId: friendId})
            })
        )
        let response = userPosts.concat(...friendsPosts)
        return response;
    }

    async getPostById(request){
        let response = await POST.findById(request.params.id);
        return response;
    }

    async addPost(request){
        let response = await POST.create(request.body);
        return response;
    }

    async updatePost(request){
        let post = await POST.findById(request.params.id);
        if(post.userId === request.body.userId){
            let response = await POST.findByIdAndUpdate(request.params.id,request.body,{ new: true});
            return response;
        } else {
            return false;
        }
    }

    async deletePost(request){
        let post = await POST.findById(request.params.id);
        if(post.userId === request.body.userId){
            let response = await POST.findByIdAndDelete(request.params.id, {new:true});
            return response;
        } else {
            return false;
        }
    }

    async likeDislikePost(request){
        let post = await POST.findById(request.params.id);
        if(!post.likes.includes(request.body.userId)){
            let response = await POST.findByIdAndUpdate(request.params.id,{$push: {likes: request.body.userId}},{ new: true});
            return response;
        } else {
            let response = await POST.findByIdAndUpdate(request.params.id,{$pull: {likes: request.body.userId}},{ new: true});
            return response;
        }
    }
}

export default new PostService();