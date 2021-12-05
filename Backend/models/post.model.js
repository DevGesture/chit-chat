import mongoose from 'mongoose';
const POST_SCHEMA = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    description: {
        type: String,
        max: 500
    },
    image: {
        type: String
    },
    likes: {
        type: Array,
        default: []
    }
}, { timestamps: true });

mongoose.model('post', POST_SCHEMA);
