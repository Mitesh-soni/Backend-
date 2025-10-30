import User from "../models/user.js"
import express from "express"


//function to handle user creation 
export const createUser = async (req,res)=>{
    const userdata = req.body
    const user =new User(userdata);
    const savedata = await user.save();
    res.status(201).json(savedata);
}
