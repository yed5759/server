const userService = require('../services/user');

const createUser = async (req, res) => {
    res.json(await userService.createUser(req.body.username,req.body.password));
};
const deleteUser = async (req, res)=>{
    const user = await userService.deleteUser(req.params.id);
    if(!user){
        return res.status(404).json({errors: ['User not found']})
    }
    res.json(user);
}
const updateUser = async (req, res)=>{
    const user = await userService.updateUser(req.body.id, req.body.username, req.body.password);
    console.log(user);
    if(!user){
        return res.status(404).json({errors: ['User not found']})
    }
    res.json(user);
}
const getUser = async (req, res) =>
{
    const user = await userService.getUserById(req.params.id);
    if(!user){
        console.log("error");
        return res.status(404).json({errors : ['User not found']})
    }
    res.json(user);
}

module.exports = { createUser, deleteUser, getUser, updateUser}
