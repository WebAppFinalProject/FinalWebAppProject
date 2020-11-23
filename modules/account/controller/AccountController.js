//Import model from controllers
const Account = require('../model/Account');

//import validation for request body
const parseRequestBody = require('../../../utils/requestBodyParser');

//export the functions
module.exports = {
    //get all user
    getUsers: async (req, res)=>{
        try {
            const users = await Account.find();
            if(!users) res.status(400).json({message: "Something went wrong"});
            res.json({users: users}); 
        } catch (error) {
            res.status(500).json({message: error, error: true});
        }
    },
    //get user by id
    getUser: async (req, res)=>{
        const id = req.params.id;
        try {
            const user = await Account.findById(id);
            if(!user) res.status(400).json({message: "Something went wrong"});
            res.json({user: user}); 
        } catch (error) {
            res.status(500).json({message: error, error: true});
        }
    },
    //update user by id
    updateUser: async (req, res)=>{
        const id = req.params.id;
        const updates = parseRequestBody(req.body);
        try {
            const user = await Account.findByIdAndUpdate(id, {$set: updates});
            if(!user) res.status(400).json({message: "Something went wrong"});
            res.json({message: "Successfully updated!"}); 
        } catch (error) {
            res.status(500).json({message: error, error: true});
        }
    },

    //delete
    deleteUser: async (req, res)=>{
        const id = req.params.id;
        const dateDeleted = new Date();
        try {
            const user = await Account.findByIdAndUpdate(id, {$set:{deletedAt: dateDeleted}});
            if(!user) res.status(400).json({message: "Something went wrong"});
            res.json({message: "Successfully deleted!"}); 
        } catch (error) {
            res.status(500).json({message: error, error: true});
        }
    }
}