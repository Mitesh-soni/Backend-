import axios from "axios";
import User from "../models/user.js"
import express from "express"
import user from "../models/user.js";


//function to handle user creation 
export const createUser = async (req, res) => {
    try{
        const userdata = req.body
        const user = new User(userdata);
        const savedata = await user.save();
        res.status(201).json(savedata);
    }
    catch(err){
        res.json(err)
    }
}

//funtion to get all data 
export const getUser = async (req, res) => {
    try {
        const {key,value}= req.params;
        const filter = {[key]:value}
        const User = await user.findOne(filter);
        res.json(User);
    }
    catch (err) {
        res.json(err)
    }
}

//function to update data by id "update to add update by any field"
export const updateUser = async (req, res) => {
    try {
        const {key,value}= req.params;
        const filter ={[key]:value}
        const updateuser = await User.findOneAndUpdate(filter, req.body, { new: true });
        res.json(updateuser);
    }
    catch (err) {
        res.json(err)
    }
}

//fuction to handle delete user by id,name,email etc
export const deleteUser = async (req, res) => {
    try {
        const { key, value } = req.params;
        const deleteuser = await User.findOneAndDelete({ [key]: value });
        res.json(deleteuser);
    }
    catch (err) {
        res.json(err)
    }
}