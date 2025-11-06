import { json } from "express";
import mongoose from "mongoose";

export const authTokenController = async(getintegrationcommandqData)=>{
    try{
           const {authToken}=getintegrationcommandqData;
           const token = authToken.token
        //    console.log(token,"Authentication Token");
           return {
            authToken:token
           };
    }
    catch{

    }
}