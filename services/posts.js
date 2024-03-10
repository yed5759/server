const Post = require('../models/posts')
const User = require('./user')

function getPosts({}) {
    return Post.find({});

}

async function addPost(new_display, new_text, new_img, new_profile) {
    try {
        const newPost = new Post({
            username: new_display,
            text: new_text,
            img: new_img,
            profilePic: new_profile,
            comments: [],
            likes: []
        });
        const savedPost = await newPost.save();
        return savedPost;
    } catch (error) {
        console.error("Error saving post:", error);
        throw error; // Rethrow the error to handle it elsewhere if needed
    }
}



async function updatePost(postId, newText) {
    const post = await Post.findById(postId);
    if (!post) return null;
    const updatedPost = {
        $set: {
            text: newText
        }
    };
    return Post.updateOne({_id: postId}, updatedPost, {runValidators: true});
}
async function updatePostImg(postId, newImg) {
    const post = await Post.findById(postId);
    if (!post) return null;
    const updatedPost = {
        $set: {
            img: newImg
        }
    };
    return Post.updateOne({_id: postId}, updatedPost, {runValidators: true});
}
async function deletePost(id) {
    return Post.findByIdAndDelete(id)
}
async function like(post, userId){
    post.likes.push(userId)
    return post.save()
}
async function unlike(post, userId){
    let i = post.likes.indexOf(userId)
    post.likes.splice(i, 1)
    return post.save()
}
function getPost(id) {
    return Post.findById(id);
}

function isLiked(post , user) {
    return post.likes.includes(user)
}
module.exports = {getPosts, addPost, updatePost, updatePostImg, deletePost, like, unlike, getPost, isLiked}