import emp from "../models/employee.js"
import axios from "axios"
export const getemp = async (req, res) => {
    try {
        const  { key, value } =req.params;
        const filter = { [key]: value };
        const Emp = await emp.findOne(filter);
        const user = await axios.get(`http://localhost:3000/getuser/${key}/${value}`)
        res.json({
            employee:Emp ,
            users:user.data
        });
        console.log(Emp);
    }
    catch(err){
        res.json(err)
    }
}
