import postService from '../services/post.service';
import Api from '../../../lib/api';

class postController {
    constructor() { }

    async getPost(request, response) {
        try {
            let result = await postService.getPost(request);
            Api.ok(request, response, result);
        } catch (err) {
            console.log(err)
            Api.serverError(request, response, err)
        }
    }

    async getPostById(request, response) {
        try {
            let result = await postService.getPostById(request);
            Api.ok(request, response, result);
        } catch (err) {
            Api.serverError(request, response, err)
        }
    }

    async addPost(request, response) {
        try {
            let result = await postService.addPost(request);
            Api.created(request, response, result);
        } catch (err) {
            Api.serverError(request, response, err)
        }
    }

    async updatePost(request, response) {
        try {
            let result = await postService.updatePost(request);
            if (result) {
                Api.updated(request, response, result);
            } else {
                Api.forbidden(request, response, '"You can update only your post"')
            }
        } catch (err) {
            Api.serverError(request, response, err)
        }
    }

    async deletePost(request, response) {
        try {
            let result = await postService.deletePost(request);
            if (result) {
                Api.deleted(request, response, result);
            } else {
                Api.forbidden(request, response, '"You can delete only your post"')
            }
        } catch (err) {
            Api.serverError(request, response, err)
        }
    }

    async likeDislikePost(request, response) {
        try {
            let result = await postService.likeDislikePost(request);
            Api.updated(request, response, result);
        } catch (err) {
            Api.serverError(request, response, err)
        }
    }
}

export default new postController();