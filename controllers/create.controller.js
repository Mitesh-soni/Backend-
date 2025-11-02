import emp from "../models/employee.js"
import axios from "axios"

export const createemp = async (req, res) => {
    try {
        const empdata = req.body;
        const newEmp = new emp(empdata);
        const savedata = await newEmp.save();
        const createUser = await axios.post("http://localhost:3000/createuser", empdata);
        if(!createUser ){
            res.status(400).json("user was exist")
        }
        res.status(201).json({
            employee: savedata,
            users: createUser.data
        });
    }
    catch (err) {
        res.json(err);
    }
}