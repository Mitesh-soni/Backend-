import axios from "axios";
import User from "../models/user.js"
import express from "express"
import user from "../models/user.js";
import { deleteModel } from "mongoose";


//function to handle user creation 
export const createUser = async (req, res) => {
    try {
        const userdata = req.body
        const user = new User(userdata);
        const savedata = await user.save();
        res.status(201).json(savedata);
    }
    catch (err) {
        res.json(err)
    }
}

//funtion to get all data 
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const User = await user.findOne({userId:id});
        res.json(User);
    }
    catch (err) {
        res.json(err)
    }
}

//function to update data by id "update to add update by any field"
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updateuser = await User.findOneAndUpdate({userId:id}, { $set: req.body }, { new: true });
        res.json(updateuser);
    }
    catch (err) {
        res.json(err)
    }
}

//fuction to handle delete user by id,name,email etc
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        // console.log(id)
        const deletedUsers = await User.findOneAndDelete({ userId: id });
        // console.log(deletedUsers)
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
            deletedUsers,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message,
        })
    }
}