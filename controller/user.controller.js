import User from "../models/user.js"
import express from "express"


//function to handle user creation 
export const createUser = async (req, res) => {
    const userdata = req.body
    const user = new User(userdata);
    const savedata = await user.save();
    res.status(201).json(savedata);
}

export const findAllUser = async (req, res) => {
    try {
        const user = await User.find();
        res.json(user);
    }
    catch (err) {
        res.json(err)
    }
}

export const updateUser = async (req, res) => {
    try {
        const updateuser = await User.findOneAndUpdate({ userId: req.params.userId }, req.body, { new: true });
        res.json(updateuser);
    }
    catch (err) {
        res.json(err)
    }
}

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