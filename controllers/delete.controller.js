import emp from "../models/employee.js"
import axios from "axios"

export const deleteemp = async (req, res) => {
    try {
        const { key, value } = req.params;
        const filter ={[key]:value}
        const deleteemp = await emp.findOneAndDelete(filter);
        const deleteUser= await axios.delete(`http://localhost:3000/deleteuser/${key}/${value}`);
        res.json({
            employee: deleteemp,
            users:deleteUser.data
        });
    }
    catch (err) {
        res.json(err)
    }
}