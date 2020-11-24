//Import model from controllers
const Account = require('../model/Account');

//import jwt token
const jwt = require('jsonwebtoken');

//import bycrpty
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
        if(updates["password"]){
            updates["password"] = await bcrypt.hash(updates["password"],saltRounds);
        }
        try {
            const user = await Account.findByIdAndUpdate(id, {$set: updates});
            if(!user) res.status(400).json({message: "Something went wrong"});
            res.json({message: "Successfully updated!"}); 
        } catch (error) {
            res.status(500).json({message: error, error: true});
        }
    },
    addUser: async (req, res) =>{
        const userDetails = req.body;
        if(userDetails["password"]){
            userDetails["password"] = await bcrypt.hash(userDetails["password"],saltRounds);
        }
        try {
            const newUser = new Account(userDetails);
            const user = await newUser.save();
            
            if(!user) res.status(400).json({message: "Something went wrong"});

            res.json({
                message: "Successfully added!", 
                userId: user._id,
                url:"/signin"
            });

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
    },
    //user do login
    //####temporary###//
    userDologin: async(req, res) =>{
        const email = req.body.email;
        const password = req.body.password;

        try {
            const user =await Account.findOne({email: email});
            if(!user) return  res.status(401).json({
                message: "Email does'nt match"
            });
            
            if(!await bcrypt.compare(password,user.password)) return  res.status(401).json({
                message: "password does'nt match"
            });

            let access_token = jwt.sign({userId: user._id, name: user.firstname},process.env.ACCESS_TOKEN_SECRET,{ expiresIn: '12h' });
            
            res.json({url: '/dashboard',message: "Successfully login", token: access_token});

        } catch (error) {
            res.status(500).json({message: error, error: true});
        }

    }
}