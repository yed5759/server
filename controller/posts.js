const posts = require('../services/posts')

async function getAllPosts(req, res) {
    try {
        const postsList = await posts.getPosts({});
        res.render('posts.ejs', {posts: postsList});
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).send('An error occurred while fetching posts.');
    }
}

async function createPost(req, res) {
    res.json(await posts.addPost(req.body.display, req.body.text, req.body.img, req.body.profile))
}
async function editPost(req, res){
    const id = req.params.id
    const text = req.body.text
    const img = req.body.img
    let newPost
    if (text !== "") {
        newPost = await posts.updatePost(id, text)
    }
    if (img !== "") {
        newPost = await posts.updatePostImg(id, img)
    }
    if(!newPost)
        return res.status(404).json({error: ['post not found']})
    res.json(newPost)
}
async function deletePost(req, res) {
    const postId = req.params.id
    const post = await posts.deletePost(postId)
    if (!post) {
        res.status(404).json({error: ['post not found']})
    }
    res.json(post)
}
module.exports = {getAllPosts, createPost, editPost, deletePost}